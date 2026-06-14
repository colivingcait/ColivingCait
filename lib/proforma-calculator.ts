// Pro Forma Calculator — fully-editable rental underwriting engine.
//
// Unlike the Coliving Conversion calculator (which locks brand assumptions
// and walks a wizard), this engine lets the operator toggle *every* number —
// gross rent, vacancy, platform/PM fee, each operating-expense line, and the
// financing terms — and recomputes the pro forma live, Zillow-style.
//
// Money is tracked in monthly dollars internally. A few lines support a unit
// toggle ($ flat vs % of gross, or monthly vs annual) so the same field can
// be entered whichever way the operator already has the number.

export type DollarOrPct = { value: number; mode: "dollar" | "percent" };
export type MonthlyOrAnnual = { value: number; mode: "monthly" | "annual" };

export type ProFormaInputs = {
  // Property & financing
  purchasePrice: number;
  downPaymentPct: number;
  interestRate: number;
  loanTermYears: number;
  closingCostPct: number;
  rehabBudget: number;

  // Income (monthly)
  grossRent: number;
  vacancyPct: number;
  managementPct: number; // platform / PM fee, % of gross rent

  // Operating expenses
  taxesInsurance: MonthlyOrAnnual;
  utilities: number; // monthly $
  cleaningLawn: number; // monthly $
  maintenance: DollarOrPct; // monthly
  capexReserve: DollarOrPct; // monthly
  otherExpense: number; // monthly $ — generic catch-all

  // Debt service — null = auto-compute from financing terms above
  debtServiceOverride: number | null;
};

export type ProFormaResults = {
  // Income waterfall (monthly)
  grossRent: number;
  vacancy: number;
  managementFee: number;
  effectiveIncome: number;

  // Operating expenses (monthly)
  taxesInsurance: number;
  utilities: number;
  cleaningLawn: number;
  maintenance: number;
  capexReserve: number;
  otherExpense: number;
  totalOperatingExpenses: number;

  // Returns (monthly)
  noi: number;
  debtService: number;
  netCashFlow: number;

  // Investment basis
  downPayment: number;
  closingCosts: number;
  loanAmount: number;
  totalCashInvested: number;

  // Annualized + KPIs
  annualNoi: number;
  annualNetCashFlow: number;
  capRate: number; // annual NOI / purchase price
  cashOnCash: number; // annual net cash flow / cash invested
  dscr: number; // annual NOI / annual debt service
  grossYield: number; // annual gross rent / purchase price
  breakevenOccupancy: number; // % of gross rent needed to cover all costs
};

// ---------------------------------------------------------------- //
// Starting points — the line-item *structure* only. No figures are    //
// pre-loaded; the operator enters every number for their own deal.    //
// Loan term defaults to 30yr purely so the mortgage math has a valid   //
// denominator before the user touches it — it's a structural          //
// constant, not a deal figure, and is fully editable.                 //
// ---------------------------------------------------------------- //
export const DEFAULT_PROFORMA: ProFormaInputs = {
  purchasePrice: 0,
  downPaymentPct: 0,
  interestRate: 0,
  loanTermYears: 30,
  closingCostPct: 0,
  rehabBudget: 0,

  grossRent: 0,
  vacancyPct: 0,
  managementPct: 0,

  taxesInsurance: { value: 0, mode: "monthly" },
  utilities: 0,
  cleaningLawn: 0,
  maintenance: { value: 0, mode: "dollar" },
  capexReserve: { value: 0, mode: "dollar" },
  otherExpense: 0,

  debtServiceOverride: null,
};

// ---------------------------------------------------------------- //
// Helpers                                                            //
// ---------------------------------------------------------------- //
function resolveDollarOrPct(e: DollarOrPct, grossMonthly: number): number {
  return e.mode === "percent" ? grossMonthly * (e.value / 100) : e.value;
}

function resolveMonthly(e: MonthlyOrAnnual): number {
  return e.mode === "annual" ? e.value / 12 : e.value;
}

