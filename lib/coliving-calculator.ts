// Coliving Conversion Calculator — pure calculation engine.
//
// All math lives here so the wizard component stays a thin shell over
// inputs + results. Every assumption used (room rates, occupancy, expense
// ratios, renovation midpoints) maps back to the playbook spec.

export type Inputs = {
  // Step 1 — property
  purchasePrice: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  isHOA: boolean;

  // Step 2 — room inventory
  hasFormalDining: boolean;
  hasFinishedBasement: boolean;
  basementSeparateEntrance: boolean;
  basementBathroom: boolean;
  hasUnfinishedBasement: boolean;
  hasSunroom: boolean;
  hasBonusRoom: boolean;
  hasHomeOffice: boolean;
  hasGarageAttached: boolean;
  hasInlawSuite: boolean;

  // Step 2 — characteristics
  parkingSpots: number;
  privateBathRooms: number;

  // Step 4 — financials
  downPaymentPct: number;
  interestRate: number;
  loanTermYears: number;
  renovationBudget: number;
  closingCostPct: number;
};

export type Results = {
  conversion: {
    bedrooms: number;
    additionalRooms: number;
    totalRooms: number;
    privateBathRooms: number;
    sharedBathRooms: number;
    estRenovation: number;
    estFurnishing: number;
  };
  cashInvested: {
    downPayment: number;
    closingCosts: number;
    renovation: number;
    furnishing: number;
    total: number;
    loanAmount: number;
  };
  monthly: {
    grossRevenue: number;
    effectiveGross: number;
    mortgage: number;
    taxes: number;
    insurance: number;
    utilities: number;
    platformFee: number;
    maintenance: number;
    turnover: number;
    totalExpenses: number;
    netCashflow: number;
  };
  annual: {
    netCashflow: number;
    cashOnCash: number;
  };
  fiveYear: {
    totalCashflow: number;
    principalPaydown: number;
    appreciation: number;
    totalWealth: number;
    annualizedReturn: number;
  };
  confidence: "high" | "medium" | "low";
  confidenceReason: string;
  verdict: "strong" | "marginal" | "weak";
};

// Brand-locked assumptions
export const ASSUMPTIONS = {
  occupancy: 0.85,
  privateRoomRate: 1000,
  sharedRoomRate: 750,
  insuranceMonthly: 250,
  utilitiesPerRoom: 150,
  taxRate: 0.012, // 1.2% annual
  platformFeeRate: 0.08, // 8% of gross
  maintenanceRate: 0.10, // 10% of gross
  monthlyTurnoverAllowance: 100, // small allowance once stabilized
  appreciationRate: 0.03, // 3%/yr conservative
  furnishingPerRoom: 2000, // midpoint $1,500–$2,500
};

// Renovation midpoints (avg of low/high from playbook)
const RENO = {
  diningToBedroom: 3500,
  bonusToBedroom: 2750,
  officeToBedroom: 2500,
  sunroomToBedroom: 5500,
  finishedBasement1Room: 10000,
  finishedBasement2Rooms: 14000,
  unfinishedBasement1Room: 25000,
  unfinishedBasement2Rooms: 32500,
  inlawSuite: 1000,
  privateBathroomAdd: 11500,
};

// ---------------------------------------------------------------- //
// Conversion algorithm — turns the inventory checkboxes into rooms //
// ---------------------------------------------------------------- //
export function computeConversion(inputs: Inputs) {
  let additionalRooms = 0;
  let renovation = 0;

  if (inputs.hasFormalDining) {
    additionalRooms += 1;
    renovation += RENO.diningToBedroom;
  }

  if (inputs.hasFinishedBasement) {
    if (inputs.basementSeparateEntrance) {
      additionalRooms += 2;
      renovation += RENO.finishedBasement2Rooms;
    } else {
      additionalRooms += 1;
      renovation += RENO.finishedBasement1Room;
    }
  }

  // Unfinished basement is an opportunity but not a default — flag only,
  // 0 rooms by default. Operator can choose to renovate later.
  if (inputs.hasUnfinishedBasement) {
    // No automatic add — flagged as renovation opportunity in UI
  }

  if (inputs.hasSunroom) {
    additionalRooms += 1;
    renovation += RENO.sunroomToBedroom;
  }

  if (inputs.hasBonusRoom) {
    additionalRooms += 1;
    renovation += RENO.bonusToBedroom;
  }

  if (inputs.hasHomeOffice) {
    additionalRooms += 1;
    renovation += RENO.officeToBedroom;
  }

  if (inputs.hasInlawSuite) {
    additionalRooms += 1;
    renovation += RENO.inlawSuite;
  }

  // Garage = flag only; conversion is heavy and operator-specific.
  // Not auto-added; the UI surfaces it as a future opportunity.

  const totalRooms = inputs.bedrooms + additionalRooms;
  const privateBathRooms = Math.min(inputs.privateBathRooms, totalRooms);
  const sharedBathRooms = Math.max(totalRooms - privateBathRooms, 0);

  // If user requested more private baths than the property supports,
  // estimate cost of adding extra private baths.
  const extraBathsNeeded = Math.max(
    0,
    inputs.privateBathRooms - inputs.bathrooms,
  );
  renovation += extraBathsNeeded * RENO.privateBathroomAdd;

  const estFurnishing = totalRooms * ASSUMPTIONS.furnishingPerRoom;

  return {
    additionalRooms,
    totalRooms,
    privateBathRooms,
    sharedBathRooms,
    estRenovation: Math.round(renovation),
    estFurnishing,
  };
}

