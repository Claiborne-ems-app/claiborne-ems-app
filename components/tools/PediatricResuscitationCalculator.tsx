"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Info,
  Scale,
  ShieldAlert,
  Syringe,
  Zap,
} from "lucide-react";
import ProviderLevelSelector, {
  type ClinicalProviderLevel,
  useProviderLevel,
} from "../provider/ProviderLevelSelector";

type WeightSource = "Measured" | "Length-based tape" | "Estimated";
type AgeBand = "Under 1 year" | "1–2 years" | "Over 2 years";
type Category = "Cardiac" | "Allergy / Respiratory" | "Metabolic / Shock";

type DoseResult = {
  primary: string;
  secondary?: string;
  calculation: string;
};

type DoseCard = {
  id: string;
  name: string;
  indication: string;
  category: Category;
  minimumLevel: ClinicalProviderLevel;
  route: string;
  protocol: string;
  protocolHref: string;
  protocolDose: string;
  caution?: string;
  calculate: (weightKg: number, ageBand: AgeBand) => DoseResult;
};

const providerRank: Record<ClinicalProviderLevel, number> = {
  EMT: 0,
  AEMT: 1,
  Paramedic: 2,
};

const categories: Category[] = [
  "Cardiac",
  "Allergy / Respiratory",
  "Metabolic / Shock",
];

function rounded(value: number, maximumDecimals = 2) {
  return Number(value.toFixed(maximumDecimals)).toString();
}

function doseRange(
  low: number,
  high: number,
  unit: string,
  maximum?: number
) {
  const cappedLow = maximum === undefined ? low : Math.min(low, maximum);
  const cappedHigh = maximum === undefined ? high : Math.min(high, maximum);
  return cappedLow === cappedHigh
    ? `${rounded(cappedLow)} ${unit}`
    : `${rounded(cappedLow)}–${rounded(cappedHigh)} ${unit}`;
}

