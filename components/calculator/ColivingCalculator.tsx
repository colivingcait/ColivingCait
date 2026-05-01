"use client";

import { useMemo, useState } from "react";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import CalcInput, { CheckTile, YesNoToggle } from "./CalcInput";
import ResultsDashboard from "./ResultsDashboard";
import {
  type Inputs,
  calculate,
  computeConversion,
} from "@/lib/coliving-calculator";

const TOTAL_STEPS = 6;

const DEFAULT_INPUTS: Inputs = {
  purchasePrice: 0,
  bedrooms: 0,
  bathrooms: 0,
  sqft: 0,
  isHOA: false,
  hasFormalDining: false,
  hasFinishedBasement: false,
  basementSeparateEntrance: false,
  basementBathroom: false,
  hasUnfinishedBasement: false,
  hasSunroom: false,
  hasBonusRoom: false,
  hasHomeOffice: false,
  hasGarageAttached: false,
  hasInlawSuite: false,
  parkingSpots: 0,
  privateBathRooms: 0,
  downPaymentPct: 20,
  interestRate: 7.5,
  loanTermYears: 30,
  renovationBudget: 0,
  closingCostPct: 3,
};

// The Coliving Conversion Calculator — 6-step wizard. State lives at this
// level so each step can read/update via setters. Renovation budget is
// auto-populated from the conversion algo at step 4 entry, but the user
// can override.
export default function ColivingCalculator() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS);
  const [email, setEmail] = useState("");

  // Computed conversion preview (for step 3 + step 4 default budget)
  const preview = useMemo(() => computeConversion(inputs), [inputs]);

  // When advancing from step 3 → 4, prefill the renovation budget with
  // the auto-estimate (only if the user hasn't manually set one yet).
  const goToStep = (next: number) => {
    if (next === 4 && inputs.renovationBudget === 0) {
      setInputs((prev) => ({
        ...prev,
        renovationBudget: preview.estRenovation,
      }));
    }
    setStep(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const update = <K extends keyof Inputs>(key: K, value: Inputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  // Step-level validation guards
  const canAdvance = useMemo(() => {
    switch (step) {
      case 1:
        return (
          inputs.purchasePrice > 0 &&
          inputs.bedrooms > 0 &&
          inputs.bathrooms > 0 &&
          inputs.sqft > 0
        );
      case 2:
        return inputs.parkingSpots >= 0; // Always allow advance from step 2
      case 3:
        return inputs.privateBathRooms >= 0; // Allow 0 (all shared)
      case 4:
        return (
          inputs.downPaymentPct > 0 &&
          inputs.interestRate > 0 &&
          inputs.loanTermYears > 0 &&
          inputs.renovationBudget >= 0 &&
          inputs.closingCostPct >= 0
        );
      case 5:
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      default:
        return true;
    }
  }, [step, inputs, email]);

  const handleEmailSubmit = async () => {
    // Tag the email in ConvertKit as `coliving-calculator-used` once
    // keys are wired. For now we just post to the placeholder endpoint.
    try {
      await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tag: "coliving-calculator-used",
        }),
      });
    } catch (err) {
      // Don't block the user from seeing results on a network hiccup
    }
    goToStep(6);
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setEmail("");
    setStep(1);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12 md:px-10 md:py-20">
      <ProgressBar step={step} />

      <div className="mt-12">
        {step === 1 && <Step1 inputs={inputs} update={update} />}
        {step === 2 && <Step2 inputs={inputs} update={update} />}
        {step === 3 && (
          <Step3 inputs={inputs} update={update} preview={preview} />
        )}
        {step === 4 && (
          <Step4
            inputs={inputs}
            update={update}
            estRenovation={preview.estRenovation}
          />
        )}
        {step === 5 && (
          <Step5
            email={email}
            setEmail={setEmail}
            onSubmit={handleEmailSubmit}
            canAdvance={canAdvance}
          />
        )}
        {step === 6 && (
          <Step6Results
            inputs={inputs}
            onReset={handleReset}
          />
        )}
      </div>

      {/* Step nav — hidden on step 5 (handled inside) and step 6 (results) */}
      {step < 5 && (
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-brand pt-8">
          <button
            type="button"
            onClick={() => goToStep(step - 1)}
            disabled={step === 1}
            className="text-xs uppercase tracking-button text-warmgray hover:text-gold disabled:opacity-40 disabled:hover:text-warmgray transition-colors"
          >
            ← Back
          </button>
          <Button
            onClick={() => goToStep(step + 1)}
            disabled={!canAdvance}
            variant="primary"
            size="md"
          >
            Continue →
          </Button>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Progress bar                                                       */
/* ---------------------------------------------------------------- */
const STEP_LABELS = [
  "Property",
  "Layout",
  "Rooms & Rates",
  "Financials",
  "Email",
  "Results",
];

function ProgressBar({ step }: { step: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-eyebrow">
        <span className="text-gold">
          Step {step} of {TOTAL_STEPS}
        </span>
        <span className="text-warmgray/70">{STEP_LABELS[step - 1]}</span>
      </div>
      <div className="mt-3 h-px bg-brand/40 relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-gold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* STEP 1 — Property Info                                            */
/* ---------------------------------------------------------------- */
function Step1({
  inputs,
  update,
}: {
  inputs: Inputs;
  update: <K extends keyof Inputs>(k: K, v: Inputs[K]) => void;
}) {
  return (
    <div>
      <Eyebrow className="mb-4">Property info</Eyebrow>
      <Heading size="lg">
        Tell me about the <em>property.</em>
      </Heading>
      <p className="mt-4 text-warmgray leading-body max-w-xl">
        Enter the basics — what it costs, how many rooms it currently has,
        and whether it&apos;s in an HOA. We&apos;ll find the extra rooms in
        the next step.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <CalcInput
          label="Purchase price"
          value={inputs.purchasePrice}
          onChange={(v) => update("purchasePrice", v)}
          prefix="$"
          step={1000}
          min={0}
        />
        <CalcInput
          label="Square footage"
          value={inputs.sqft}
          onChange={(v) => update("sqft", v)}
          suffix="sqft"
          step={50}
          min={0}
        />
        <CalcInput
          label="Bedrooms (existing)"
          value={inputs.bedrooms}
          onChange={(v) => update("bedrooms", v)}
          step={1}
          min={0}
        />
        <CalcInput
          label="Bathrooms"
          value={inputs.bathrooms}
          onChange={(v) => update("bathrooms", v)}
          step={0.5}
          min={0}
        />
      </div>

      <div className="mt-10 border-t border-brand pt-8">
        <YesNoToggle
          label="Is this property in an HOA?"
          helper="HOAs almost always have rental restrictions that conflict with coliving."
          value={inputs.isHOA}
          onChange={(v) => update("isHOA", v)}
        />

        {inputs.isHOA && (
          <div className="mt-6 border border-red-300/60 bg-red-50/50 p-6">
            <p className="text-red-700 font-medium text-sm">
              ⚠ HOA detected
            </p>
            <p className="mt-2 text-red-700/80 text-sm leading-body">
              We strongly advise against coliving in HOA communities — even
              when rentals are technically permitted. You can continue to see
              the math, but this will lock the confidence rating to{" "}
              <strong>Low</strong> regardless of other factors.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* STEP 2 — Room Inventory                                            */
/* ---------------------------------------------------------------- */
function Step2({
  inputs,
  update,
}: {
  inputs: Inputs;
  update: <K extends keyof Inputs>(k: K, v: Inputs[K]) => void;
}) {
  return (
    <div>
      <Eyebrow className="mb-4">Layout &amp; spaces</Eyebrow>
      <Heading size="lg">
        What does the <em>layout</em> look like?
      </Heading>
      <p className="mt-4 text-warmgray leading-body max-w-xl">
        Check everything the property has. Each one is a potential extra
        room — converting them is how a 4-bedroom becomes a 7- or 8-room
        coliving home.
      </p>

      <div className="mt-10 grid gap-3 md:grid-cols-2">
        <CheckTile
          label="Formal dining room"
          description="Separate room, often with a door — easy bedroom conversion"
          checked={inputs.hasFormalDining}
          onChange={(v) => update("hasFormalDining", v)}
        />
        <CheckTile
          label="Finished basement"
          description="Dry, drywalled, livable — biggest room-add potential"
          checked={inputs.hasFinishedBasement}
          onChange={(v) => update("hasFinishedBasement", v)}
        />
        <CheckTile
          label="Unfinished basement"
          description="Renovation opportunity — flagged but not auto-counted"
          checked={inputs.hasUnfinishedBasement}
          onChange={(v) => update("hasUnfinishedBasement", v)}
        />
        <CheckTile
          label="Sunroom"
          description="Insulate it well and add HVAC — solid bedroom"
          checked={inputs.hasSunroom}
          onChange={(v) => update("hasSunroom", v)}
        />
        <CheckTile
          label="Bonus room / flex space"
          description="Loft, den, second living — easy convert"
          checked={inputs.hasBonusRoom}
          onChange={(v) => update("hasBonusRoom", v)}
        />
        <CheckTile
          label="Home office"
          description="Already a small room — usually just needs a closet"
          checked={inputs.hasHomeOffice}
          onChange={(v) => update("hasHomeOffice", v)}
        />
        <CheckTile
          label="Attached garage"
          description="Heavy conversion — flagged for future opportunity"
          checked={inputs.hasGarageAttached}
          onChange={(v) => update("hasGarageAttached", v)}
        />
        <CheckTile
          label="In-law suite / ADU"
          description="Often already has a bath — easy add"
          checked={inputs.hasInlawSuite}
          onChange={(v) => update("hasInlawSuite", v)}
        />
      </div>

      {/* Conditional follow-ups */}
      {inputs.hasFinishedBasement && (
        <div className="mt-8 border-t border-brand pt-6 grid gap-6 md:grid-cols-2">
          <YesNoToggle
            label="Does the basement have a separate entrance?"
            helper="Separate entrance means it can become 2 rooms instead of 1."
            value={inputs.basementSeparateEntrance}
            onChange={(v) => update("basementSeparateEntrance", v)}
          />
          <YesNoToggle
            label="Does the basement have a bathroom?"
            helper="Existing plumbing dramatically reduces conversion cost."
            value={inputs.basementBathroom}
            onChange={(v) => update("basementBathroom", v)}
          />
        </div>
      )}

      <div className="mt-10 border-t border-brand pt-8">
        <CalcInput
          label="Parking spots available"
          value={inputs.parkingSpots}
          onChange={(v) => update("parkingSpots", v)}
          step={1}
          min={0}
          helper="Count driveway, garage, and on-street spots that residents can use. We need ~60% of room count to qualify."
          className="md:max-w-xs"
        />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* STEP 3 — Room Count & Rates                                        */
/* ---------------------------------------------------------------- */
function Step3({
  inputs,
  update,
  preview,
}: {
  inputs: Inputs;
  update: <K extends keyof Inputs>(k: K, v: Inputs[K]) => void;
  preview: ReturnType<typeof computeConversion>;
}) {
  return (
    <div>
      <Eyebrow className="mb-4">Room count &amp; rates</Eyebrow>
      <Heading size="lg">
        Here&apos;s what we <em>found.</em>
      </Heading>
      <p className="mt-4 text-warmgray leading-body max-w-xl">
        Based on your layout, here&apos;s the room count we&apos;re working
        with. Now tell us how many of these will have a private bathroom
        (private rooms rent for $250 / mo more).
      </p>

      <div className="mt-10 border border-brand p-8 md:p-10 bg-cream">
        <div className="grid gap-6 sm:grid-cols-3">
          <RoomCountStat
            label="Existing bedrooms"
            value={inputs.bedrooms}
          />
          <RoomCountStat
            label="From conversions"
            value={`+${preview.additionalRooms}`}
          />
          <RoomCountStat
            label="Total coliving rooms"
            value={preview.totalRooms}
            featured
          />
        </div>

        <div className="mt-8 border-t border-brand pt-6">
          <CalcInput
            label="How many rooms will have a private bathroom?"
            value={inputs.privateBathRooms}
            onChange={(v) =>
              update("privateBathRooms", Math.min(v, preview.totalRooms))
            }
            step={1}
            min={0}
            max={preview.totalRooms}
            helper={`Up to ${preview.totalRooms} possible. Each private-bath room rents at $1,000 / mo. Shared-bath rooms rent at $750 / mo.`}
            className="md:max-w-xs"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <RateRow
              count={preview.privateBathRooms}
              rate={1000}
              label="Private bathroom rooms"
            />
            <RateRow
              count={preview.sharedBathRooms}
              rate={750}
              label="Shared bathroom rooms"
            />
          </div>

          <div className="mt-6 pt-6 border-t border-brand flex items-baseline justify-between">
            <span className="text-[10px] uppercase tracking-eyebrow text-warmgray/70">
              Projected gross monthly rent
            </span>
            <span className="font-heading text-3xl text-charcoal leading-heading">
              $
              {(
                preview.privateBathRooms * 1000 +
                preview.sharedBathRooms * 750
              ).toLocaleString()}
            </span>
          </div>
          <p className="mt-2 text-xs text-warmgray/70 italic">
            ✦ Calculations always project at 85% occupancy
          </p>
        </div>
      </div>
    </div>
  );
}

function RoomCountStat({
  label,
  value,
  featured,
}: {
  label: string;
  value: string | number;
  featured?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-eyebrow text-warmgray/70 mb-2">
        {label}
      </p>
      <p
        className={`font-heading leading-heading ${
          featured ? "text-5xl text-gold" : "text-3xl text-charcoal"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function RateRow({
  count,
  rate,
  label,
}: {
  count: number;
  rate: number;
  label: string;
}) {
  return (
    <div className="border border-brand/60 bg-white p-4 flex items-baseline justify-between">
      <span className="text-sm text-warmgray">
        {count} × {label}
      </span>
      <span className="font-mono text-charcoal tabular-nums">
        ${(count * rate).toLocaleString()}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* STEP 4 — Financial Inputs                                          */
/* ---------------------------------------------------------------- */
function Step4({
  inputs,
  update,
  estRenovation,
}: {
  inputs: Inputs;
  update: <K extends keyof Inputs>(k: K, v: Inputs[K]) => void;
  estRenovation: number;
}) {
  return (
    <div>
      <Eyebrow className="mb-4">Financial inputs</Eyebrow>
      <Heading size="lg">
        How are you <em>financing</em> it?
      </Heading>
      <p className="mt-4 text-warmgray leading-body max-w-xl">
        Defaults are pre-filled based on what most investor loans look like
        right now. Tweak any of them to match your actual deal.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <CalcInput
          label="Down payment"
          value={inputs.downPaymentPct}
          onChange={(v) => update("downPaymentPct", v)}
          suffix="%"
          step={0.5}
          min={0}
          max={100}
        />
        <CalcInput
          label="Interest rate"
          value={inputs.interestRate}
          onChange={(v) => update("interestRate", v)}
          suffix="%"
          step={0.125}
          min={0}
          max={20}
        />
        <CalcInput
          label="Loan term"
          value={inputs.loanTermYears}
          onChange={(v) => update("loanTermYears", v)}
          suffix="years"
          step={1}
          min={1}
          max={40}
        />
        <CalcInput
          label="Closing costs"
          value={inputs.closingCostPct}
          onChange={(v) => update("closingCostPct", v)}
          suffix="%"
          step={0.5}
          min={0}
          max={10}
        />
        <CalcInput
          label="Renovation budget"
          value={inputs.renovationBudget}
          onChange={(v) => update("renovationBudget", v)}
          prefix="$"
          step={1000}
          min={0}
          helper={`Auto-estimate from your conversions: $${estRenovation.toLocaleString()}. Override if you have firmer numbers.`}
          className="md:col-span-2"
        />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* STEP 5 — Email Gate                                                */
/* ---------------------------------------------------------------- */
function Step5({
  email,
  setEmail,
  onSubmit,
  canAdvance,
}: {
  email: string;
  setEmail: (v: string) => void;
  onSubmit: () => void;
  canAdvance: boolean;
}) {
  return (
    <div className="text-center max-w-xl mx-auto">
      <Eyebrow className="mb-4">Almost there</Eyebrow>
      <Heading size="lg">
        See your <em>full report.</em>
      </Heading>
      <p className="mt-4 text-warmgray leading-body">
        Drop your email and we&apos;ll show you the full breakdown — gross
        revenue, expenses, cashflow, cash-on-cash return, and a 5-year
        wealth projection. We&apos;ll also send a copy to your inbox so
        you can revisit it later.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="mt-10 grid gap-4"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border border-brand bg-white px-4 py-4 text-base font-sans text-charcoal placeholder:text-warmgray/60 focus:outline-none focus:border-gold transition-colors text-center"
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!canAdvance}
          magnetic
        >
          See My Results →
        </Button>
        <p className="text-xs text-warmgray/70">
          ✦ No spam. Unsubscribe with one click.
        </p>
      </form>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* STEP 6 — Results                                                   */
/* ---------------------------------------------------------------- */
function Step6Results({
  inputs,
  onReset,
}: {
  inputs: Inputs;
  onReset: () => void;
}) {
  // Run the final calculation here so it's only computed once on entry.
  const results = useMemo(() => calculate(inputs), [inputs]);

  return <ResultsDashboard results={results} onReset={onReset} />;
}
