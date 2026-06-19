import { useState } from "react";
import AppShell from "../components/AppShell";
import { generalInsurers } from "./Schemes";

type ScreeningTest = {
  id: string;
  name: string;
  code: string;
  purpose: string;
  targetArea: string;
  bseInstruction?: string;
  clinicalSignificance: string;
};

const screeningTests: ScreeningTest[] = [
  {
    id: "mammogram",
    name: "Digital Mammography",
    code: "MAMM",
    purpose: "Primary X-ray imaging of breast tissues to detect calcifications, lesions, or hidden lumps.",
    targetArea: "High-accuracy soft-tissue diagnostic scans",
    clinicalSignificance: "Golden standard for breast screening. Detects early stage micro-calcifications up to 2 years before a palpable lump forms."
  },
  {
    id: "cbe",
    name: "Clinical Breast Exam (CBE)",
    code: "CBE",
    purpose: "Physical breast examination conducted by a trained healthcare professional (gynecologist/oncologist).",
    targetArea: "In-office manual palpation & visual audit",
    clinicalSignificance: "Recommended to identify physical alterations or structural anomalies missed on scans."
  },
  {
    id: "bse",
    name: "Breast Self-Exam (BSE)",
    code: "BSE",
    purpose: "Monthly self-palpation technique performed by individuals to maintain proactive body awareness.",
    targetArea: "At-home routine physical evaluation",
    bseInstruction: "Perform 3-5 days after your period ends. Look in the mirror for symmetry changes, raise arms, and palpate in circular patterns from nipple to outer borders.",
    clinicalSignificance: "Enables personal baseline awareness to instantly identify new textures, thickening, or skin dimpling."
  },
  {
    id: "ultrasound",
    name: "Targeted Breast Ultrasound",
    code: "USG",
    purpose: "High-frequency sound wave mapping used to differentiate between fluid-filled cysts and solid masses.",
    targetArea: "Supplementary ultrasonic soft-tissue imaging",
    clinicalSignificance: "Essential secondary diagnostic for dense breast tissue where standard mammograms have reduced sensitivity."
  },
  {
    id: "mri",
    name: "Contrast-Enhanced Breast MRI",
    code: "MRI",
    purpose: "High-resolution magnetic field imaging with intravenous contrast to screen dense or high-risk tissues.",
    targetArea: "Tertiary vascularized soft-tissue scans",
    clinicalSignificance: "Highly sensitive scan. Indicated for women with extreme high risk (>20% lifetime risk) or verified genetic mutations."
  },
  {
    id: "brca",
    name: "BRCA1 & BRCA2 Genetic Screening",
    code: "BRCA",
    purpose: "Gene sequencing analysis (blood or saliva) to detect inherited high-risk oncological mutations.",
    targetArea: "Oncogenetic DNA sequencing panels",
    clinicalSignificance: "One-time test. Identifies elevated hereditary risk (up to 70-80% lifetime risk of developing breast cancer), guiding surgical/preventive roadmaps."
  }
];

type AgeGuideline = {
  ageGroup: string;
  recommendations: {
    testId: string;
    frequency: string;
    description: string;
    badgeTone: "primary" | "secondary" | "tertiary" | "outline";
  }[];
  generalAdvice: string;
};