function monthlyMortgage(
  principal: number,
  annualRatePct: number,
  years: number,
): number {
  if (principal <= 0 || years <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

// ---------------------------------------------------------------- //
// Master calculation                                                 //
// ---------------------------------------------------------------- //
export function calculateProForma(i: ProFormaInputs): ProFormaResults {
  // Income waterfall
  const grossRent = Math.max(i.grossRent, 0);
  const vacancy = grossRent * (i.vacancyPct / 100);
  const managementFee = grossRent * (i.managementPct / 100);
  const effectiveIncome = grossRent - vacancy - managementFee;

  // Operating expenses (all resolved to monthly $)
  const taxesInsurance = resolveMonthly(i.taxesInsurance);
  const utilities = i.utilities;
  const cleaningLawn = i.cleaningLawn;
  const maintenance = resolveDollarOrPct(i.maintenance, grossRent);
  const capexReserve = resolveDollarOrPct(i.capexReserve, grossRent);
  const otherExpense = i.otherExpense;
  const totalOperatingExpenses =
    taxesInsurance +
    utilities +
    cleaningLawn +
    maintenance +
    capexReserve +
    otherExpense;

  const noi = effectiveIncome - totalOperatingExpenses;

  // Financing
  const downPayment = i.purchasePrice * (i.downPaymentPct / 100);
  const closingCosts = i.purchasePrice * (i.closingCostPct / 100);
  const loanAmount = Math.max(i.purchasePrice - downPayment, 0);
  const totalCashInvested = downPayment + closingCosts + i.rehabBudget;

  const debtService =
    i.debtServiceOverride !== null && i.debtServiceOverride >= 0
      ? i.debtServiceOverride
      : monthlyMortgage(loanAmount, i.interestRate, i.loanTermYears);

  const netCashFlow = noi - debtService;

  // Annualized + KPIs
  const annualNoi = noi * 12;
  const annualNetCashFlow = netCashFlow * 12;
  const capRate =
    i.purchasePrice > 0 ? (annualNoi / i.purchasePrice) * 100 : 0;
  const cashOnCash =
    totalCashInvested > 0
      ? (annualNetCashFlow / totalCashInvested) * 100
      : 0;
  const dscr = debtService > 0 ? noi / debtService : 0;
  const grossYield =
    i.purchasePrice > 0 ? ((grossRent * 12) / i.purchasePrice) * 100 : 0;

  // Breakeven occupancy — share of gross rent needed to cover variable +
  // fixed costs. Management fee + vacancy scale with collected rent, so we
  // solve for the occupancy fraction f where:
  //   f*gross*(1 - mgmt%) = fixedOpex + debtService
  const fixedCosts = totalOperatingExpenses + debtService;
  const collectedPerOccupancy = grossRent * (1 - i.managementPct / 100);
  const breakevenOccupancy =
    collectedPerOccupancy > 0
      ? (fixedCosts / collectedPerOccupancy) * 100
      : 0;

  return {
    grossRent: Math.round(grossRent),
    vacancy: Math.round(vacancy),
    managementFee: Math.round(managementFee),
    effectiveIncome: Math.round(effectiveIncome),

    taxesInsurance: Math.round(taxesInsurance),
    utilities: Math.round(utilities),
    cleaningLawn: Math.round(cleaningLawn),
    maintenance: Math.round(maintenance),
    capexReserve: Math.round(capexReserve),
    otherExpense: Math.round(otherExpense),
    totalOperatingExpenses: Math.round(totalOperatingExpenses),

    noi: Math.round(noi),
    debtService: Math.round(debtService),
    netCashFlow: Math.round(netCashFlow),

    downPayment: Math.round(downPayment),
    closingCosts: Math.round(closingCosts),
    loanAmount: Math.round(loanAmount),
    totalCashInvested: Math.round(totalCashInvested),

    annualNoi: Math.round(annualNoi),
    annualNetCashFlow: Math.round(annualNetCashFlow),
    capRate: Math.round(capRate * 10) / 10,
    cashOnCash: Math.round(cashOnCash * 10) / 10,
    dscr: Math.round(dscr * 100) / 100,
    grossYield: Math.round(grossYield * 10) / 10,
    breakevenOccupancy: Math.round(breakevenOccupancy * 10) / 10,
  };
}