const doseCards: DoseCard[] = [
  {
    id: "cardiac-epinephrine",
    name: "Epinephrine 0.1 mg/mL",
    indication: "Cardiac arrest or symptomatic bradycardia",
    category: "Cardiac",
    minimumLevel: "AEMT",
    route: "IV / IO",
    protocol: "PC-01 / PC-02 / PC-07",
    protocolHref: "/protocols/pc/pc-01",
    protocolDose: "0.01 mg/kg; maximum 1 mg. Repeat per the selected protocol.",
    calculate: (weightKg) => {
      const dose = Math.min(weightKg * 0.01, 1);
      const volume = dose / 0.1;
      return {
        primary: `${rounded(dose)} mg`,
        secondary: `${rounded(volume)} mL of 0.1 mg/mL`,
        calculation: `0.01 mg/kg × ${rounded(weightKg)} kg; max 1 mg`,
      };
    },
  },
  {
    id: "atropine",
    name: "Atropine",
    indication: "Vagal cause or primary AV block with poor perfusion",
    category: "Cardiac",
    minimumLevel: "Paramedic",
    route: "IV / IO",
    protocol: "PC-02",
    protocolHref: "/protocols/pc/pc-02",
    protocolDose:
      "0.02 mg/kg; minimum 0.1 mg, maximum single dose 0.5 mg; may repeat once.",
    calculate: (weightKg) => {
      const rawDose = weightKg * 0.02;
      const dose = Math.min(Math.max(rawDose, 0.1), 0.5);
      return {
        primary: `${rounded(dose)} mg`,
        calculation: `0.02 mg/kg × ${rounded(weightKg)} kg; min 0.1 mg, max 0.5 mg`,
      };
    },
  },
  {
    id: "adenosine",
    name: "Adenosine",
    indication: "Stable regular SVT; selected regular monomorphic WCT",
    category: "Cardiac",
    minimumLevel: "Paramedic",
    route: "Rapid IV / IO",
    protocol: "PC-05 / PC-06",
    protocolHref: "/protocols/pc/pc-05",
    protocolDose:
      "First 0.1 mg/kg (max 6 mg); second 0.2 mg/kg (max 12 mg).",
    calculate: (weightKg) => ({
      primary: `First: ${rounded(Math.min(weightKg * 0.1, 6))} mg`,
      secondary: `Second: ${rounded(Math.min(weightKg * 0.2, 12))} mg`,
      calculation: `0.1 mg/kg, then 0.2 mg/kg × ${rounded(weightKg)} kg`,
    }),
  },
  {
    id: "midazolam-cardioversion",
    name: "Midazolam",
    indication: "Sedation for cardioversion",
    category: "Cardiac",
    minimumLevel: "Paramedic",
    route: "IV / IO / IN",
    protocol: "PC-05 / PC-06",
    protocolHref: "/protocols/pc/pc-05",
    protocolDose:
      "0.1–0.2 mg/kg; maximum single dose 2 mg; maximum total 5 mg.",
    caution: "Do not delay cardioversion for sedation.",
    calculate: (weightKg) => ({
      primary: doseRange(weightKg * 0.1, weightKg * 0.2, "mg", 2),
      secondary: "Maximum total: 5 mg",
      calculation: `0.1–0.2 mg/kg × ${rounded(weightKg)} kg; max single 2 mg`,
    }),
  },
  {
    id: "magnesium-cardiac",
    name: "Magnesium sulfate",
    indication: "Torsades during VF / pulseless VT pathway",
    category: "Cardiac",
    minimumLevel: "AEMT",
    route: "IV / IO over 2–3 minutes",
    protocol: "PC-07",
    protocolHref: "/protocols/pc/pc-07",
    protocolDose: "40 mg/kg; maximum 2 g.",
    calculate: (weightKg) => {
      const doseMg = Math.min(weightKg * 40, 2000);
      return {
        primary: doseMg >= 1000 ? `${rounded(doseMg / 1000)} g` : `${rounded(doseMg)} mg`,
        calculation: `40 mg/kg × ${rounded(weightKg)} kg; max 2,000 mg`,
      };
    },
  },
  {
    id: "epinephrine-anaphylaxis",
    name: "Epinephrine 1 mg/mL",
    indication: "Anaphylaxis under Pediatric Allergic Reaction",
    category: "Allergy / Respiratory",
    minimumLevel: "EMT",
    route: "IM",
    protocol: "PM-01",
    protocolHref: "/protocols/pm/pm-01",
    protocolDose:
      "Under 30 kg: 0.15 mg. At least 30 kg: 0.3–0.5 mg. Repeat every 5 minutes as needed.",
    caution:
      "PM-01 and AR-07 use different pediatric IM epinephrine wording. This result follows PM-01; verify the clinical pathway and current standing order.",
    calculate: (weightKg) =>
      weightKg < 30
        ? {
            primary: "0.15 mg",
            secondary: "0.15 mL of 1 mg/mL",
            calculation: `${rounded(weightKg)} kg is under the PM-01 30 kg threshold`,
          }
        : {
            primary: "0.3–0.5 mg",
            secondary: "0.3–0.5 mL of 1 mg/mL",
            calculation: `${rounded(weightKg)} kg meets the PM-01 30 kg threshold`,
          },
  },
  {
    id: "diphenhydramine",
    name: "Diphenhydramine",
    indication: "Allergic reaction adjunct",
    category: "Allergy / Respiratory",
    minimumLevel: "EMT",
    route: "EMT: PO only · AEMT/Paramedic: PO / IV / IO / IM",
    protocol: "PM-01",
    protocolHref: "/protocols/pm/pm-01",
    protocolDose: "1 mg/kg; maximum 50 mg.",
    caution:
      "Do not give orally with decreased mental status, unsafe swallowing, or an unprotected airway.",
    calculate: (weightKg) => ({
      primary: `${rounded(Math.min(weightKg, 50))} mg`,
      calculation: `1 mg/kg × ${rounded(weightKg)} kg; max 50 mg`,
    }),
  },
  {
    id: "methylpred-respiratory",
    name: "Methylprednisolone",
    indication: "Severe respiratory distress adjunct",
    category: "Allergy / Respiratory",
    minimumLevel: "Paramedic",
    route: "IV / IO / IM",
    protocol: "AR-07",
    protocolHref: "/protocols/ar/ar-07",
    protocolDose: "2 mg/kg; maximum 125 mg.",
    calculate: (weightKg) => ({
      primary: `${rounded(Math.min(weightKg * 2, 125))} mg`,
      calculation: `2 mg/kg × ${rounded(weightKg)} kg; max 125 mg`,
    }),
  },
  {
    id: "magnesium-respiratory",
    name: "Magnesium sulfate",
    indication: "Severe respiratory distress adjunct",
    category: "Allergy / Respiratory",
    minimumLevel: "Paramedic",
    route: "IV / IO over 10–20 minutes",
    protocol: "AR-07",
    protocolHref: "/protocols/ar/ar-07",
    protocolDose: "40 mg/kg; maximum 2 g.",
    calculate: (weightKg) => {
      const doseMg = Math.min(weightKg * 40, 2000);
      return {
        primary: doseMg >= 1000 ? `${rounded(doseMg / 1000)} g` : `${rounded(doseMg)} mg`,
        calculation: `40 mg/kg × ${rounded(weightKg)} kg; max 2,000 mg`,
      };
    },
  },
  {
    id: "dextrose",
    name: "Dextrose",
    indication: "Hypoglycemia when oral treatment is unsafe",
    category: "Metabolic / Shock",
    minimumLevel: "AEMT",
    route: "IV / IO",
    protocol: "PM-02",
    protocolHref: "/protocols/pm/pm-02",
    protocolDose:
      "Under 1 year: D10 5 mL/kg. 1–2 years: D25 2 mL/kg. Over 2 years: D50 1 mL/kg, maximum 25 g.",
    calculate: (weightKg, ageBand) => {
      if (ageBand === "Under 1 year") {
        return {
          primary: `${rounded(weightKg * 5)} mL D10`,
          secondary: `${rounded(weightKg * 0.5)} g dextrose`,
          calculation: `5 mL/kg × ${rounded(weightKg)} kg`,
        };
      }
      if (ageBand === "1–2 years") {
        return {
          primary: `${rounded(weightKg * 2)} mL D25`,
          secondary: `${rounded(weightKg * 0.5)} g dextrose`,
          calculation: `2 mL/kg × ${rounded(weightKg)} kg`,
        };
      }
      const grams = Math.min(weightKg * 0.5, 25);
      return {
        primary: `${rounded(grams / 0.5)} mL D50`,
        secondary: `${rounded(grams)} g dextrose`,
        calculation: `1 mL/kg × ${rounded(weightKg)} kg; max 25 g (50 mL)`,
      };
    },
  },
  {
    id: "glucagon",
    name: "Glucagon",
    indication: "Hypoglycemia without vascular access",
    category: "Metabolic / Shock",
    minimumLevel: "AEMT",
    route: "IM",
    protocol: "PM-02",
    protocolHref: "/protocols/pm/pm-02",
    protocolDose:
      "0.1 mg/kg; maximum 1 mg. May repeat every 15 minutes until glucose is over 60 mg/dL.",
    calculate: (weightKg) => ({
      primary: `${rounded(Math.min(weightKg * 0.1, 1))} mg`,
      calculation: `0.1 mg/kg × ${rounded(weightKg)} kg; max 1 mg`,
    }),
  },
  {
    id: "normal-saline-shock",
    name: "Normal saline",
    indication: "Non-cardiogenic pediatric shock",
    category: "Metabolic / Shock",
    minimumLevel: "AEMT",
    route: "IV / IO",
    protocol: "PM-03",
    protocolHref: "/protocols/pm/pm-03",
    protocolDose: "20 mL/kg; repeat as needed to maximum 60 mL/kg.",
    calculate: (weightKg) => ({
      primary: `${rounded(weightKg * 20)} mL bolus`,
      secondary: `Maximum cumulative: ${rounded(weightKg * 60)} mL`,
      calculation: `20 mL/kg × ${rounded(weightKg)} kg`,
    }),
  },
  {
    id: "normal-saline-cardiogenic",
    name: "Normal saline—cardiogenic",
    indication: "Cardiogenic shock; titrate carefully",
    category: "Metabolic / Shock",
    minimumLevel: "AEMT",
    route: "IV / IO",
    protocol: "PM-03",
    protocolHref: "/protocols/pm/pm-03",
    protocolDose: "5–10 mL/kg; maximum total 10 mL/kg.",
    caution: "Avoid routine 20 mL/kg boluses; pulmonary edema may worsen rapidly.",
    calculate: (weightKg) => ({
      primary: `${rounded(weightKg * 5)}–${rounded(weightKg * 10)} mL`,
      secondary: `Maximum total: ${rounded(weightKg * 10)} mL`,
      calculation: `5–10 mL/kg × ${rounded(weightKg)} kg`,
    }),
  },
  {
    id: "hydrocortisone",
    name: "Hydrocortisone",
    indication: "Suspected adrenal crisis",
    category: "Metabolic / Shock",
    minimumLevel: "AEMT",
    route: "IV / IO / IM",
    protocol: "PM-03",
    protocolHref: "/protocols/pm/pm-03",
    protocolDose: "2 mg/kg; maximum 100 mg.",
    calculate: (weightKg) => ({
      primary: `${rounded(Math.min(weightKg * 2, 100))} mg`,
      calculation: `2 mg/kg × ${rounded(weightKg)} kg; max 100 mg`,
    }),
  },
];