const ageGuidelines: AgeGuideline[] = [
  {
    ageGroup: "Ages 20 - 29",
    generalAdvice: "Focus primarily on baseline awareness, self-examination, and maintaining lifestyle health. Clinical screens are indicated only for symptomatic triggers or inherited family histories.",
    recommendations: [
      {
        testId: "bse",
        frequency: "Monthly",
        description: "Routine at-home self-examination to identify personal baseline and anomalies.",
        badgeTone: "primary"
      },
      {
        testId: "cbe",
        frequency: "Every 1 - 3 Years",
        description: "Recommended in-office physical check-up by a gynecologist during general wellness audits.",
        badgeTone: "outline"
      },
      {
        testId: "brca",
        frequency: "If High Risk (One-time)",
        description: "Indicated only if multiple direct relatives (mother/sister) have early-onset cancer history.",
        badgeTone: "tertiary"
      }
    ]
  },
  {
    ageGroup: "Ages 30 - 39",
    generalAdvice: "Increased physiological changes. Clinical palpations should be done more consistently. Genetic counseling is highly recommended for strong familial lineages.",
    recommendations: [
      {
        testId: "bse",
        frequency: "Monthly",
        description: "Consistent self-palpation done monthly at the same cycle timeline.",
        badgeTone: "primary"
      },
      {
        testId: "cbe",
        frequency: "Every 1 - 3 Years",
        description: "Physical clinical exams should be integrated during regular health checks.",
        badgeTone: "outline"
      },
      {
        testId: "ultrasound",
        frequency: "Symptomatic / As Directed",
        description: "Recommended if solid nodules are detected or if dense breast profiles require supplemental audits.",
        badgeTone: "secondary"
      },
      {
        testId: "mri",
        frequency: "Annually (High-Risk Only)",
        description: "Indicated annually for verified BRCA mutation carriers or women with extreme hereditary risk.",
        badgeTone: "tertiary"
      }
    ]
  },
  {
    ageGroup: "Ages 40 - 49",
    generalAdvice: "The critical window where clinical screening should begin. Engage in shared decision-making with your doctor regarding annual digital mammography benefits.",
    recommendations: [
      {
        testId: "mammogram",
        frequency: "Every 1 - 2 Years",
        description: "Begin screening mammograms based on individual risk profile and medical consultation.",
        badgeTone: "secondary"
      },
      {
        testId: "cbe",
        frequency: "Annually",
        description: "Required annual clinical screening exam by an oncologist or senior physician.",
        badgeTone: "primary"
      },
      {
        testId: "bse",
        frequency: "Monthly",
        description: "Continue monthly self-examination checks regularly.",
        badgeTone: "outline"
      }
    ]
  },
  {
    ageGroup: "Ages 50 - 74",
    generalAdvice: "Peak screening years. Mammograms should be conducted regularly to achieve maximum preventative benefit and prompt tumor identification.",
    recommendations: [
      {
        testId: "mammogram",
        frequency: "Annually / Every 2 Years",
        description: "Core preventive mammography is strongly indicated to reduce long-term oncological mortality.",
        badgeTone: "primary"
      },
      {
        testId: "cbe",
        frequency: "Annually",
        description: "Compulsory annual in-office physical check by your clinical specialist.",
        badgeTone: "secondary"
      },
      {
        testId: "bse",
        frequency: "Monthly",
        description: "Maintain monthly body awareness and self-palpations.",
        badgeTone: "outline"
      }
    ]
  },
  {
    ageGroup: "Ages 75+ / High Risk",
    generalAdvice: "Focused care management. Continue mammograms as long as overall health is robust and life expectancy remains high. Focus on prompt evaluation of physical changes.",
    recommendations: [
      {
        testId: "mammogram",
        frequency: "As Advised by Specialist",
        description: "Custom screening intervals determined by medical specialists based on global wellness indexes.",
        badgeTone: "outline"
      },
      {
        testId: "mri",
        frequency: "Annually / Symtomatic",
        description: "Indicated for active surveillance and high-resolution tissue checking.",
        badgeTone: "secondary"
      },
      {
        testId: "bse",
        frequency: "Monthly",
        description: "Maintain close personal checks and self-examinations.",
        badgeTone: "primary"
      }
    ]
  }
];

type AreaTier = "tier1" | "tier2" | "tier3";

type CostDetails = {
  name: string;
  mammogram: string;
  cbe: string;
  bse: string;
  ultrasound: string;
  mri: string;
  brca: string;
  cities: string[];
  description: string;
};

const cityToTierMap: Record<string, AreaTier> = {
  mumbai: "tier1",
  delhi: "tier1",
  "new delhi": "tier1",
  ncr: "tier1",
  gurugram: "tier1",
  gurgaon: "tier1",
  noida: "tier1",
  "greater noida": "tier1",
  ghaziabad: "tier1",
  faridabad: "tier1",
  bangalore: "tier1",
  bengaluru: "tier1",
  chennai: "tier1",
  kolkata: "tier1",
  hyderabad: "tier1",
  ahmedabad: "tier1",
  pune: "tier2",
  jaipur: "tier2",
  lucknow: "tier2",
  kochi: "tier2",
  cochin: "tier2",
  indore: "tier2",
  nagpur: "tier2",
  patna: "tier2",
  bhopal: "tier2",
  ludhiana: "tier2",
  vadodara: "tier2",
  baroda: "tier2",
  agra: "tier2",
  visakhapatnam: "tier2",
  vizag: "tier2",
  surat: "tier2",
  coimbatore: "tier2",
  chandigarh: "tier2",
  guwahati: "tier2",
  nashik: "tier2",
  rajkot: "tier2",
  kanpur: "tier2",
  meerut: "tier2",
  varanasi: "tier2",
  srinagar: "tier2",
  aurangabad: "tier2",
  dhanbad: "tier2",
  amritsar: "tier2",
  allahabad: "tier2",
  prayagraj: "tier2",
  howrah: "tier2",
  gwalior: "tier2",
  jabalpur: "tier2",
  vijayawada: "tier2",
  madurai: "tier2",
  raipur: "tier2",
  kota: "tier2",
  solapur: "tier2",
  hubli: "tier2",
  dharwad: "tier2",
  bareilly: "tier2",
  moradabad: "tier2",
  mysore: "tier2",
  mysuru: "tier2",
  thiruvananthapuram: "tier2",
  trivandrum: "tier2",
  salem: "tier2",
  tiruchirappalli: "tier2",
  trichy: "tier2",
  jodhpur: "tier2",
  bhubaneswar: "tier2",
  jalandhar: "tier2",
  warangal: "tier2",
  tirupati: "tier2",
  dehradun: "tier2",
  ranchi: "tier2",
  mangalore: "tier2",
  mangaluru: "tier2",
  belgaum: "tier2",
  belagavi: "tier2",
  udaipur: "tier2",
  guntur: "tier2"
};

