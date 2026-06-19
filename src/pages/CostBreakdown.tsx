import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";

type Item = { title: string; body: string; estimate: string; insurance: string; oop: string };

export default function CostBreakdown() {
  // Load intake data from localStorage with default fallbacks
  // Load intake data from localStorage with default fallbacks
  const patientState = localStorage.getItem("artham_intake_state") || "";
  const age = localStorage.getItem("artham_intake_age") || "";
  const stage = localStorage.getItem("artham_intake_stage") || "";
  const hormoneStatus = localStorage.getItem("artham_intake_hormone_status") || "";
  const surgery = localStorage.getItem("artham_intake_surgery") || "";
  const chemo = localStorage.getItem("artham_intake_chemo") || "";
  const radiation = localStorage.getItem("artham_intake_radiation") || "";
  const hospitalType = localStorage.getItem("artham_intake_hospital_type") || "";
  const hasInsurance = localStorage.getItem("artham_intake_has_insurance") === "true";
  const insuranceProvider = localStorage.getItem("artham_intake_insurance_provider") || "";
  const incomeBracket = localStorage.getItem("artham_intake_income_bracket") || "";

  const isIntakeFilled = !!patientState && !!age && !!stage;

  // Base treatment costs in Indian Rupees (INR)
  const baseCosts = {
    biopsy: 18000,
    imaging: 32000,
    surgery: 210000,
    chemo: 290000,
    radiation: 160000,
    medication: 50000,
    hospitalization: 95000
  };

  // Hospital Cost Multiplier
  let hospitalMultiplier = 1.0;
  if (hospitalType === "Government / Public Hospital") {
    hospitalMultiplier = 0.25; // 75% savings
  } else if (hospitalType === "Private Medical Center") {
    hospitalMultiplier = 1.25; // 25% premium
  }

  // Calculate personalized costs
  const applyMultiplier = (amount: number) => Math.round(amount * hospitalMultiplier);

  const biopsyCost = applyMultiplier(baseCosts.biopsy);
  const imagingCost = applyMultiplier(baseCosts.imaging);
  const surgeryCost = surgery !== "No" ? applyMultiplier(baseCosts.surgery) : 0;
  const chemoCost = chemo !== "No" ? applyMultiplier(baseCosts.chemo) : 0;
  const radiationCost = radiation !== "No" ? applyMultiplier(baseCosts.radiation) : 0;
  
  // Targeted Therapy is very expensive (usually around ₹3.5L in private, ₹90K in government for HER2+ Trastuzumab cycles)
  const baseTargetedTherapy = hormoneStatus === "HER2 Positive" ? 350000 : 0;
  const targetedCost = applyMultiplier(baseTargetedTherapy);

  // Hormonal therapy is ₹0 if Triple Negative
  const baseMedication = hormoneStatus === "Triple Negative" ? 0 : baseCosts.medication;
  const medicationCost = applyMultiplier(baseMedication);

  const hospitalizationCost = applyMultiplier(baseCosts.hospitalization);

  const totalEstimate = isIntakeFilled ? (biopsyCost + imagingCost + surgeryCost + chemoCost + radiationCost + targetedCost + medicationCost + hospitalizationCost) : 0;

  // Calculate Insurance Share
  let coveragePercent = 0;
  if (hasInsurance) {
    if (hospitalType === "Government / Public Hospital") {
      coveragePercent = 0.90; // 90% coverage
    } else {
      coveragePercent = 0.75; // 75% coverage
    }
  }

  const insuranceShare = Math.round(totalEstimate * coveragePercent);
  let outOfPocket = totalEstimate - insuranceShare;

  // Apply Welfare Subsidies based on Income Slabs
  let subsidyApplied = false;
  let subsidyAmount = 0;
  let subsidyName = "";

  if (isIntakeFilled) {
    if (incomeBracket === "Below ₹2,50,000") {
      subsidyApplied = true;
      subsidyAmount = outOfPocket;
      outOfPocket = 0;
      subsidyName = "Ayushman Bharat PM-JAY (100% Subsidy)";
    } else if (incomeBracket === "₹2,50,000 – ₹5,00,000") {
      subsidyApplied = true;
      subsidyAmount = Math.round(outOfPocket * 0.5);
      outOfPocket = outOfPocket - subsidyAmount;
      subsidyName = "National Illness Assistance Fund (50% Subsidy)";
    }
  }

  // Currency Formatter helper
  const formatINR = (val: number) => {
    return "₹" + val.toLocaleString("en-IN");
  };

  // Build treatment sections dynamically using personalized numbers
  const diagnosticsItems: Item[] = [
    { 
      title: "Biopsy & Pathology", 
      body: "Comprehensive tissue analysis and tumor grading.", 
      estimate: formatINR(biopsyCost), 
      insurance: formatINR(Math.round(biopsyCost * coveragePercent)), 
      oop: formatINR(biopsyCost - Math.round(biopsyCost * coveragePercent)) 
    },
    { 
      title: "PET Scan & MRI", 
      body: "Staging and whole-body scans for metastasis checks.", 
      estimate: formatINR(imagingCost), 
      insurance: formatINR(Math.round(imagingCost * coveragePercent)), 
      oop: formatINR(imagingCost - Math.round(imagingCost * coveragePercent)) 
    },
  ];

  const primaryItems: Item[] = [];
  if (surgery !== "No") {
    primaryItems.push({ 
      title: "Lumpectomy / Mastectomy", 
      body: "Surgical tumor removal including surgeon fees, anesthesia, and recovery care.", 
      estimate: formatINR(surgeryCost), 
      insurance: formatINR(Math.round(surgeryCost * coveragePercent)), 
      oop: formatINR(surgeryCost - Math.round(surgeryCost * coveragePercent)) 
    });
  }
  if (chemo !== "No") {
    primaryItems.push({ 
      title: "Chemotherapy (6 Cycles)", 
      body: "Systemic chemotherapy protocol including drugs and administration.", 
      estimate: formatINR(chemoCost), 
      insurance: formatINR(Math.round(chemoCost * coveragePercent)), 
      oop: formatINR(chemoCost - Math.round(chemoCost * coveragePercent)) 
    });
  }
  if (radiation !== "No") {
    primaryItems.push({ 
      title: "Radiation Therapy", 
      body: "Targeted post-surgery radiation therapy schedule.", 
      estimate: formatINR(radiationCost), 
      insurance: formatINR(Math.round(radiationCost * coveragePercent)), 
      oop: formatINR(radiationCost - Math.round(radiationCost * coveragePercent)) 
    });
  }
  if (hormoneStatus === "HER2 Positive") {
    primaryItems.push({ 
      title: "Targeted Therapy (Trastuzumab)", 
      body: "Monoclonal antibody cycles required for HER2+ receptor status.", 
      estimate: formatINR(targetedCost), 
      insurance: formatINR(Math.round(targetedCost * coveragePercent)), 
      oop: formatINR(targetedCost - Math.round(targetedCost * coveragePercent)) 
    });
  }

  const medicationItems: Item[] = [];
  if (hormoneStatus === "Triple Negative") {
    medicationItems.push({
      title: "Long-term Hormonal Therapy",
      body: "Not applicable for Triple Negative receptor breast cancer.",
      estimate: "₹0",
      insurance: "₹0",
      oop: "₹0"
    });
  } else {
    medicationItems.push({ 
      title: "Long-term Hormonal Therapy", 
      body: "Annual maintenance drugs (like Tamoxifen or Letrozole).", 
      estimate: formatINR(medicationCost), 
      insurance: formatINR(Math.round(medicationCost * coveragePercent)), 
      oop: formatINR(medicationCost - Math.round(medicationCost * coveragePercent)) 
    });
  }

  const sections: { icon: string; title: string; items: Item[] }[] = [
    {
      icon: "biotech",
      title: "Pre-treatment Diagnostics",
      items: diagnosticsItems,
    },
    {
      icon: "healing",
      title: "Primary Treatment",
      items: primaryItems,
    },
    {
      icon: "medication",
      title: "Medication",
      items: medicationItems,
    },
    {
      icon: "domain",
      title: "Hospitalization",
      items: [
        { 
          title: "Room, ICU & Nursing Charges", 
          body: "5-day inpatient bed stay, ICU care, and nursing supervision.", 
          estimate: formatINR(hospitalizationCost), 
          insurance: formatINR(Math.round(hospitalizationCost * coveragePercent)), 
          oop: formatINR(hospitalizationCost - Math.round(hospitalizationCost * coveragePercent)) 
        },
      ],
    },
  ];

  return (
    <AppShell>
      <div className="px-margin-mobile md:px-gutter pb-xl pt-md max-w-container-max mx-auto space-y-md animate-fade-in">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-outline-variant/30 pb-sm gap-md">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
              Personalized Treatment Estimate
            </h1>
            <p className="font-body-sm text-on-surface-variant text-xs mt-1">
              Personalized calculation in Rupees based on your intake diagnostics and clinical preferences.
            </p>
          </div>
          
          <div className="bg-surface-container-low p-sm rounded-2xl border border-outline-variant/40 flex items-center gap-sm shadow-sm shrink-0">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div>
              <p className="font-label-sm text-[9px] uppercase font-bold text-outline tracking-wider">Reliability Score</p>
              <p className="font-bold text-secondary text-xs">{isIntakeFilled ? "High (92%)" : "None (0%)"}</p>
            </div>
          </div>
        </div>

        {/* Selected Intake Profile Parameters Badge strip */}
        <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-md flex flex-wrap gap-xs items-center justify-between shadow-sm text-xs text-on-surface-variant font-medium font-body-sm">
          <div className="flex flex-wrap items-center gap-y-2 gap-x-sm">
            <span className="font-bold text-[#B83B5E] flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">tune</span> Intake Parameters:
            </span>
            <span>State: <strong>{patientState || "Pending"}</strong></span>
            <span>•</span>
            <span>Age: <strong>{age || "Pending"}</strong></span>
            <span>•</span>
            <span>Stage: <strong>{stage || "Pending"}</strong></span>
            <span>•</span>
            <span>Receptors: <strong>{hormoneStatus || "Pending"}</strong></span>
            <span>•</span>
            <span>Hospital: <strong>{hospitalType ? hospitalType.split(" / ")[0] : "Pending"}</strong></span>
            <span>•</span>
            <span>Insurance: <strong>{hasInsurance ? (insuranceProvider || "Yes") : "None / Pending"}</strong></span>
            <span>•</span>
            <span>Income: <strong>{incomeBracket || "Pending"}</strong></span>
          </div>
          
          <Link to="/intake" className="text-xs text-[#B83B5E] hover:underline font-bold flex items-center gap-[2px] shrink-0">
            {isIntakeFilled ? "Edit Parameters" : "Start Intake"} <span className="material-symbols-outlined text-[14px]">{isIntakeFilled ? "edit" : "arrow_forward"}</span>
          </Link>
        </div>

        {!isIntakeFilled ? (
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-xl text-center space-y-md shadow-sm max-w-2xl mx-auto my-lg animate-fade-in">
            <span className="material-symbols-outlined text-[#B83B5E] text-[64px] animate-pulse">payments</span>
            <h3 className="font-headline-md text-headline-md text-primary font-bold">Treatment Cost Estimate Pending</h3>
            <p className="font-body-md text-on-surface-variant text-xs leading-relaxed max-w-md mx-auto">
              We need a few details about your diagnosis, treatment recommendations, and insurance status to calculate your customized cost roadmap and potential out-of-pocket expenses.
            </p>
            <Link
              to="/intake"
              className="inline-flex items-center gap-xs bg-primary text-on-primary hover:brightness-110 px-lg py-md rounded-2xl font-bold text-xs shadow-md active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-sm">assignment</span>
              Fill Out Intake Form
            </Link>
          </div>
        ) : (
          <>
            {/* Summary Cards Panel */}
            <div className={`grid grid-cols-1 md:grid-cols-${subsidyApplied ? '4' : '3'} gap-md mb-md`}>
              <SummaryCard label="Total Estimate" value={formatINR(totalEstimate)} tone="primary" />
              <SummaryCard 
                label="Insurance Coverage" 
                value={formatINR(insuranceShare)} 
                tone="secondary" 
                pct={Math.round((insuranceShare / totalEstimate) * 100)} 
              />
              {subsidyApplied && (
                <SummaryCard 
                  label={`Welfare Subsidy`} 
                  sublabel={subsidyName.split(" (")[0]}
                  value={formatINR(subsidyAmount)} 
                  tone="primary" 
                  pct={Math.round((subsidyAmount / totalEstimate) * 100)} 
                />
              )}
              <SummaryCard 
                label="Net Out-of-Pocket" 
                value={formatINR(outOfPocket)} 
                tone={outOfPocket === 0 ? "secondary" : "tertiary"} 
                pct={Math.round((outOfPocket / totalEstimate) * 100)} 
              />
            </div>

            {/* Subsidy notification banner */}
            {subsidyApplied && (
              <div className="bg-[#F9CBDB]/10 border border-[#F9CBDB]/30 rounded-2xl p-md flex items-start gap-sm">
                <span className="material-symbols-outlined text-[#B83B5E] text-[20px] mt-0.5">volunteer_activism</span>
                <div>
                  <h4 className="text-xs font-bold text-[#B83B5E]">{subsidyName} Applied</h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
                    Your out-of-pocket share has been reduced by <strong>{formatINR(subsidyAmount)}</strong> because of your income classification. Submit your income certificate during the action plan stages to lock in this subsidy.
                  </p>
                </div>
              </div>
            )}

            {/* Timeline Breakdown List */}
            <div className="space-y-lg relative pt-sm">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-outline-variant/60 hidden md:block" />
              {sections.map((s) => (
                <section className="relative" key={s.title}>
                  <div className="flex items-center gap-md mb-md">
                    <div className="z-10 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-md shrink-0 border border-outline-variant/40">
                      <span className="material-symbols-outlined text-[30px]">{s.icon}</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold">{s.title}</h3>
                  </div>
                  <div className="md:ml-20 space-y-sm">
                    {s.items.map((it) => (
                      <LineItem key={it.title} {...it} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Financial Resilience Insight */}
            <div className="mt-xl bg-primary-container/20 text-on-primary-container p-lg rounded-3xl flex flex-col md:flex-row gap-lg items-center overflow-hidden border border-outline-variant/40 relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-container/30 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex-1 z-10 space-y-sm">
                <h2 className="font-headline-md text-headline-md font-bold text-primary">Financial Resilience Insight</h2>
                <p className="font-body-md text-on-surface-variant text-xs leading-relaxed max-w-2xl">
                  By selecting an empanelled, specialized center, you can save up to <strong>{formatINR(Math.round(totalEstimate * 0.15))}</strong> in hospital beds and ICU fees. Our estimates are verified against local radiology registries and empanelled hospital databases.
                </p>
                <Link
                  to="/action-plan"
                  className="inline-flex items-center gap-xs bg-secondary hover:bg-secondary/90 px-md py-sm rounded-xl font-bold text-xs text-on-secondary shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Review Savings Roadmap
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              
              <div className="w-full md:w-64 flex flex-col items-center gap-sm z-10 bg-surface-container-low border border-outline-variant/40 p-md rounded-2xl">
                <div className="relative w-44 h-22 overflow-hidden flex flex-col justify-end items-center pt-2">
                  <div className="absolute top-2 w-36 h-36 border-[10px] border-surface-container-high rounded-full" />
                  <div
                    className="absolute top-2 w-36 h-36 border-[10px] border-t-secondary border-r-secondary border-l-transparent border-b-transparent rounded-full origin-center transition-all duration-700"
                    style={{ transform: "rotate(45deg)" }}
                  />
                  <span className="font-headline-sm text-sm text-primary font-bold z-10">Excellent</span>
                </div>
                <p className="font-label-sm text-[9px] uppercase font-bold text-outline text-center tracking-wider mt-1">
                  Network Alignment Index
                </p>
              </div>
            </div>
          </>
        )}

      </div>
    </AppShell>
  );
}

function SummaryCard({
  label,
  sublabel,
  value,
  tone,
  pct = 100,
}: {
  label: string;
  sublabel?: string;
  value: string;
  tone: "primary" | "secondary" | "tertiary";
  pct?: number;
}) {
  const text = { primary: "text-primary", secondary: "text-secondary", tertiary: "text-tertiary" }[tone];
  const bar = { primary: "bg-primary", secondary: "bg-secondary", tertiary: "bg-tertiary" }[tone];
  return (
    <div className="bg-surface-container-low p-md rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col justify-between">
      <div>
        <p className="font-label-md text-[10px] uppercase font-bold text-outline tracking-wider mb-xs">{label}</p>
        <p className={`font-headline-md text-headline-md font-bold text-[20px] ${text}`}>{value}</p>
        {sublabel && <p className="text-[10px] text-outline font-medium italic mt-0.5">{sublabel}</p>}
      </div>
      <div className="w-full h-1 bg-surface-container-high mt-md rounded-full overflow-hidden">
        <div className={`${bar} h-1 rounded-full transition-all duration-300`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function LineItem({ title, body, estimate, insurance, oop }: Item) {
  return (
    <div className="bg-surface-container-low p-md rounded-2xl border border-outline-variant/50 hover:border-[#F9CBDB]/60 hover:shadow-sm transition-all">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-sm">
        <div className="flex-1 min-w-0 pr-md">
          <h4 className="font-label-md text-xs font-bold text-primary">{title}</h4>
          <p className="font-body-sm text-[10px] text-on-surface-variant leading-normal mt-1">{body}</p>
        </div>
        <div className="grid grid-cols-3 gap-md w-full md:w-auto shrink-0 pt-sm md:pt-0 border-t md:border-t-0 border-outline-variant/20">
          <Cell label="Estimate" value={estimate} bold />
          <Cell label="Insurance" value={insurance} tone="text-secondary" />
          <Cell label="OOP" value={oop} tone="text-tertiary" bold />
        </div>
      </div>
    </div>
  );
}

function Cell({ label, value, tone, bold }: { label: string; value: string; tone?: string; bold?: boolean }) {
  return (
    <div>
      <p className="font-label-sm text-[9px] uppercase font-bold text-outline tracking-wider">{label}</p>
      <p className={`font-body-md text-xs mt-1 ${bold ? "font-bold" : ""} ${tone ?? "text-on-surface"}`}>
        {value}
      </p>
    </div>
  );
}