const sourceOptions: WeightSource[] = [
  "Measured",
  "Length-based tape",
  "Estimated",
];

const ageOptions: AgeBand[] = [
  "Under 1 year",
  "1–2 years",
  "Over 2 years",
];

function EnergyPanel({ weightKg }: { weightKg: number | null }) {
  return (
    <section className="rounded-2xl border border-violet-500/30 bg-violet-950/20 p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/20">
          <Zap aria-hidden="true" className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-bold">Electrical energy</h2>
          <p className="mt-1 text-sm text-slate-400">PC-05, PC-06, PC-07 · confirm device and authorization</p>
        </div>
      </div>

      {weightKg ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-300">Defibrillation</p>
            <p className="mt-2 text-lg font-extrabold">1st: {rounded(weightKg * 2)} J</p>
            <p className="mt-1 font-bold text-slate-200">2nd: {rounded(weightKg * 4)} J</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Subsequent: at least {rounded(weightKg * 4)} J, maximum {rounded(weightKg * 10)} J or the adult dose.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-300">Synchronized cardioversion</p>
            <p className="mt-2 text-lg font-extrabold">{rounded(weightKg * 0.5)}–{rounded(weightKg)} J</p>
            <p className="mt-1 font-bold text-slate-200">Repeat: {rounded(weightKg * 2)} J</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Sedate when appropriate, but do not delay cardioversion.
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-400">
          Enter a valid weight to calculate energy settings.
        </p>
      )}
    </section>
  );
}