const matchCityToTier = (search: string): { tier: AreaTier; name: string; isMatched: boolean } | null => {
  if (!search.trim()) return null;
  const cleanSearch = search.trim().toLowerCase();
  if (cityToTierMap[cleanSearch]) {
    const matchedKey = Object.keys(cityToTierMap).find(k => k === cleanSearch) || cleanSearch;
    const formattedName = matchedKey.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    return {
      tier: cityToTierMap[cleanSearch],
      name: formattedName,
      isMatched: true
    };
  }
  const keyMatch = Object.keys(cityToTierMap).find(
    k => k.startsWith(cleanSearch) || cleanSearch.startsWith(k)
  );
  if (keyMatch) {
    const formattedName = keyMatch.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    return {
      tier: cityToTierMap[keyMatch],
      name: formattedName,
      isMatched: true
    };
  }
  return {
    tier: "tier3",
    name: search,
    isMatched: false
  };
};

const areaCostMultiplier: Record<AreaTier, CostDetails> = {
  tier1: {
    name: "Metro / Tier 1 (Mumbai, Delhi, Bangalore, Chennai, etc.)",
    mammogram: "₹2,200 – ₹3,800",
    cbe: "₹500 – ₹800",
    bse: "₹0 (Free / At-home)",
    ultrasound: "₹1,200 – ₹2,200",
    mri: "₹8,000 – ₹14,000",
    brca: "₹15,000 – ₹25,000",
    cities: ["Mumbai", "Delhi NCR", "Bengaluru", "Chennai", "Kolkata", "Hyderabad", "Ahmedabad"],
    description: "Major metropolitan cities with population above 4 million. High concentration of state-of-the-art super-specialty hospitals and oncology labs."
  },
  tier2: {
    name: "Tier 2 Cities (Pune, Jaipur, Lucknow, Kochi, Indore, etc.)",
    mammogram: "₹1,500 – ₹2,500",
    cbe: "₹300 – ₹500",
    bse: "₹0 (Free / At-home)",
    ultrasound: "₹800 – ₹1,400",
    mri: "₹5,500 – ₹9,000",
    brca: "₹12,000 – ₹18,000",
    cities: ["Pune", "Jaipur", "Lucknow", "Kochi", "Indore", "Nagpur", "Patna", "Bhopal", "Ludhiana", "Vadodara", "Agra", "Visakhapatnam", "Surat", "Coimbatore", "Chandigarh", "Guwahati", "Nashik", "Rajkot", "Varanasi", "Srinagar", "Amritsar", "Dehradun", "Thiruvananthapuram", "Bhubaneswar", "Ranchi", "Raipur", "Jodhpur"],
    description: "Rapidly growing urban centers and state capitals with population between 1 million and 4 million. Excellent multi-specialty regional hospital chains available."
  },
  tier3: {
    name: "Tier 3 Cities / Rural Areas (Districts & Community Health)",
    mammogram: "₹800 – ₹1,400",
    cbe: "₹150 – ₹300",
    bse: "₹0 (Free / At-home)",
    ultrasound: "₹500 – ₹900",
    mri: "₹3,500 – ₹6,000",
    brca: "₹8,000 – ₹12,000",
    cities: ["District Headquarters", "Municipal Towns", "Taluka Centers", "Community Health Blocks", "Rural Villages"],
    description: "Towns and rural areas with population below 1 million. Screenings are often subsidized at government district hospitals, taluka centers, and NGO camps."
  }
};

const matchedSchemes = [
  {
    title: "Ayushman Bharat PM-JAY (Breast Cancer Screening Pack)",
    coverage: "Up to ₹5,00,000 per family per year",
    details: "Covers deep diagnostic procedures, specialized surgical mastectomy packages, tissue biopsy, chemotherapy protocols, and medical follow-up check-ups in empanelled hospitals.",
    eligibility: "SECC database listings, low-income families, and specific rural category wellness card holders.",
    icon: "account_balance"
  },
  {
    title: "Rashtriya Arogya Nidhi (RAN) Cancer Treatment Fund",
    coverage: "One-time financial grant up to ₹15,00,000",
    details: "Provides urgent financial assistance for critical cancer screenings, biopsies, scans, and tertiary treatments in super-specialty central government hospitals.",
    eligibility: "Patients living below the poverty line (BPL) receiving treatment in premier public healthcare institutes.",
    icon: "health_and_safety"
  },
  {
    title: "National Programme for Prevention of Cancer, Diabetes, Cardiovascular Diseases and Stroke (NPCDCS)",
    coverage: "Free diagnostics & screenings in primary centers",
    details: "Powers decentralized clinical screening camps. Offers free CBE and mammography guidance checks across rural community health centers and district-level wellness clinics.",
    eligibility: "Universal Indian citizens, prioritizing women aged 30-65 years.",
    icon: "volunteer_activism"
  }
];