// ---------------------------------------------------------------- //
// Mortgage math                                                      //
// ---------------------------------------------------------------- //
function monthlyMortgage(
  principal: number,
  annualRatePct: number,
  years: number,
): number {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

// Principal paid down over `years` years on the loan
function principalPaidDown(
  principal: number,
  annualRatePct: number,
  totalYears: number,
  yearsPaid: number,
): number {
  const r = annualRatePct / 100 / 12;
  const n = totalYears * 12;
  if (r === 0) return (principal / n) * (yearsPaid * 12);
  const payment = monthlyMortgage(principal, annualRatePct, totalYears);
  let balance = principal;
  for (let i = 0; i < yearsPaid * 12; i++) {
    const interest = balance * r;
    const principalPortion = payment - interest;
    balance -= principalPortion;
  }
  return principal - balance;
}

// ---------------------------------------------------------------- //
// Confidence determination                                           //
// ---------------------------------------------------------------- //
function determineConfidence(
  totalRooms: number,
  parkingSpots: number,
  isHOA: boolean,
): { level: "high" | "medium" | "low"; reason: string } {
  // HOA = instant low override per spec
  if (isHOA) {
    return {
      level: "low",
      reason:
        "This property has an HOA. We strongly advise against coliving in HOA communities — even when rentals are technically permitted.",
    };
  }

  const parkingRatio = totalRooms > 0 ? parkingSpots / totalRooms : 0;

  if (parkingRatio < 0.4) {
    return {
      level: "low",
      reason:
        "Parking is below 40% of room count. This property may be challenging as a coliving conversion.",
    };
  }

  if (totalRooms >= 8 && parkingRatio >= 0.6) {
    return {
      level: "high",
      reason: "This property has strong coliving potential.",
    };
  }

  if (totalRooms >= 6) {
    return {
      level: "medium",
      reason:
        "This property has good bones — let's see if we can find you more rooms from your dining room, basement, bonus spaces, and other areas.",
    };
  }

  return {
    level: "low",
    reason:
      "Under 6 rooms makes coliving challenging. Coliving works best at 6+ rooms — and really shines at 8+.",
  };
}

// ---------------------------------------------------------------- //
// Verdict                                                            //
// ---------------------------------------------------------------- //
function determineVerdict(
  cashOnCash: number,
  netCashflowAnnual: number,
): "strong" | "marginal" | "weak" {
  if (netCashflowAnnual > 0 && cashOnCash > 8) return "strong";
  if (cashOnCash >= -5 && cashOnCash <= 8) return "marginal";
  return "weak";
}

// ---------------------------------------------------------------- //
// Master calculation                                                 //
// ---------------------------------------------------------------- //
export function calculate(inputs: Inputs): Results {
  const conv = computeConversion(inputs);

  // Cash invested
  const downPayment = inputs.purchasePrice * (inputs.downPaymentPct / 100);
  const closingCosts = inputs.purchasePrice * (inputs.closingCostPct / 100);
  // User-supplied renovation budget overrides the auto-estimate
  const renovation = inputs.renovationBudget;
  const furnishing = conv.estFurnishing;
  const totalCash = downPayment + closingCosts + renovation + furnishing;
  const loanAmount = inputs.purchasePrice - downPayment;

  // Revenue
  const grossRevenue =
    conv.privateBathRooms * ASSUMPTIONS.privateRoomRate +
    conv.sharedBathRooms * ASSUMPTIONS.sharedRoomRate;
  const effectiveGross = grossRevenue * ASSUMPTIONS.occupancy;

  // Monthly expenses
  const mortgage = monthlyMortgage(
    loanAmount,
    inputs.interestRate,
    inputs.loanTermYears,
  );
  const taxes = (inputs.purchasePrice * ASSUMPTIONS.taxRate) / 12;
  const insurance = ASSUMPTIONS.insuranceMonthly;
  const utilities = conv.totalRooms * ASSUMPTIONS.utilitiesPerRoom;
  const platformFee = effectiveGross * ASSUMPTIONS.platformFeeRate;
  const maintenance = effectiveGross * ASSUMPTIONS.maintenanceRate;
  const turnover = ASSUMPTIONS.monthlyTurnoverAllowance;

  const totalExpenses =
    mortgage +
    taxes +
    insurance +
    utilities +
    platformFee +
    maintenance +
    turnover;
  const netCashflow = effectiveGross - totalExpenses;

  // Annual
  const annualCashflow = netCashflow * 12;
  const cashOnCash = totalCash > 0 ? (annualCashflow / totalCash) * 100 : 0;

  // 5-year wealth
  const totalCashflow5yr = annualCashflow * 5;
  const principalPaydown5yr = principalPaidDown(
    loanAmount,
    inputs.interestRate,
    inputs.loanTermYears,
    5,
  );
  const appreciation5yr =
    inputs.purchasePrice *
    (Math.pow(1 + ASSUMPTIONS.appreciationRate, 5) - 1);
  const totalWealth = totalCashflow5yr + principalPaydown5yr + appreciation5yr;
  const annualizedReturn =
    totalCash > 0
      ? (Math.pow(1 + totalWealth / totalCash, 1 / 5) - 1) * 100
      : 0;

  // Confidence + verdict
  const conf = determineConfidence(
    conv.totalRooms,
    inputs.parkingSpots,
    inputs.isHOA,
  );
  const verdict = determineVerdict(cashOnCash, annualCashflow);

  return {
    conversion: {
      bedrooms: inputs.bedrooms,
      additionalRooms: conv.additionalRooms,
      totalRooms: conv.totalRooms,
      privateBathRooms: conv.privateBathRooms,
      sharedBathRooms: conv.sharedBathRooms,
      estRenovation: conv.estRenovation,
      estFurnishing: conv.estFurnishing,
    },
    cashInvested: {
      downPayment: Math.round(downPayment),
      closingCosts: Math.round(closingCosts),
      renovation: Math.round(renovation),
      furnishing: Math.round(furnishing),
      total: Math.round(totalCash),
      loanAmount: Math.round(loanAmount),
    },
    monthly: {
      grossRevenue: Math.round(grossRevenue),
      effectiveGross: Math.round(effectiveGross),
      mortgage: Math.round(mortgage),
      taxes: Math.round(taxes),
      insurance: Math.round(insurance),
      utilities: Math.round(utilities),
      platformFee: Math.round(platformFee),
      maintenance: Math.round(maintenance),
      turnover: Math.round(turnover),
      totalExpenses: Math.round(totalExpenses),
      netCashflow: Math.round(netCashflow),
    },
    annual: {
      netCashflow: Math.round(annualCashflow),
      cashOnCash: Math.round(cashOnCash * 10) / 10,
    },
    fiveYear: {
      totalCashflow: Math.round(totalCashflow5yr),
      principalPaydown: Math.round(principalPaydown5yr),
      appreciation: Math.round(appreciation5yr),
      totalWealth: Math.round(totalWealth),
      annualizedReturn: Math.round(annualizedReturn * 10) / 10,
    },
    confidence: conf.level,
    confidenceReason: conf.reason,
    verdict,
  };
}

// ---------------------------------------------------------------- //
// Formatting helpers                                                 //
// ---------------------------------------------------------------- //
export function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1_000_000) {
    return `$${(n / 1_000_000).toFixed(2)}M`;
  }
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

export function fmtMoneySigned(n: number): string {
  const sign = n < 0 ? "−" : "";
  return `${sign}${fmtMoney(Math.abs(n))}`;
}

export function fmtPercent(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`;
}