export default function PediatricResuscitationCalculator() {
  const { providerLevel, setProviderLevel } = useProviderLevel();
  const [weightInput, setWeightInput] = useState("");
  const [weightSource, setWeightSource] = useState<WeightSource>("Measured");
  const [ageBand, setAgeBand] = useState<AgeBand>("Over 2 years");
  const [category, setCategory] = useState<Category>("Cardiac");

  const parsedWeight = Number(weightInput);
  const weightKg =
    Number.isFinite(parsedWeight) && parsedWeight >= 0.5 && parsedWeight <= 100
      ? parsedWeight
      : null;
  const weightError =
    weightInput.length > 0 && weightKg === null
      ? "Enter a weight from 0.5 to 100 kg."
      : null;

  const visibleCards = useMemo(
    () =>
      doseCards.filter(
        (card) =>
          card.category === category &&
          providerRank[card.minimumLevel] <= providerRank[providerLevel]
      ),
    [category, providerLevel]
  );

  return (
    <div className="space-y-6">
      <aside className="rounded-2xl border border-amber-500/40 bg-amber-950/30 p-4 text-sm leading-6 text-amber-100">
        <div className="flex gap-3">
          <ShieldAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            <strong>Clinical review tool.</strong> Use an actual kilogram weight or a currently approved length-based system. Verify the medication, concentration, route, maximum, and provider authorization before administration.
          </p>
        </div>
      </aside>

      <ProviderLevelSelector
        value={providerLevel}
        onChange={setProviderLevel}
        label="Calculator provider view"
      />

      <section className="rounded-2xl border border-sky-500/30 bg-sky-950/20 p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/20">
            <Scale aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold">Patient inputs</h2>
            <p className="mt-1 text-sm leading-5 text-slate-400">
              Kilograms only. The app does not estimate weight from length or reproduce a commercial tape.
            </p>
          </div>
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-bold text-slate-200">Weight (kg)</span>
          <div className="mt-2 flex items-center rounded-xl border border-slate-600 bg-slate-950 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-500/20">
            <input
              type="number"
              inputMode="decimal"
              min="0.5"
              max="100"
              step="0.1"
              value={weightInput}
              onChange={(event) => setWeightInput(event.target.value)}
              placeholder="e.g. 18"
              className="min-h-14 w-full bg-transparent px-4 text-xl font-extrabold text-white outline-none placeholder:text-slate-600"
            />
            <span className="pr-4 font-bold text-slate-400">kg</span>
          </div>
        </label>
        {weightError ? (
          <p role="alert" className="mt-2 flex items-center gap-2 text-sm text-red-300">
            <AlertTriangle aria-hidden="true" className="h-4 w-4" /> {weightError}
          </p>
        ) : null}

        <fieldset className="mt-5">
          <legend className="text-sm font-bold text-slate-200">Weight source</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {sourceOptions.map((source) => (
              <button
                key={source}
                type="button"
                onClick={() => setWeightSource(source)}
                className={`min-h-12 rounded-xl border px-2 py-2 text-xs font-bold ${
                  weightSource === source
                    ? "border-sky-400 bg-sky-600 text-white"
                    : "border-slate-700 bg-slate-950 text-slate-300"
                }`}
              >
                {source}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-5">
          <legend className="text-sm font-bold text-slate-200">Age band</legend>
          <p className="mt-1 text-xs text-slate-500">Required for the protocol-specific dextrose concentration.</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {ageOptions.map((age) => (
              <button
                key={age}
                type="button"
                onClick={() => setAgeBand(age)}
                className={`min-h-12 rounded-xl border px-2 py-2 text-xs font-bold ${
                  ageBand === age
                    ? "border-emerald-400 bg-emerald-600 text-white"
                    : "border-slate-700 bg-slate-950 text-slate-300"
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </fieldset>
      </section>

      {weightKg ? (
        <section aria-label="Active patient values" className="sticky top-2 z-10 rounded-2xl border border-emerald-400/40 bg-slate-900/95 p-4 shadow-xl shadow-black/30 backdrop-blur">
          <div className="flex items-center gap-3">
            <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-emerald-300" />
            <div className="min-w-0 flex-1">
              <p className="font-extrabold text-white">{rounded(weightKg)} kg · {ageBand}</p>
              <p className="truncate text-xs text-slate-400">{weightSource} weight · {providerLevel} view</p>
            </div>
            <button
              type="button"
              onClick={() => setWeightInput("")}
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-bold text-slate-300"
            >
              Clear
            </button>
          </div>
          {weightSource === "Estimated" ? (
            <p className="mt-3 rounded-lg bg-amber-950/50 px-3 py-2 text-xs leading-5 text-amber-200">
              Estimated weight selected—replace with a measured weight or approved length-based value as soon as possible.
            </p>
          ) : null}
        </section>
      ) : null}

      <EnergyPanel weightKg={weightKg} />

      <section>
        <div className="flex items-center gap-2">
          <Syringe aria-hidden="true" className="h-5 w-5 text-sky-300" />
          <h2 className="text-xl font-bold">Medication calculations</h2>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Medication category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              onClick={() => setCategory(item)}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-bold ${
                category === item
                  ? "border-sky-400 bg-sky-600 text-white"
                  : "border-slate-700 bg-slate-900 text-slate-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-3 space-y-4">
          {visibleCards.map((card) => {
            const result = weightKg ? card.calculate(weightKg, ageBand) : null;
            return (
              <article key={card.id} className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-extrabold">{card.name}</h3>
                      <p className="mt-1 text-sm leading-5 text-slate-400">{card.indication}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-slate-600 bg-slate-950 px-2.5 py-1 text-xs font-bold text-slate-300">
                      {card.minimumLevel}+
                    </span>
                  </div>

                  <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
                    {result ? (
                      <>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-300">Calculated dose</p>
                        <p className="mt-2 text-2xl font-extrabold text-white">{result.primary}</p>
                        {result.secondary ? <p className="mt-1 font-bold text-emerald-300">{result.secondary}</p> : null}
                        <p className="mt-3 text-xs leading-5 text-slate-500">{result.calculation}</p>
                      </>
                    ) : (
                      <div className="flex items-center gap-3 text-sm text-slate-400">
                        <Calculator aria-hidden="true" className="h-5 w-5" />
                        Enter a valid weight to calculate.
                      </div>
                    )}
                  </div>

                  <dl className="mt-4 grid gap-3 text-sm">
                    <div>
                      <dt className="font-bold text-slate-400">Route</dt>
                      <dd className="mt-1 text-slate-200">{card.route}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-slate-400">Protocol wording</dt>
                      <dd className="mt-1 leading-5 text-slate-200">{card.protocolDose}</dd>
                    </div>
                  </dl>

                  {card.caution ? (
                    <p className="mt-4 flex gap-2 rounded-xl border border-amber-500/25 bg-amber-950/30 p-3 text-xs leading-5 text-amber-200">
                      <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                      {card.caution}
                    </p>
                  ) : null}
                </div>
                <Link href={card.protocolHref} className="flex min-h-12 items-center justify-between border-t border-slate-700 bg-slate-950/60 px-5 text-sm font-bold text-sky-300">
                  Open {card.protocol}
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <aside className="rounded-2xl border border-slate-700 bg-slate-900 p-4 text-xs leading-5 text-slate-400">
        <div className="flex gap-3">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
          <p>
            Results use the reviewed native Claiborne pediatric protocols. Volume is shown only when the protocol specifies a concentration. Confirm the product in hand, recheck the calculation independently, and follow the currently approved manual and Medical Control.
          </p>
        </div>
      </aside>
    </div>
  );
}