export default function PreventivePlans() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("Ages 40 - 49");
  const [selectedArea, setSelectedArea] = useState<AreaTier>("tier1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [citySearchQuery, setCitySearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"guidelines" | "costs" | "schemes" | "insurers">("guidelines");

  const activeGuideline = ageGuidelines.find(g => g.ageGroup === selectedAgeGroup) || ageGuidelines[2];
  const activeCostMap = areaCostMultiplier[selectedArea];

  const filteredInsurers = generalInsurers.filter(insurer =>
    insurer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insurer.primaryPolicy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insurer.hq.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell bare>
      {/* Fixed Local Sidebar - Styled exactly like the global SideNav of Start Your Journey */}
      <aside className="hidden md:flex flex-col h-[calc(100vh-64px)] py-lg w-64 fixed left-0 top-16 bg-surface-container-low shadow-md z-40 overflow-y-auto custom-scrollbar">
        <div className="px-md mb-lg">
          <h2 className="font-headline-sm text-headline-sm text-[#B83B5E] font-bold">Preventive Care</h2>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Breast Cancer Awareness</p>
        </div>
        <nav className="flex-1 space-y-1">
          {[
            { id: "guidelines", label: "Screening Guidelines", icon: "timeline" },
            { id: "costs", label: "Cost Estimator", icon: "payments" },
            { id: "schemes", label: "Government Schemes", icon: "account_balance" },
            { id: "insurers", label: "General Insurances", icon: "security" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as "guidelines" | "costs" | "schemes" | "insurers")}
              className={`w-full flex items-center gap-sm px-4 py-3 font-label-md text-label-md transition-transform duration-150 text-left focus-visible:ring-2 focus-visible:ring-[#B83B5E] outline-none ${
                activeTab === item.id
                  ? "text-[#B83B5E] font-bold border-r-4 border-[#B83B5E] bg-[#F9CBDB]/10"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area - Shifted left on desktop to accommodate the sidebar, matching all pages */}
      <div className="max-w-container-max mx-auto p-md lg:p-lg space-y-lg md:ml-64">
        
        {/* Header Block - Rose/Pink Gradient Theme */}
        <header className="bg-gradient-to-r from-[#F9CBDB]/30 via-[#F9CBDB]/10 to-surface-container-low border border-[#F9CBDB]/40 rounded-3xl p-md md:p-lg flex flex-col md:flex-row justify-between items-center gap-md shadow-sm relative overflow-hidden shrink-0">
          <div className="absolute inset-0 -z-10 bg-radial-gradient from-[#F9CBDB]/15 to-transparent opacity-40 blur-2xl" />
          <div className="max-w-2xl space-y-xs">
            <span className="inline-flex items-center gap-xs px-2.5 py-1 bg-[#F9CBDB]/20 text-[#B83B5E] border border-[#F9CBDB]/40 text-[10px] font-bold rounded-full uppercase tracking-wider">
              <span className="material-symbols-outlined text-[12px] active-entity-pulse">health_and_safety</span>
              Breast Cancer Prevention
            </span>
            <h1 className="font-headline-lg text-[28px] md:text-headline-lg text-primary font-bold tracking-tight">
              Breast Cancer Preventive Care & Screenings
            </h1>
            <p className="font-body-md text-on-surface-variant leading-relaxed text-sm">
              Early detection remains the single most powerful defense. Explore recommended clinical guidelines, dynamic tier-based screening costs, government cancer funds, and empanelled private insurers in India.
            </p>
          </div>
          <div className="bg-surface-bright border border-outline-variant rounded-2xl p-sm shadow-sm shrink-0 flex items-center gap-sm">
            <div className="w-10 h-10 rounded-full bg-[#F9CBDB]/20 text-[#B83B5E] flex items-center justify-center border border-[#F9CBDB]/30">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <div>
              <p className="font-label-sm text-outline">Clinical Reference</p>
              <p className="font-bold text-secondary text-xs">WHO & NPCDCS Compliant</p>
            </div>
          </div>
        </header>

        {/* Mobile Horizontal Tabs - Swipeable/Scrollable */}
        <div className="flex flex-row overflow-x-auto gap-xs pb-sm md:hidden shrink-0 border-b border-outline-variant/30 scrollbar-none">
          {[
            { id: "guidelines", label: "Guidelines", icon: "timeline" },
            { id: "costs", label: "Costs", icon: "payments" },
            { id: "schemes", label: "Schemes", icon: "account_balance" },
            { id: "insurers", label: "Insurances", icon: "security" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "guidelines" | "costs" | "schemes" | "insurers")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-xs focus-visible:ring-2 focus-visible:ring-[#B83B5E] ${
                activeTab === tab.id
                  ? "bg-[#F9CBDB]/30 text-[#B83B5E] border border-[#F9CBDB]/50"
                  : "bg-surface-container border border-outline-variant/40 text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right Active section view */}
        <main className="w-full flex flex-col gap-md">

            {/* TAB 1: SCREENING GUIDELINES */}
            {activeTab === "guidelines" && (
              <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/60 p-md md:p-lg flex flex-col justify-between shadow-sm space-y-md animate-fade-in" aria-label="Screening Frequencies by Age">
                <div>
                  <div className="border-b border-outline-variant/40 pb-sm mb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
                    <h2 className="font-headline-sm text-headline-sm text-primary flex items-center gap-xs">
                      <span className="material-symbols-outlined text-primary text-[22px]">timeline</span>
                      Screening Frequency Planner
                    </h2>
                    <p className="text-xs text-outline font-semibold">Select your age bracket to view recommendations:</p>
                  </div>

                  {/* Age Tabs */}
                  <div className="flex flex-wrap gap-xs mb-lg">
                    {ageGuidelines.map(g => (
                      <button
                        key={g.ageGroup}
                        onClick={() => setSelectedAgeGroup(g.ageGroup)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#B83B5E] ${
                          selectedAgeGroup === g.ageGroup
                            ? "bg-[#B83B5E] text-white shadow-md"
                            : "bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:border-[#F9CBDB]"
                        }`}
                      >
                        {g.ageGroup}
                      </button>
                    ))}
                  </div>

                  {/* Age Summary & Advice */}
                  <div className="bg-[#F9CBDB]/10 border border-[#F9CBDB]/30 rounded-2xl p-md mb-md animate-fade-in">
                    <h4 className="font-label-md text-[#B83B5E] font-bold flex items-center gap-xs text-xs">
                      <span className="material-symbols-outlined text-sm">lightbulb</span>
                      Clinical Overview for {selectedAgeGroup}
                    </h4>
                    <p className="text-body-sm text-on-surface-variant mt-xs leading-relaxed text-xs">
                      {activeGuideline.generalAdvice}
                    </p>
                  </div>

                  {/* Guidelines List */}
                  <div className="space-y-sm">
                    {activeGuideline.recommendations.map((rec) => {
                      const testDetail = screeningTests.find(t => t.id === rec.testId);
                      if (!testDetail) return null;

                      const toneClass = {
                        primary: "bg-[#B83B5E]/10 text-[#B83B5E] border border-[#B83B5E]/20",
                        secondary: "bg-secondary/10 text-secondary border border-secondary/20",
                        tertiary: "bg-tertiary/10 text-tertiary border border-tertiary/20",
                        outline: "bg-surface-container-high text-on-surface-variant border border-outline-variant"
                      }[rec.badgeTone];

                      return (
                        <div 
                          key={rec.testId}
                          className="p-md bg-surface-container-low border border-outline-variant/50 rounded-2xl flex flex-col sm:flex-row justify-between items-start gap-md hover:border-[#F9CBDB]/80 transition-all shadow-sm animate-fade-in"
                        >
                          <div className="space-y-xs max-w-xl">
                            <div className="flex items-center gap-xs flex-wrap">
                              <h4 className="font-headline-sm text-[16px] text-on-surface font-bold">
                                {testDetail.name}
                              </h4>
                              <span className="px-2 py-0.5 bg-outline-variant text-[10px] font-bold rounded uppercase">
                                Code: {testDetail.code}
                              </span>
                            </div>
                            <p className="text-body-sm text-on-surface-variant leading-relaxed text-xs">
                              {rec.description}
                            </p>
                            <p className="text-[10px] text-outline italic">
                              <strong>Vascular Significance:</strong> {testDetail.clinicalSignificance}
                            </p>
                            {testDetail.bseInstruction && (
                              <div className="mt-sm bg-surface-bright border border-outline-variant/30 rounded-xl p-sm text-[11px] text-on-surface-variant leading-relaxed">
                                <strong>Self-Check Guide:</strong> {testDetail.bseInstruction}
                              </div>
                            )}
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 ${toneClass}`}>
                            {rec.frequency}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="pt-md border-t border-outline-variant/30 flex justify-between items-center shrink-0">
                  <span className="text-[11px] font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#B83B5E] animate-pulse" />
                    Updated with WHO Oncology Screen 2026 Standards
                  </span>
                </div>
              </section>
            )}

            {/* TAB 2: SCREENING COST ESTIMATOR */}
            {activeTab === "costs" && (
              <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/60 p-md md:p-lg flex flex-col justify-between shadow-sm space-y-md animate-fade-in" aria-label="Dynamic Diagnostic Cost Estimator">
                <div className="space-y-md">
                  
                  {/* Header */}
                  <div className="border-b border-outline-variant/40 pb-sm">
                    <h2 className="font-headline-sm text-headline-sm text-primary flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[#B83B5E] text-[24px]">payments</span>
                      Screening Cost Estimator
                    </h2>
                    <p className="text-body-sm text-on-surface-variant mt-1 text-xs font-normal">
                      Geographical-based pricing maps for oncology tests. Select your tier or search for your city.
                    </p>
                  </div>

                  {/* Top Control Panel: Search & Segmented Selector */}
                  <div className="bg-surface-container-low border border-outline-variant/50 rounded-2xl p-md flex flex-col md:flex-row md:items-center justify-between gap-md shadow-sm">
                    {/* City Search */}
                    <div className="flex-1 space-y-xs">
                      <label htmlFor="city-finder" className="block text-[10px] font-bold text-outline uppercase tracking-wider pl-1">
                        Find Your City's Tier & Price
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">location_city</span>
                        <input
                          id="city-finder"
                          type="text"
                          value={citySearchQuery}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCitySearchQuery(val);
                            const match = matchCityToTier(val);
                            if (match) {
                              setSelectedArea(match.tier);
                            }
                          }}
                          className="w-full p-2.5 pl-10 rounded-xl border border-outline-variant bg-surface-bright font-body-sm text-on-surface outline-none focus:ring-2 focus:ring-[#B83B5E] focus:border-[#B83B5E] text-xs transition-all placeholder-outline/50"
                          placeholder="Search city (e.g. Pune, Patna, Bangalore...)"
                        />
                      </div>
                      {citySearchQuery.trim() && (() => {
                        const match = matchCityToTier(citySearchQuery);
                        if (match) {
                          if (match.isMatched) {
                            return (
                              <p className="text-[11px] font-bold text-[#B83B5E] flex items-center gap-1 mt-1">
                                <span className="material-symbols-outlined text-[13px]">verified</span>
                                "{match.name}" matched as {match.tier === "tier1" ? "Metro / Tier 1" : "Tier 2"}
                              </p>
                            );
                          } else {
                            return (
                              <p className="text-[11px] text-outline flex items-center gap-1 mt-1 italic font-medium">
                                <span className="material-symbols-outlined text-[13px]">info</span>
                                "{match.name}" not in list. Showing Tier 3 / Rural rates
                              </p>
                            );
                          }
                        }
                        return null;
                      })()}
                    </div>

                    {/* Segmented Tier Selector */}
                    <div className="space-y-xs shrink-0">
                      <span className="block text-[10px] font-bold text-outline uppercase tracking-wider pl-1">
                        Select Pricing Tier
                      </span>
                      <div className="inline-flex bg-surface-container-high p-1 rounded-xl border border-outline-variant/60">
                        {[
                          { key: "tier1", label: "Tier 1 (Metro)" },
                          { key: "tier2", label: "Tier 2" },
                          { key: "tier3", label: "Tier 3 (Rural)" }
                        ].map((tier) => (
                          <button
                            key={tier.key}
                            onClick={() => {
                              setSelectedArea(tier.key as AreaTier);
                              setCitySearchQuery(""); // Clear search to avoid confusion
                            }}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                              selectedArea === tier.key
                                ? "bg-[#B83B5E] text-white shadow-sm"
                                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                            }`}
                          >
                            {tier.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main Grid Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-md items-stretch">
                    
                    {/* Left Column: Pricing Sheet */}
                    <div className="lg:col-span-7 flex flex-col">
                      <div className="flex-1 space-y-sm bg-surface-container-low p-md md:p-lg rounded-2xl border border-[#F9CBDB]/20 shadow-sm relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#F9CBDB]/15 rounded-full blur-xl pointer-events-none" />
                        
                        <div>
                          <div className="flex justify-between items-center pb-sm border-b border-outline-variant/30 mb-sm">
                            <div>
                              <p className="text-[10px] uppercase font-bold text-outline tracking-wider">
                                Diagnostic Pricing Sheet
                              </p>
                              <h3 className="font-bold text-primary text-sm mt-0.5">
                                {selectedArea === "tier1" ? "Metro / Tier 1 Standard Rates" : selectedArea === "tier2" ? "Tier 2 Urban Rates" : "Tier 3 / Rural Subsidy Rates"}
                              </h3>
                            </div>
                            <span className="text-[10px] font-bold text-[#B83B5E] uppercase bg-[#F9CBDB]/30 px-2.5 py-0.5 rounded-full border border-[#F9CBDB]/40">
                              {selectedArea === "tier1" ? "Metro Rates" : selectedArea === "tier2" ? "Tier 2" : "Rural"}
                            </span>
                          </div>

                          <div className="divide-y divide-outline-variant/20">
                            {screeningTests.map((test) => {
                              const testPrice = activeCostMap[test.id as keyof typeof activeCostMap] || "₹0";
                              return (
                                <div key={test.id} className="flex justify-between items-center py-2.5 first:pt-1 last:pb-1 hover:bg-[#F9CBDB]/5 transition-colors px-1 rounded-lg">
                                  <div className="max-w-[70%]">
                                    <p className="font-label-md text-on-surface font-bold text-xs leading-none">{test.name}</p>
                                    <p className="text-[10px] text-on-surface-variant leading-none mt-1.5">{test.purpose.split(".")[0]}.</p>
                                  </div>
                                  <span className={`font-bold text-sm shrink-0 ${testPrice.includes("Free") ? "text-secondary font-extrabold" : "text-[#B83B5E]"}`}>
                                    {testPrice}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="pt-sm border-t border-outline-variant/30 text-[10px] text-outline flex items-center justify-between">
                          <span>Estimates derived from average diagnostic indexes.</span>
                          <span className="font-bold text-[#B83B5E] uppercase tracking-wider">INR (₹) Rates</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Reference Info & Comparison */}
                    <div className="lg:col-span-5 space-y-md flex flex-col justify-between">
                      
                      {/* Included Cities */}
                      <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-md flex-1 flex flex-col justify-between">
                        <div className="space-y-sm">
                          <div>
                            <h4 className="font-label-md text-primary font-bold flex items-center gap-xs text-xs">
                              <span className="material-symbols-outlined text-[#B83B5E] text-[18px]">map</span>
                              Cities in this Tier Range
                            </h4>
                            <p className="text-[11px] text-on-surface-variant mt-1 leading-relaxed">
                              {activeCostMap.description}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-xs pt-1 max-h-40 overflow-y-auto custom-scrollbar">
                            {activeCostMap.cities.map((city) => {
                              const isMatched = citySearchQuery.trim() && city.toLowerCase().includes(citySearchQuery.trim().toLowerCase());
                              return (
                                <span 
                                  key={city} 
                                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                                    isMatched
                                      ? "bg-[#B83B5E] text-white border-[#B83B5E] scale-105 shadow-sm"
                                      : "bg-surface-bright text-on-surface border-outline-variant/60"
                                  }`}
                                >
                                  {city}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {selectedArea !== "tier3" && (
                          <div className="mt-md bg-[#F9CBDB]/10 border border-[#F9CBDB]/30 rounded-xl p-xs flex items-center gap-sm">
                            <span className="material-symbols-outlined text-[#B83B5E] text-lg pl-1">volunteer_activism</span>
                            <p className="text-[10px] text-on-surface-variant leading-tight">
                              Traveling to Tier 3 centers can reduce screening scan costs by up to 60%.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Cost Comparison Meter */}
                      <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-md space-y-sm">
                        <h4 className="text-xs font-bold text-on-surface flex items-center gap-xs">
                          <span className="material-symbols-outlined text-[16px] text-outline">analytics</span>
                          National Cost Scaling
                        </h4>
                        
                        <div className="space-y-xs">
                          {/* Meter items */}
                          {[
                            { label: "Tier 1 (Metro)", scale: "100%", style: "w-full bg-[#B83B5E]" },
                            { label: "Tier 2 Cities", scale: "70%", style: "w-[70%] bg-[#B83B5E]/70" },
                            { label: "Tier 3 / Rural", scale: "40%", style: "w-[40%] bg-secondary" }
                          ].map((item) => (
                            <div key={item.label} className="space-y-[2px]">
                              <div className="flex justify-between text-[9px] text-on-surface-variant font-bold">
                                <span>{item.label}</span>
                                <span>{item.scale === "100%" ? "Baseline (100%)" : `~${100 - parseInt(item.scale)}% Avg Savings`}</span>
                              </div>
                              <div className="w-full bg-surface-container-highest rounded-full h-1 overflow-hidden">
                                <div className={`h-1 rounded-full ${item.style}`} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

                <div className="pt-md border-t border-outline-variant/30 text-[10px] text-outline leading-relaxed italic">
                  *Estimates are calculated based on national averages across leading radiology centers. Real prices may vary.
                </div>
              </section>
            )}

            {/* TAB 3: GOVERNMENT AID SCHEMES */}
            {activeTab === "schemes" && (
              <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/60 p-md md:p-lg shadow-sm space-y-md animate-fade-in" aria-label="Matched Government Financial Aid Programs">
                <div className="border-b border-outline-variant/40 pb-sm">
                  <h2 className="font-headline-sm text-headline-sm text-primary flex items-center gap-xs">
                    <span className="material-symbols-outlined text-primary text-[22px]">account_balance</span>
                    Matched Government Schemes & Subsidies
                  </h2>
                  <p className="text-body-sm text-on-surface-variant mt-1 text-sm">
                    Public financial-aid programs matched to fund or fully subsidize oncology diagnostic screens and clinical evaluations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                  {matchedSchemes.map((scheme) => (
                    <div 
                      key={scheme.title}
                      className="p-md bg-surface-container-low border border-outline-variant/50 rounded-2xl hover:border-[#F9CBDB]/50 transition-all flex flex-col justify-between gap-sm shadow-sm"
                    >
                      <div className="space-y-sm">
                        <div className="flex items-center gap-xs text-[#B83B5E] font-bold">
                          <span className="material-symbols-outlined text-[20px]">{scheme.icon}</span>
                          <h4 className="font-headline-sm text-[15px] font-bold leading-tight">{scheme.title}</h4>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-[#B83B5E] uppercase bg-[#F9CBDB]/35 px-2 py-0.5 rounded-full tracking-wider border border-[#F9CBDB]">
                            {scheme.coverage}
                          </span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant text-xs leading-relaxed">
                          {scheme.details}
                        </p>
                      </div>
                      <div className="pt-sm border-t border-outline-variant/30 text-[11px] text-on-surface-variant font-medium">
                        <strong>Eligibility:</strong> {scheme.eligibility}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TAB 4: GENERAL INSURANCES */}
            {activeTab === "insurers" && (
              <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/60 p-md md:p-lg shadow-sm space-y-md animate-fade-in" aria-label="Private General Insurers Catalogue">
                <div className="border-b border-outline-variant/40 pb-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-sm">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-primary flex items-center gap-xs">
                      <span className="material-symbols-outlined text-primary text-[22px]">security</span>
                      Empanelled General Insurers & Cancer riders
                    </h2>
                    <p className="text-body-sm text-on-surface-variant mt-1 text-sm">
                      Integrate cashless critical illness riders and pre-authorization screening packages from leading general insurance organizations.
                    </p>
                  </div>
                  
                  {/* Search filter input */}
                  <div className="relative w-full md:w-80">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-outline text-[18px]">search</span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full p-2.5 pl-10 rounded-xl border border-outline-variant bg-surface-container-low font-body-sm text-on-surface outline-none focus:ring-2 focus:ring-[#B83B5E] focus:border-[#B83B5E] text-xs"
                      placeholder="Search insurers, policies..."
                    />
                  </div>
                </div>

                {/* Insurers list grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
                  {filteredInsurers.length > 0 ? (
                    filteredInsurers.map((insurer) => (
                      <div 
                        key={insurer.name}
                        className="p-md bg-surface-container-low border border-outline-variant/60 rounded-2xl shadow-sm hover:border-[#F9CBDB] transition-all flex flex-col justify-between group"
                      >
                        <div className="space-y-sm">
                          {/* Header: Name, sector, reliability */}
                          <div className="flex justify-between items-start gap-xs">
                            <div>
                              <h4 className="font-headline-sm text-[15px] text-primary group-hover:text-primary-hover transition-colors font-bold leading-snug">
                                {insurer.name}
                              </h4>
                              <p className="text-[9px] text-outline uppercase font-bold tracking-wider mt-0.5">
                                {insurer.sector} • Reg No. {insurer.regNumber}
                              </p>
                            </div>
                            <span className="px-2 py-0.5 bg-[#F9CBDB]/20 text-[#B83B5E] border border-[#F9CBDB]/30 text-[9px] font-bold rounded-full whitespace-nowrap shrink-0">
                              {insurer.reliability}% Reliability
                            </span>
                          </div>

                          {/* Policy panel */}
                          <div className="bg-[#F9CBDB]/10 p-xs rounded-xl border border-[#F9CBDB]/30">
                            <div className="flex items-center gap-xs text-[#B83B5E] font-bold text-xs p-1">
                              <span className="material-symbols-outlined text-sm">shield</span>
                              <span className="truncate">{insurer.primaryPolicy}</span>
                            </div>
                            <ul className="text-body-sm text-on-surface-variant space-y-1 pl-4 list-disc text-[11px] leading-relaxed p-1 pb-2">
                              {insurer.policyFeatures.slice(0, 2).map((feat, idx) => (
                                <li key={idx} className="line-clamp-2">{feat}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Network details */}
                          <div className="grid grid-cols-2 gap-sm text-[10px] text-on-surface-variant font-medium pt-xs">
                            <div className="flex items-center gap-xs">
                              <span className="material-symbols-outlined text-outline text-sm">location_on</span>
                              <span className="truncate">HQ: {insurer.hq}</span>
                            </div>
                            <div className="flex items-center gap-xs">
                              <span className="material-symbols-outlined text-outline text-sm">local_hospital</span>
                              <span>{insurer.networkHospitals}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions bar */}
                        <div className="flex items-center justify-between pt-sm border-t border-outline-variant/30 gap-sm mt-sm">
                          <a
                            href={insurer.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-[#B83B5E] hover:text-[#A12E50] font-bold flex items-center gap-[2px]"
                          >
                            Visit Website
                            <span className="material-symbols-outlined text-[11px]">open_in_new</span>
                          </a>
                          
                          <div className="flex items-center gap-xs">
                            {insurer.contactPhone && (
                              <a
                                href={`tel:${insurer.contactPhone}`}
                                className="w-7 h-7 rounded-lg bg-surface-container-highest hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors border border-outline-variant/40"
                                title={`Call CMD Office: ${insurer.contactPhone}`}
                              >
                                <span className="material-symbols-outlined text-sm">phone</span>
                              </a>
                            )}
                            {insurer.contactEmail && (
                              <a
                                href={`mailto:${insurer.contactEmail}`}
                                className="w-7 h-7 rounded-lg bg-surface-container-highest hover:bg-surface-container flex items-center justify-center text-[#B83B5E] transition-colors border border-[#F9CBDB]/40"
                                title={`Email CMD Office: ${insurer.contactEmail}`}
                              >
                                <span className="material-symbols-outlined text-sm">mail</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-xl border border-dashed border-outline-variant/60 rounded-2xl bg-surface-container-low text-outline text-xs">
                      No general insurers matched your query. Try searching with a different term.
                    </div>
                  )}
                </div>
              </section>
            )}

          </main>
      </div>
    </AppShell>
  );
}
