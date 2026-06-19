import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";
import { auth, saveUserIntakeToFirestore } from "../firebase";

type Doc = { name: string; sub: string; status: "ready" | "warning" | "pending" };

const docsInitial: Doc[] = [
  { name: "Aadhar Card", sub: "Identity Proof (Verified)", status: "ready" },
  { name: "Medical Reports", sub: "Last 3 months (Ready)", status: "ready" },
  { name: "Income Certificate", sub: "Issued by Tehsildar", status: "warning" },
  { name: "Ration Card", sub: "BPL/Priority Category", status: "pending" },
];

type TimelineStepType = {
  n: number;
  title: string;
  body: string;
  hint?: string;
  completed: boolean;
  disabled?: boolean;
};



export default function ActionPlan() {
  const [activeRoadmapTab, setActiveRoadmapTab] = useState<"timeline" | "documents">("timeline");

  // Dynamic profile state hooks
  const [userName, setUserName] = useState(() => localStorage.getItem("artham_user_name") || "Guest User");
  const [patientState, setPatientState] = useState(() => localStorage.getItem("artham_intake_state") || "");
  const [age, setAge] = useState(() => localStorage.getItem("artham_intake_age") || "");
  const [stage, setStage] = useState(() => localStorage.getItem("artham_intake_stage") || "");
  const [hormoneStatus, setHormoneStatus] = useState(() => localStorage.getItem("artham_intake_hormone_status") || "");
  const [surgery, setSurgery] = useState(() => localStorage.getItem("artham_intake_surgery") || "");
  const [chemo, setChemo] = useState(() => localStorage.getItem("artham_intake_chemo") || "");
  const [radiation, setRadiation] = useState(() => localStorage.getItem("artham_intake_radiation") || "");
  const [hospitalType, setHospitalType] = useState(() => localStorage.getItem("artham_intake_hospital_type") || "");
  const [hasInsurance, setHasInsurance] = useState(() => localStorage.getItem("artham_intake_has_insurance") === "true");
  const [insurance, setInsurance] = useState(() => {
    const hasIns = localStorage.getItem("artham_intake_has_insurance") === "true";
    const provider = localStorage.getItem("artham_intake_insurance_provider");
    return hasIns ? (provider || "Yes (details pending)") : "No Insurance";
  });
  const [incomeBracket, setIncomeBracket] = useState(() => localStorage.getItem("artham_intake_income_bracket") || "");

  const isIntakeFilled = !!patientState && !!age && !!stage;

  useEffect(() => {
    const syncProfile = () => {
      setUserName(localStorage.getItem("artham_user_name") || "Guest User");
      setPatientState(localStorage.getItem("artham_intake_state") || "");
      setAge(localStorage.getItem("artham_intake_age") || "");
      setStage(localStorage.getItem("artham_intake_stage") || "");
      setHormoneStatus(localStorage.getItem("artham_intake_hormone_status") || "");
      setSurgery(localStorage.getItem("artham_intake_surgery") || "");
      setChemo(localStorage.getItem("artham_intake_chemo") || "");
      setRadiation(localStorage.getItem("artham_intake_radiation") || "");
      setHospitalType(localStorage.getItem("artham_intake_hospital_type") || "");
      setHasInsurance(localStorage.getItem("artham_intake_has_insurance") === "true");
      
      const hasIns = localStorage.getItem("artham_intake_has_insurance") === "true";
      const provider = localStorage.getItem("artham_intake_insurance_provider");
      setInsurance(hasIns ? (provider || "Yes (details pending)") : "No Insurance");
      
      setIncomeBracket(localStorage.getItem("artham_intake_income_bracket") || "");
    };

    window.addEventListener("auth-change", syncProfile);
    return () => window.removeEventListener("auth-change", syncProfile);
  }, []);

  const handleResetProfile = () => {
    if (window.confirm("Are you sure you want to reset your intake profile data? This will clear all entered answers.")) {
      // Clear local storage
      const INTAKE_KEYS = [
        "artham_intake_state",
        "artham_intake_age",
        "artham_intake_stage",
        "artham_intake_hormone_status",
        "artham_intake_surgery",
        "artham_intake_chemo",
        "artham_intake_radiation",
        "artham_intake_hospital_type",
        "artham_intake_has_insurance",
        "artham_intake_insurance_provider",
        "artham_intake_income_bracket",
        "artham_intake_step"
      ];
      INTAKE_KEYS.forEach(key => localStorage.removeItem(key));

      // Clear Firestore
      if (auth.currentUser) {
        saveUserIntakeToFirestore(auth.currentUser.uid, {
          artham_intake_state: "",
          artham_intake_age: "",
          artham_intake_stage: "",
          artham_intake_hormone_status: "",
          artham_intake_surgery: "Yes",
          artham_intake_chemo: "Yes",
          artham_intake_radiation: "Yes",
          artham_intake_hospital_type: "Government / Public Hospital",
          artham_intake_has_insurance: "true",
          artham_intake_insurance_provider: "",
          artham_intake_income_bracket: "",
          artham_intake_step: "1"
        });
      }

      window.dispatchEvent(new CustomEvent("auth-change"));
    }
  };

  // Determine state welfare program dynamically
  const getStateScheme = (stateName: string) => {
    switch (stateName) {
      case "Maharashtra":
        return {
          name: "Mahatma Jyotiba Phule Jan Arogya Yojana (MJPJAY)",
          description: "Offers cashless health coverage up to ₹5 Lakhs per family per year in empanelled oncology centers in Maharashtra."
        };
      case "Karnataka":
        return {
          name: "Arogya Karnataka (AB-ArK)",
          description: "Covers up to ₹5 Lakhs annually for tertiary oncology chemotherapy, radiation, and surgeries in Karnataka."
        };
      case "West Bengal":
        return {
          name: "Swasthya Sathi Scheme",
          description: "Provides smart card-based health insurance offering up to ₹5 Lakhs annually for cancer treatments in West Bengal."
        };
      case "Tamil Nadu":
        return {
          name: "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS)",
          description: "Cashless welfare cover up to ₹5 Lakhs per family per year for advanced oncology packages in Tamil Nadu."
        };
      case "Kerala":
        return {
          name: "Karunya Arogya Suraksha Padhathi (KASP)",
          description: "Offers family health protection up to ₹5 Lakhs per year for specified cancer diagnostic scans and chemo cycles."
        };
      case "Delhi":
        return {
          name: "Delhi Arogya Kosh (DAK)",
          description: "Delhi government aid covering costs of diagnostic imaging scans and cancer surgeries at approved partner labs."
        };
      case "Gujarat":
        return {
          name: "Mukhyamantri Amrutam (MA) Yojana",
          description: "Provides cashless medical assistance up to ₹5 Lakhs for cancer packages to lower-income families in Gujarat."
        };
      case "Telangana":
      case "Andhra Pradesh":
        return {
          name: "Dr. YSR Aarogyasri Health Scheme",
          description: "State-sponsored cashless healthcare covering critical cancer operations and chemotherapy cycles."
        };
      case "Rajasthan":
        return {
          name: "Mukhyamantri Chiranjeevi Swasthya Bima Yojana",
          description: "Offers cashless health coverage up to ₹25 Lakhs per family per year for major oncology treatments."
        };
      case "Odisha":
        return {
          name: "Biju Swasthya Kalyan Yojana (BSKY)",
          description: "Welfare scheme covering up to ₹10 Lakhs for female oncology care in Odisha."
        };
      default:
        return {
          name: "Ayushman Bharat (PM-JAY)",
          description: "National public health cover up to ₹5 Lakhs per year for advanced cancer chemotherapy and operations."
        };
    }
  };

  const stateScheme = getStateScheme(patientState);

  // Interactive state variables
  const [docs, setDocs] = useState<Doc[]>(docsInitial);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [completedSchemeSteps, setCompletedSchemeSteps] = useState<string[]>([]);

  // Derive timeline steps from recommendations and state
  const timelineSteps: TimelineStepType[] = [
    { n: 1, title: "Day 1: Collect Medical Reports", body: "Gather all recent blood work, biopsy reports, and MRI scans from the hospital records office.", completed: completedSteps.includes(1) },
    { n: 2, title: "Day 2: Visit Nodal Office", body: "Meet the Government Health Liaison at the District Nodal Office for scheme verification.", hint: `Bring 2 passport photos and original Aadhar to verify under ${stateScheme.name}.`, completed: completedSteps.includes(2) }
  ];

  let currentDayNum = 3;
  if (surgery === "Yes" || surgery === "Unsure") {
    const surgeryDay = currentDayNum++;
    timelineSteps.push({
      n: surgeryDay,
      title: `Day ${surgeryDay}: Pre-Surgical Consultation`,
      body: "Meet with your surgical oncologist to discuss lumpectomy or mastectomy options and room booking limits.",
      completed: completedSteps.includes(surgeryDay)
    });
  }

  if (chemo === "Yes" || chemo === "Unsure") {
    const chemoDay = currentDayNum++;
    timelineSteps.push({
      n: chemoDay,
      title: `Day ${chemoDay}: Chemotherapy Plan Approval`,
      body: "Confirm chemotherapy regimen approvals, oncologist schedule, and pharmacy drug requisition orders.",
      completed: completedSteps.includes(chemoDay)
    });
  }

  const finalDay = currentDayNum;
  timelineSteps.push({
    n: finalDay,
    title: `Day ${finalDay}: Submit Final Application`,
    body: `Upload all verified documents to the ${stateScheme.name} Treatment Portal or submit at Counter 12.`,
    disabled: true,
    completed: completedSteps.includes(finalDay)
  });

  // Helper callbacks
  const toggleDoc = (i: number) => {
    setDocs((prev) =>
      prev.map((d, idx) =>
        idx === i ? { ...d, status: d.status === "ready" ? "pending" : "ready" } : d
      )
    );
  };

  const toggleTimeline = (stepNum: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNum)
        ? prev.filter((n) => n !== stepNum)
        : [...prev, stepNum]
    );
  };

  const toggleSchemeStep = (schemeId: string, stepIdx: number) => {
    const key = `${schemeId}_${stepIdx}`;
    setCompletedSchemeSteps((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const isDocReady = (docName: string) => {
    const found = docs.find((d) => d.name.toLowerCase().includes(docName.toLowerCase()));
    return found ? found.status === "ready" : false;
  };

  // Derive suggested schemes based on user variables
  const suggestedSchemes: {
    id: string;
    type: string;
    title: string;
    description: string;
    matchReason: string;
    suitability: string;
    matchScore: number;
    steps: { head: string; sub: string }[];
    documents: string[];
    contact: { tollFree: string; deskName: string; actionUrl: string };
  }[] = [];

  // 1. State government scheme
  suggestedSchemes.push({
    id: "state_govt",
    type: "Government Scheme",
    title: stateScheme.name,
    description: stateScheme.description,
    matchReason: `Eligible as a resident of ${patientState || "India"}.`,
    suitability: "High",
    matchScore: 95,
    steps: [
      { head: "Visit the Empanelled Hospital Nodal Counter", sub: `Ask for the '${patientState === "Karnataka" ? "Arogya Mitra" : patientState === "Maharashtra" ? "Arogya Sevak" : "Scheme coordinator"}' desk.` },
      { head: "Present ID and Income Documents", sub: "Present your Aadhar card, Ration card (BPL/Priority), and Tehsildar income certificate." },
      { head: "Obtain Pre-Authorization Certificate", sub: "The hospital coordinator will submit your medical reports to the state board for cashless treatment clearance." }
    ],
    documents: ["Aadhar Card", "Ration Card", "Income Certificate"],
    contact: {
      tollFree: "104 (State Health Helpline)",
      deskName: "Hospital Scheme Nodal Office",
      actionUrl: "/schemes"
    }
  });

  // 2. Private Trust Aid (e.g. Tata Trusts)
  const isLowerIncome = incomeBracket === "Below ₹2,50,000" || incomeBracket === "₹2,50,000 – ₹5,00,000";
  if (isLowerIncome || hospitalType === "Government / Public Hospital") {
    suggestedSchemes.push({
      id: "private_trust",
      type: "Private Trust Aid",
      title: "Tata Trusts Financial Assistance",
      description: "Provides grant-based financial subsidies for critical cancer medicines, chemotherapy cycles, and radiation packages in empanelled cancer centres.",
      matchReason: `Matched due to income bracket (${incomeBracket}) or public hospital choice.`,
      suitability: "Moderate to High",
      matchScore: 84,
      steps: [
        { head: "Obtain Application Form", sub: "Request Form T-202 from the hospital social worker or download from the Tata Trusts website." },
        { head: "Oncologist Certification", sub: "Get the application certified and stamped by the treating oncology surgeon or chief medical superintendent." },
        { head: "Submit Original Estimates", sub: "Provide original cost estimate sheets from the hospital along with identity proof." }
      ],
      documents: ["Income Certificate", "Medical Reports", "Aadhar Card"],
      contact: {
        tollFree: "022-66658282 (Mumbai Corporate Office)",
        deskName: "Medical Social Worker (MSW) Dept",
        actionUrl: "/schemes"
      }
    });
  }

  // 3. National RAN Scheme
  if ((incomeBracket === "Below ₹2,50,000" || incomeBracket === "Not specified") && hospitalType === "Government / Public Hospital") {
    suggestedSchemes.push({
      id: "national_ran",
      type: "National Government Scheme",
      title: "Rashtriya Arogya Nidhi (RAN) - HMCSF",
      description: "One-time financial assistance up to ₹15 Lakhs for super-specialty treatment of life-threatening illnesses in Government Hospitals for BPL families.",
      matchReason: `Eligible due to Government hospital preference and BPL income status.`,
      suitability: "High",
      matchScore: 90,
      steps: [
        { head: "Hospital Verification", sub: "Get the prescribed RAN application form filled by the treating oncologist of the government hospital." },
        { head: "Income & BPL Card Attestation", sub: "Attach attested copies of your BPL card, family income certificate, and Aadhar card." },
        { head: "Submit to Superintendent office", sub: "Submit to the hospital superintendent, who forwards it directly to the Central Health Ministry." }
      ],
      documents: ["Ration Card", "Income Certificate", "Aadhar Card"],
      contact: {
        tollFree: "011-23061333 (Ministry of Health & Family Welfare)",
        deskName: "Medical Superintendent Office",
        actionUrl: "/schemes"
      }
    });
  }

  // 4. Insurance Schemes
  if (hasInsurance) {
    suggestedSchemes.push({
      id: "private_insurance",
      type: "Private Health Insurance",
      title: `${insurance} Cashless / Reimbursement Claim`,
      description: "Commercial health insurance policy coverage for oncology surgeries, inpatient hospitalizations, and daycare chemotherapy.",
      matchReason: `Configured in your profile: Private Insurance.`,
      suitability: "High",
      matchScore: 92,
      steps: [
        { head: "File Pre-Authorization", sub: "Submit TPA pre-auth form at least 48 hours before surgery or chemo cycle." },
        { head: "Monitor Room Rent Limits", sub: "Ensure your selected ward stays within room rent caps (typically 1% of Sum Insured) to avoid proportional deductions." },
        { head: "TPA Approval Follow-up", sub: "Track approvals with the hospital desk or call TPA support to expedite pre-clearance." }
      ],
      documents: ["Medical Reports", "Aadhar Card"],
      contact: {
        tollFree: "Insurance TPA Desk / Customer Care Support",
        deskName: "Hospital TPA Desk (Third Party Administrator)",
        actionUrl: "/cost-breakdown"
      }
    });
  } else {
    suggestedSchemes.push({
      id: "crowdfunding_alternatives",
      type: "Alternative Funding",
      title: "Medical Crowdfunding (Milaap / Ketto)",
      description: "Create online fundraising campaigns to receive micro-donations from the community for self-paying oncology expenses.",
      matchReason: "Recommended since no commercial private insurance was declared.",
      suitability: "Moderate",
      matchScore: 70,
      steps: [
        { head: "Set up Online Campaign", sub: "Register a campaign on Milaap or Ketto under 'Medical Fundraiser'." },
        { head: "Submit Verification Documents", sub: "Upload oncologist cost estimates, patient photos, and government ID for platform verification." },
        { head: "Share with Social Networks", sub: "Share the verified campaign link on WhatsApp and Facebook to gather donations." }
      ],
      documents: ["Medical Reports", "Aadhar Card"],
      contact: {
        tollFree: "Support: Milaap (+91-9916104747)",
        deskName: "Online Crowdfunding Campaign Portal",
        actionUrl: "https://milaap.org"
      }
    });
  }

  // Add customized documents
  const addCustomDoc = () => {
    const docName = prompt("Enter custom document name:");
    if (docName && docName.trim()) {
      setDocs((prev) => [
        ...prev,
        { name: docName.trim(), sub: "Custom document", status: "pending" }
      ]);
    }
  };

  // Dynamically calculate progress metrics
  const docsReady = docs.filter((d) => d.status === "ready").length;
  const docsProgress = docs.length > 0 ? Math.round((docsReady / docs.length) * 100) : 0;
  const timelineReady = timelineSteps.filter((t) => t.completed).length;
  const timelineProgress = timelineSteps.length > 0 ? Math.round((timelineReady / timelineSteps.length) * 100) : 0;

  const schemeProgresses = suggestedSchemes.map((scheme) => {
    const stepsCount = scheme.steps.length;
    const completedCount = scheme.steps.filter((_, idx) =>
      completedSchemeSteps.includes(`${scheme.id}_${idx}`)
    ).length;
const progress = stepsCount > 0 ? Math.round((completedCount / stepsCount) * 100) : 100;
    return { id: scheme.id, progress };
  });

  const avgSchemeProgress = schemeProgresses.length > 0
    ? Math.round(schemeProgresses.reduce((acc, curr) => acc + curr.progress, 0) / schemeProgresses.length)
    : 100;

  // Overall consolidated readiness calculation (averaging active components)
  const totalReadiness = isIntakeFilled ? Math.round((docsProgress + timelineProgress + avgSchemeProgress) / 3) : 0;

  return (
    <AppShell>
      <div className="px-margin-mobile md:px-gutter pt-md pb-xl max-w-container-max mx-auto space-y-lg animate-fade-in">
        
        {/* Header Block */}
        <header className="bg-gradient-to-r from-primary-container/20 via-primary-container/5 to-surface-container-low border border-outline-variant rounded-3xl p-md md:p-lg flex flex-col md:flex-row justify-between items-center gap-md shadow-sm">
          <div className="max-w-2xl space-y-xs">
            <span className="inline-flex items-center gap-xs px-2.5 py-1 bg-primary-container text-primary border border-primary/20 text-[10px] font-bold rounded-full uppercase tracking-wider">
              <span className="material-symbols-outlined text-[12px]">lightbulb</span>
              Consolidated Treatment Navigator
            </span>
            <h1 className="font-headline-lg text-[28px] md:text-headline-lg text-primary font-bold tracking-tight">
              Your Personalized Action & Support Plan
            </h1>
            <p className="font-body-md text-on-surface-variant leading-relaxed text-sm">
              We've combined your day-by-day checklist, document readiness tracker, and matched eligible schemes into a single dashboard. Follow these tasks to secure your healthcare funding.
            </p>
          </div>
          <div className="bg-surface-bright border border-outline-variant rounded-2xl p-sm shadow-sm shrink-0 flex items-center gap-sm">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <div>
              <p className="font-label-sm text-outline text-[10px] font-semibold uppercase tracking-wider">Security Checked</p>
              <p className="font-bold text-secondary text-xs">{isIntakeFilled ? "85% Match Accuracy" : "None (0%)"}</p>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        {!isIntakeFilled ? (
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-xl text-center space-y-md shadow-sm max-w-2xl mx-auto my-lg animate-fade-in">
            <span className="material-symbols-outlined text-[#B83B5E] text-[64px] animate-pulse">route</span>
            <h3 className="font-headline-md text-headline-md text-primary font-bold">Personalized Action & Support Plan Pending</h3>
            <p className="font-body-md text-on-surface-variant text-xs leading-relaxed max-w-md mx-auto">
              Complete the patient financial intake so we can match you with eligible state government welfare programs, charity funds, and insurance desk navigation guides.
            </p>
            <Link
              to="/intake"
              className="inline-flex items-center gap-xs bg-primary text-on-primary hover:brightness-110 px-lg py-md rounded-2xl font-bold text-xs shadow-md active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-sm">assignment</span>
              Start Intake Onboarding
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
            
            {/* LEFT PANEL: Interactive Checklists & Matched Schemes */}
            <div className="lg:col-span-8 space-y-lg">
              
              {/* Roadmap & Checklist Card */}
              <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/60 p-md md:p-lg shadow-sm space-y-md">
                
                {/* Header & Internal Switcher Tab */}
                <div className="border-b border-outline-variant/30 pb-sm flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-primary flex items-center gap-xs">
                      <span className="material-symbols-outlined text-primary text-[22px]">assignment_turned_in</span>
                      Interactive Roadmap
                    </h2>
                    <p className="text-[11px] text-on-surface-variant font-normal">
                      Follow timeline tasks and check off document preparations.
                    </p>
                  </div>
                  
                  {/* Segmented Sub-Tab Switcher */}
                  <div className="inline-flex bg-surface-container-high p-1 rounded-xl border border-outline-variant/50">
                    <button
                      onClick={() => setActiveRoadmapTab("timeline")}
                      className={`px-sm py-1 rounded-lg text-xs font-bold transition-all ${
                        activeRoadmapTab === "timeline"
                          ? "bg-surface-bright text-primary shadow-sm"
                          : "text-outline hover:text-on-surface-variant"
                      }`}
                    >
                      Timeline Tasks
                    </button>
                    <button
                      onClick={() => setActiveRoadmapTab("documents")}
                      className={`px-sm py-1 rounded-lg text-xs font-bold transition-all ${
                        activeRoadmapTab === "documents"
                          ? "bg-surface-bright text-primary shadow-sm"
                          : "text-outline hover:text-on-surface-variant"
                      }`}
                    >
                      Required Documents
                    </button>
                  </div>
                </div>

                {/* Tab Contents */}
                {activeRoadmapTab === "timeline" ? (
                  <div className="space-y-md relative pt-2">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-outline-variant/60" />
                    
                    {timelineSteps.map((step) => {
                      return (
                        <div key={step.n} className="flex gap-md relative">
                          <button
                            onClick={() => !step.disabled && toggleTimeline(step.n)}
                            className={`z-10 w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                              step.completed
                                ? "bg-secondary border-secondary text-on-secondary shadow-sm scale-105"
                                : step.disabled
                                ? "bg-surface-container-high border-outline-variant text-outline cursor-not-allowed"
                                : "bg-surface-bright border-outline text-outline hover:border-primary hover:text-primary active:scale-95"
                            }`}
                            disabled={step.disabled}
                          >
                            {step.completed ? (
                              <span className="material-symbols-outlined text-[20px]">check</span>
                            ) : (
                              <span className="font-headline-sm text-xs font-bold">{step.n}</span>
                            )}
                          </button>
                          
                          <div className="flex-1 pb-md">
                            <h4 className={`font-label-md text-xs font-bold ${step.completed ? "text-secondary line-through opacity-70" : "text-on-surface"}`}>
                              {step.title}
                            </h4>
                            <p className={`font-body-sm text-[10px] leading-relaxed mt-1 ${step.completed ? "text-on-surface-variant/75 line-through opacity-70" : "text-on-surface-variant"}`}>
                              {step.body}
                            </p>
                            {step.hint && !step.completed && (
                              <div className="mt-xs p-xs bg-[#F9CBDB]/10 border border-[#F9CBDB]/20 text-[#B83B5E] text-[9px] font-bold rounded-lg inline-flex items-center gap-xs">
                                <span className="material-symbols-outlined text-[12px]">info</span>
                                {step.hint}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                      {docs.map((doc, i) => {
                        const isReady = doc.status === "ready";
                        return (
                          <div
                            key={doc.name}
                            onClick={() => toggleDoc(i)}
                            className={`p-sm border rounded-2xl cursor-pointer hover:shadow-sm transition-all flex items-center justify-between group ${
                              isReady
                                ? "bg-secondary-container/10 border-secondary/30"
                                : doc.status === "warning"
                                ? "bg-[#F9CBDB]/5 border-[#F9CBDB]/25"
                                : "bg-surface-container-low border-outline-variant"
                            }`}
                          >
                            <div className="flex items-center gap-sm">
                              <span
                                className={`material-symbols-outlined text-[20px] ${
                                  isReady
                                    ? "text-secondary font-bold"
                                    : doc.status === "warning"
                                    ? "text-[#B83B5E]"
                                    : "text-outline"
                                }`}
                              >
                                {isReady ? "check_circle" : doc.status === "warning" ? "warning" : "pending_actions"}
                              </span>
                              <div>
                                <h4 className="font-bold text-on-surface text-xs leading-none group-hover:text-primary">
                                  {doc.name}
                                </h4>
                                <p className="text-[9px] text-on-surface-variant mt-1.5 leading-none">
                                  {doc.sub}
                                </p>
                              </div>
                            </div>
                            
                            <span className="material-symbols-outlined text-outline group-hover:text-primary text-[16px] pr-1">
                              {isReady ? "check_box" : "check_box_outline_blank"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      onClick={addCustomDoc}
                      className="w-full border-2 border-dashed border-outline-variant py-md rounded-2xl text-on-surface-variant font-bold text-xs flex items-center justify-center gap-xs hover:border-[#B83B5E] hover:text-[#B83B5E] transition-all bg-surface-container-lowest"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_circle</span>
                      Add Custom Document
                    </button>
                  </div>
                )}

              </section>

              {/* Matched Schemes List Section */}
              <section className="space-y-sm">
                <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-xs font-bold pl-1">
                  <span className="material-symbols-outlined text-secondary" style={{ fontSize: 24 }}>account_balance</span>
                  Matched Schemes & Guidance Checklist
                </h3>
                
                {suggestedSchemes.map((scheme) => {
                  return (
                    <div
                      key={scheme.id}
                      className="bg-surface-container-low border border-outline-variant/60 rounded-3xl p-md md:p-lg space-y-md shadow-sm animate-fade-in"
                    >
                      {/* Badge strip */}
                      <div className="flex justify-between items-center flex-wrap gap-xs">
                        <span className="inline-block px-sm py-[2px] bg-primary/10 border border-primary/20 text-primary text-[9px] font-bold rounded-lg">
                          {scheme.type}
                        </span>
                        
                        <div className="flex items-center gap-sm text-[10px] font-semibold">
                          <span className="text-[#B83B5E] bg-[#F9CBDB]/10 border border-[#F9CBDB]/30 px-xs py-[2px] rounded-lg">
                            Score: {scheme.matchScore}%
                          </span>
                          <span className="text-secondary bg-secondary-container/10 border border-secondary/20 px-xs py-[2px] rounded-lg">
                            Suitability: {scheme.suitability}
                          </span>
                        </div>
                      </div>

                      {/* Info header */}
                      <div className="space-y-xs">
                        <h4 className="font-headline-sm text-headline-sm font-bold text-primary leading-tight">
                          {scheme.title}
                        </h4>
                        <p className="font-body-sm text-[10px] text-on-surface-variant leading-relaxed">
                          {scheme.description}
                        </p>
                        <p className="text-[10px] text-primary italic font-medium">
                          Match Reason: {scheme.matchReason}
                        </p>
                      </div>

                      {/* Required Documents check strip */}
                      <div className="p-xs bg-surface-container-high border border-outline-variant/50 rounded-2xl flex flex-wrap gap-sm items-center text-[10px]">
                        <span className="font-bold text-outline uppercase pl-1 tracking-wider text-[9px]">Required Docs:</span>
                        {scheme.documents.map((docName) => {
                          const ready = isDocReady(docName);
                          return (
                            <div key={docName} className="flex items-center gap-xs">
                              <span className={`material-symbols-outlined text-[14px] ${ready ? "text-secondary font-bold" : "text-outline"}`}>
                                {ready ? "check_circle" : "cancel"}
                              </span>
                              <span className={ready ? "text-secondary font-bold" : "text-on-surface-variant"}>{docName}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Interactive guidance list */}
                      <div className="space-y-sm">
                        <h5 className="font-label-md text-[10px] uppercase font-bold text-outline tracking-wider pl-1">
                          Step-by-Step Guidance checklist
                        </h5>
                        <div className="space-y-xs">
                          {scheme.steps.map((st, stepIdx) => {
                            const isDone = completedSchemeSteps.includes(`${scheme.id}_${stepIdx}`);
                            return (
                              <div
                                key={stepIdx}
                                onClick={() => toggleSchemeStep(scheme.id, stepIdx)}
                                className={`p-sm border rounded-2xl cursor-pointer hover:shadow-xs transition-all flex items-start justify-between group ${
                                  isDone
                                    ? "bg-secondary-container/5 border-secondary/20"
                                    : "bg-white border-outline-variant/80"
                                }`}
                              >
                                <div className="flex gap-sm">
                                  <span className={`material-symbols-outlined text-[16px] mt-0.5 ${isDone ? "text-secondary font-bold" : "text-outline group-hover:text-primary"}`}>
                                    {isDone ? "check_box" : "check_box_outline_blank"}
                                  </span>
                                  <div>
                                    <h6 className={`font-bold text-xs ${isDone ? "text-secondary line-through opacity-70" : "text-on-surface"}`}>
                                      {st.head}
                                    </h6>
                                    <p className={`text-[10px] text-on-surface-variant leading-relaxed mt-1 ${isDone ? "opacity-75 line-through" : ""}`}>
                                      {st.sub}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Scheme action bar */}
                      {(() => {
                        const schemeKeyPrefix = `${scheme.id}_`;
                        const totalSchemeSteps = scheme.steps.length;
                        const completedSchemeStepsCount = completedSchemeSteps.filter(k => k.startsWith(schemeKeyPrefix)).length;
                        const progress = totalSchemeSteps > 0 ? Math.round((completedSchemeStepsCount / totalSchemeSteps) * 100) : 0;
                        return (
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-sm pt-sm border-t border-outline-variant/30 flex-wrap">
                            {/* Left: Progress indicator */}
                            <div className="flex items-center gap-sm">
                              <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden">
                                <div className="bg-primary h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                              </div>
                              <span className="text-[10px] font-bold text-on-surface-variant">Progress: {progress}%</span>
                            </div>
                            
                            {/* Middle: Help desk and Contact */}
                            <div className="flex flex-col text-right pr-2">
                              <span className="text-[9px] uppercase font-bold text-outline leading-none">Contact Helpline</span>
                              <span className="text-xs font-bold text-on-surface mt-1 leading-none">{scheme.contact.tollFree}</span>
                              <span className="text-[9px] text-on-surface-variant mt-0.5 leading-none">Desk: {scheme.contact.deskName}</span>
                            </div>

                            {/* Right: claim link */}
                            {scheme.contact.actionUrl.startsWith("http") ? (
                              <a
                                href={scheme.contact.actionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-secondary text-on-secondary hover:brightness-110 rounded-xl text-xs font-bold shadow-sm transition-all text-center flex items-center justify-center gap-xs"
                              >
                                Visit Site <span className="material-symbols-outlined text-sm">open_in_new</span>
                              </a>
                            ) : (
                              <Link
                                to={scheme.contact.actionUrl}
                                className="px-4 py-2 bg-primary text-on-primary hover:brightness-110 rounded-xl text-xs font-bold shadow-sm transition-all text-center flex items-center justify-center gap-xs"
                              >
                                Check Guide <span className="material-symbols-outlined text-sm">arrow_forward</span>
                              </Link>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  );
                })}

                {/* Lower grid (Generics & PMBJP Advice) */}
                <div className="p-md bg-[#F9CBDB]/10 border border-[#F9CBDB]/30 rounded-2xl space-y-xs animate-fade-in">
                  <h4 className="font-label-md text-primary font-bold flex items-center gap-xs text-xs">
                    <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span> Recommendation
                  </h4>
                  <p className="text-body-sm text-on-surface text-xs leading-relaxed">
                    Based on your prescription history, consider purchasing generic medicines at <strong>PMBJP outlets</strong> to save 40% to 90% on monthly drug therapies.
                  </p>
                </div>

                {/* Navigate Schemes CTA */}
                <Link
                  to="/schemes"
                  className="block bg-primary hover:bg-primary-hover text-on-primary py-3.5 rounded-2xl font-bold text-sm text-center shadow-sm transition-all active:scale-[0.98]"
                >
                  Explore Full Schemes & Insurances Catalogue →
                </Link>
              </section>

            </div>

            {/* RIGHT PANEL: Profile summary, contacts, pro-tips */}
            <div className="lg:col-span-4 space-y-md">
              
              {/* Profile summary card */}
              <section className="bg-surface-container-low border border-outline-variant/60 rounded-3xl p-md shadow-sm space-y-md">
                <div className="flex items-center gap-sm pb-sm border-b border-outline-variant/40">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface text-sm">{userName}</h3>
                    <p className="text-[10px] text-on-surface-variant font-medium">Condition: Breast Cancer Care</p>
                  </div>
                </div>

                <div className="space-y-sm">
                  {[
                    ["State", patientState || "Pending"],
                    ["Age", age || "Pending"],
                    ["Cancer Stage", stage || "Pending"],
                    ["Hormone Status", hormoneStatus || "Pending"],
                    ["Surgery Recommended?", surgery || "Pending"],
                    ["Chemo Recommended?", chemo || "Pending"],
                    ["Radiation Recommended?", radiation || "Pending"],
                    ["Hospital Preference", hospitalType || "Pending"],
                    ["Insurance Cover", insurance],
                    ["Household Income", incomeBracket || "Pending"],
                  ].map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center text-xs">
                      <span className="text-on-surface-variant font-medium">{key}</span>
                      <span className="font-bold text-on-surface text-right truncate max-w-[160px]" title={value}>{value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-sm pt-xs border-t border-outline-variant/20">
                  <Link
                    to="/intake"
                    className="flex-1 py-1.5 border border-outline-variant hover:bg-surface-container-high rounded-xl text-[10px] font-bold text-primary active:scale-95 transition-all flex items-center justify-center gap-xs"
                  >
                    <span className="material-symbols-outlined text-[14px]">edit</span>
                    Edit Profile
                  </Link>
                  <button
                    onClick={handleResetProfile}
                    className="flex-1 py-1.5 border border-error/30 hover:bg-error/5 text-error rounded-xl text-[10px] font-bold active:scale-95 transition-all flex items-center justify-center gap-xs"
                  >
                    <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                    Reset Profile
                  </button>
                </div>

                {/* Consolidated Readiness speedometer */}
                <div className="pt-sm border-t border-outline-variant/40">
                  <div className="flex justify-between items-center text-[10px] font-bold text-outline uppercase tracking-wider mb-sm">
                    <span>Conjoint Readiness Index</span>
                    <span className="text-primary">{totalReadiness}% score</span>
                  </div>
                  
                  <div className="relative flex flex-col items-center h-28 justify-end overflow-hidden pt-4">
                    <div className="absolute top-4 w-40 h-40 border-[12px] border-surface-container-high rounded-full" />
                    <div
                      className="absolute top-4 w-40 h-40 border-[12px] border-t-secondary border-r-secondary border-l-transparent border-b-transparent rounded-full origin-center transition-all duration-700"
                      style={{ transform: `rotate(${-135 + (totalReadiness * 1.8)}deg)` }}
                    />
                    <div className="text-center pb-2 z-10">
                      <span className="font-headline-md text-headline-md text-primary font-bold">
                        {totalReadiness > 80 ? "High" : totalReadiness > 50 ? "Medium" : "Needs Review"}
                      </span>
                      <p className="text-[10px] text-on-surface-variant font-medium">Application Reliability Score</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-outline leading-tight mt-sm text-center italic">
                    Readiness scales automatically as you check off timeline steps, documents, and schemes.
                  </p>
                </div>
              </section>

              {/* Key contacts */}
              <section className="bg-surface-container-low border border-outline-variant/60 rounded-3xl p-md shadow-sm space-y-sm">
                <h3 className="font-bold text-primary text-xs uppercase tracking-wider pl-1">
                  Help & Counseling contacts
                </h3>
                
                <div className="space-y-sm">
                  <div className="bg-surface-bright p-sm rounded-2xl border border-outline-variant/40 space-y-sm">
                    <div className="flex items-center gap-sm">
                      <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[18px]">person</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface text-xs leading-none">Mrs. Ananya Sharma</h4>
                        <p className="text-[10px] text-on-surface-variant mt-1 leading-none">Hospital Social Worker</p>
                      </div>
                    </div>
                    <div className="flex gap-xs pt-xs">
                      <a className="flex-1 bg-secondary hover:bg-secondary/90 text-on-secondary py-2 rounded-xl flex items-center justify-center gap-xs font-bold text-xs shadow-sm transition-all" href="tel:1234567890">
                        <span className="material-symbols-outlined text-[15px]">call</span> Call
                      </a>
                      <button onClick={() => alert("Initiating chat session with counselor...")} className="flex-1 border border-secondary text-secondary py-2 rounded-xl flex items-center justify-center gap-xs font-bold text-xs hover:bg-secondary/5 transition-all">
                        <span className="material-symbols-outlined text-[15px]">chat</span> Chat
                      </button>
                    </div>
                  </div>

                  <div className="bg-surface-bright p-sm rounded-2xl border border-outline-variant/40 text-center space-y-sm">
                    <div className="text-left">
                      <h4 className="font-bold text-primary text-xs leading-none">Government Helpline</h4>
                      <p className="text-[10px] text-on-surface-variant leading-tight mt-1.5">
                        Available 24/7 for insurance claims and public welfare queries.
                      </p>
                    </div>
                    <a className="w-full bg-primary hover:bg-primary-hover text-on-primary py-2 rounded-xl flex items-center justify-center gap-xs font-bold text-xs shadow-sm transition-all block" href="tel:104">
                      <span className="material-symbols-outlined text-[16px]">support_agent</span> Dial 104
                    </a>
                  </div>
                </div>
              </section>

              {/* Pro-Tips Panel */}
              <div className="p-md rounded-3xl bg-gradient-to-br from-primary-container/30 to-primary text-on-primary shadow-sm space-y-sm relative overflow-hidden border border-primary/20">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
                <span className="material-symbols-outlined text-[32px] text-white">description</span>
                <h3 className="font-headline-sm text-sm font-bold text-white leading-none mt-2">Organization Advice</h3>
                <p className="text-[11px] opacity-90 leading-relaxed">
                  Keep all original medical receipts and diagnostic scans in a waterproof folder. Photocopy each document 3 times before your Nodal Office visit.
                </p>
                <button 
                  onClick={() => alert("Downloading digital documentation template checklist...")} 
                  className="w-full py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold text-xs transition-colors"
                >
                  View Document Guide Booklet
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </AppShell>
  );
}
