import { useState, useMemo, useEffect } from "react";
import AppShell from "../components/AppShell";

type SchemeLink = {
  label: string;
  url: string;
  type: "official" | "hospitals" | "eligibility" | "guide" | "other";
};

type Scheme = {
  title: string;
  category: "General" | "Breast Cancer Specific" | "State Specific";
  state: string; // Domicile state
  tag: string;
  tagTone: "tertiary-container" | "surface-variant";
  icon: string;
  body: string;
  bullets: string[];
  reliability: number;
  links: SchemeLink[];
  description: string;
  requiredDocuments: string[];
};

const schemes: Scheme[] = [
  {
    title: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    category: "General",
    state: "All India",
    tag: "Central Govt",
    tagTone: "tertiary-container",
    icon: "local_hospital",
    body: "Covers hospitalization up to ₹5 lakh/family/year including breast cancer surgery, chemotherapy, radiation & oncology procedures at empanelled hospitals.",
    bullets: [
      "₹5 Lakh cashless coverage per family per year",
      "Covers breast cancer chemo, radiation & oncology",
      "Valid at all empanelled public and private hospitals"
    ],
    reliability: 95,
    description: "Ayushman Bharat PM-JAY is the world's largest health assurance scheme, fully funded by the Government of India. It provides cashless and paperless access to services for the beneficiary at the point of service in any empanelled hospital across the country.",
    links: [
      { label: "PM-JAY Official Portal", url: "https://hem.nha.gov.in/search", type: "official" },
      { label: "Find Empanelled Hospitals", url: "https://hem.nha.gov.in/search", type: "hospitals" },
      { label: "Check Eligibility", url: "https://beneficiary.nha.gov.in/", type: "eligibility" },
      { label: "How to Use Video Guide", url: "https://www.youtube.com/playlist?list=PLYcj0BpCoCc7CBFxCMJo2Ms2iKypz5kAw", type: "guide" }
    ],
    requiredDocuments: [
      "Aadhaar Card or PAN Card (Identity proof)",
      "PM-JAY Golden Card or Family HHID Number",
      "Ration Card showing family listing",
      "Domicile Certificate"
    ]
  },
  {
    title: "Rashtriya Arogya Nidhi (RAN)",
    category: "General",
    state: "All India",
    tag: "Central Govt",
    tagTone: "tertiary-container",
    icon: "payments",
    body: "Financial assistance for poor patients with life-threatening diseases including cancer; support can go up to ₹15 lakh in eligible cases. (myScheme)",
    bullets: [
      "One-time financial aid up to ₹15 Lakh for critical illnesses",
      "Targeted exclusively for Below Poverty Line (BPL) families",
      "Treatment in designated government super-specialty hospitals / RCCs"
    ],
    reliability: 88,
    description: "Rashtriya Arogya Nidhi provides one-time financial assistance to patients who are suffering from major life-threatening diseases related to heart, kidney, liver, cancer, etc. who are receiving treatment in super specialty government hospitals or regional cancer centres.",
    links: [
      { label: "RAN Scheme Details", url: "https://www.myscheme.gov.in/schemes/ran", type: "official" }
    ],
    requiredDocuments: [
      "Prescribed RAN Application Form (signed by treating doctor)",
      "Countersignature by Medical Superintendent of the government hospital",
      "Income Certificate (verifying BPL status)",
      "BPL Ration Card copy",
      "Oncology medical test reports & biopsy diagnoses",
      "Copy of bank account passbook",
      "Passport-sized photograph of the patient"
    ]
  },
  {
    title: "Health Minister’s Cancer Patient Fund (HMCPF)",
    category: "General",
    state: "All India",
    tag: "Central Govt",
    tagTone: "tertiary-container",
    icon: "medical_services",
    body: "Dedicated cancer-treatment fund under RAN for BPL cancer patients treated at Regional Cancer Centres (RCCs) and approved institutes. (myScheme)",
    bullets: [
      "Assistance: up to ₹2 Lakh standard, up to ₹5 Lakh emergency",
      "Exclusive for BPL (poor) patients suffering from malignant cancer",
      "Valid at 27 designated Regional Cancer Centres (RCCs) across India"
    ],
    reliability: 90,
    description: "The HMCPF is a dedicated cancer treatment fund set up under the Rashtriya Arogya Nidhi (RAN). The financial assistance is provided directly to the treating Regional Cancer Centre to cover drugs, radiation, and surgeries. Central/State Gov or PSU employees are not eligible.",
    links: [
      { label: "HMCPF Information", url: "https://www.myscheme.gov.in/schemes/hmcpf", type: "official" }
    ],
    requiredDocuments: [
      "Prescribed HMCPF Application Form completed by treating doctor",
      "Countersignature by Medical Superintendent of designated Regional Cancer Centre (RCC)",
      "Income Certificate (verifying low-income/BPL status)",
      "BPL Ration Card copy",
      "Complete medical history, biopsy, and pathology reports",
      "Aadhaar Card copy",
      "Passport-sized photograph of the patient"
    ]
  },
  {
    title: "Health Minister’s Discretionary Grant (HMDG)",
    category: "General",
    state: "All India",
    tag: "Central Govt",
    tagTone: "tertiary-container",
    icon: "handshake",
    body: "One-time financial assistance for poor patients receiving treatment in government hospitals.",
    bullets: [
      "One-time financial grant up to ₹1,25,000",
      "Income ceiling applies for needy poor families",
      "Requires recommendation from treating government doctor"
    ],
    reliability: 82,
    description: "The HMDG scheme provides up to ₹1,25,000 in one-time financial assistance to poor patients who are suffering from major illnesses and cannot afford treatments in government hospitals.",
    links: [
      { label: "MoHFW Financial Assistance Info", url: "https://main.mohfw.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Prescribed HMDG Application Form signed by the treating doctor",
      "Income Certificate showing annual family income under limits",
      "Ration Card copy",
      "Detailed medical diagnosis report and treatment cost estimate",
      "Identity Proof (Aadhaar/Voter ID)",
      "Recommendation from local MP/District Magistrate or treating hospital"
    ]
  },
  {
    title: "National Programme for Prevention and Control of Non-Communicable Diseases (NP-NCD)",
    category: "General",
    state: "All India",
    tag: "Central Govt",
    tagTone: "tertiary-container",
    icon: "biotech",
    body: "Government screening and early detection program for cancers including breast cancer at district hospitals and health centres.",
    bullets: [
      "Free routine cancer screening and counseling",
      "Clinics situated at district and block health centers",
      "Focuses on early detection of breast, oral & cervical cancers"
    ],
    reliability: 80,
    description: "NP-NCD focuses on infrastructure development, human resource development, health promotion, early diagnosis, and management of non-communicable diseases. Under this initiative, free cancer screening and community-level awareness drives are conducted regularly.",
    links: [
      { label: "NP-NCD Program Website", url: "https://nhm.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Aadhaar Card (Identity proof)",
      "OPD registration slip at Government District Hospital / Health Centre",
      "Local address proof"
    ]
  },
  {
    title: "Central Government Health Scheme (CGHS)",
    category: "General",
    state: "All India",
    tag: "Central Govt",
    tagTone: "tertiary-container",
    icon: "badge",
    body: "Cashless cancer treatment and reimbursement for central government employees, pensioners and dependents.",
    bullets: [
      "Cashless treatment and diagnostics at empanelled centers",
      "Applicable to central government employees and pensioners",
      "Covers chemotherapy, radiation & surgery procedures"
    ],
    reliability: 92,
    description: "CGHS provides comprehensive health care facilities for Central Government employees, pensioners, and their family members. Cashless cancer therapies are covered in private hospitals empanelled with CGHS based on standard rates.",
    links: [
      { label: "CGHS Portal", url: "https://cghs.nic.in", type: "official" }
    ],
    requiredDocuments: [
      "Valid CGHS Plastic Card of the employee/pensioner & dependent",
      "Oncologist referral letter from government medical officer",
      "Official permission letter for cancer treatment at private empanelled hospital",
      "Original prescriptions, medical reports, and bills"
    ]
  },
  {
    title: "Employees’ State Insurance Scheme (ESIC)",
    category: "General",
    state: "All India",
    tag: "Central Govt",
    tagTone: "tertiary-container",
    icon: "domain",
    body: "Covers cancer treatment for eligible salaried workers under ESI hospitals and tie-up centres.",
    bullets: [
      "Full coverage for salaried workers with monthly income under limits",
      "Treatment at specialized ESI super-specialty hospitals",
      "Extends cancer treatment benefits to dependents"
    ],
    reliability: 89,
    description: "ESIC is a multi-dimensional social security system that provides medical care and cash benefits for workers in the organized sector. Cancer care and advanced chemotherapy are provided completely free at ESI network and tie-up hospitals.",
    links: [
      { label: "ESIC Official Website", url: "https://www.esic.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "ESIC Pehchan Smart Card / E-Pehchan Card",
      "Employer declaration of monthly contributions / salary slip",
      "Doctor referral from local ESI Dispensary / Hospital",
      "Identity Proof and Domicile proof of the patient"
    ]
  },
  {
    title: "Indian Railways Cancer Concession",
    category: "General",
    state: "All India",
    tag: "Central Govt",
    tagTone: "tertiary-container",
    icon: "train",
    body: "Railway fare concession (up to 100% in some classes) for cancer patients and attendants traveling for treatment.",
    bullets: [
      "Up to 100% ticket discount for cancer patients",
      "Concession also provided for one accompanying attendant",
      "Valid for travel to/from empanelled oncology hospitals"
    ],
    reliability: 94,
    description: "To ease the burden of cancer travel, Indian Railways provides significant concessions on travel fares for cancer patients going for diagnostic checks, active surgery, radiation, or chemotherapy, along with one attendant.",
    links: [
      { label: "Railway Concession Rules", url: "https://indianrailways.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Official Railway Cancer Concession Certificate issued by treating oncologist / Cancer Hospital",
      "Oncology diagnosis report and hospital referral card",
      "Aadhaar Card / Photo Identity of patient & attendant",
      "Copy of active treatment schedule"
    ]
  },
  {
    title: "Air India Cancer Travel Concession",
    category: "General",
    state: "All India",
    tag: "Central Govt",
    tagTone: "tertiary-container",
    icon: "flight",
    body: "Discounted airfare for cancer patients traveling for treatment.",
    bullets: [
      "Up to 50% discount on base fares for domestic travel",
      "Requires standard oncology medical certification",
      "Valid on select Air India operated flights"
    ],
    reliability: 88,
    description: "Air India provides air travel concessions to cancer patients traveling for treatment or diagnostic checks within India. This helps patients travel quickly and safely under high-comfort conditions.",
    links: [
      { label: "Air India Concessions", url: "https://www.airindia.com", type: "official" }
    ],
    requiredDocuments: [
      "Official Medical Certificate issued by Regional Cancer Centre / Government Hospital",
      "Airline Concession application form",
      "Identity Proof (Aadhaar / Passport)",
      "Proof of medical appointment / surgery details"
    ]
  },
  {
    title: "National Health Mission (NHM)",
    category: "General",
    state: "All India",
    tag: "Central Govt",
    tagTone: "tertiary-container",
    icon: "health_and_safety",
    body: "Funds state-level cancer screening, diagnostics, awareness and district NCD clinics.",
    bullets: [
      "Supports free medicines and diagnostic checks in states",
      "Establishes District Non-Communicable Disease (NCD) clinics",
      "Funds regional oncology awareness campaigns"
    ],
    reliability: 85,
    description: "The NHM supports states in strengthening their healthcare delivery systems, including cancer diagnosis, screening, and secondary care under national non-communicable disease initiatives.",
    links: [
      { label: "NHM India Portal", url: "https://nhm.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Local government hospital registration / treatment booklet",
      "Ration Card copy"
    ]
  },
  {
    title: "AFFDF - Financial Assistance for ex-Servicemen & Widows",
    category: "General",
    state: "All India",
    tag: "Central Govt",
    tagTone: "tertiary-container",
    icon: "military_tech",
    body: "Financial assistance for treatment of serious diseases including cancer to non-pensioner ex-servicemen of all ranks and their widows. (myScheme)",
    bullets: [
      "Cancer/Dialysis assistance up to ₹75,000 per annum",
      "Reimbursement: 75% for non-pensioner officers, 90% for other ranks",
      "Valid for treatments obtained at approved government hospitals"
    ],
    reliability: 86,
    description: "The Armed Forces Flag Day Fund (AFFDF) provides financial assistance to non-pensioner ex-servicemen (ESM) of all ranks and their widows who are suffering from serious illnesses like cancer, heart disease, or renal failure. Expenditure is calculated based on CGHS/ECHS rates. Bank account must be with SBI or PNB.",
    links: [
      { label: "AFFDF Scheme Link", url: "https://www.myscheme.gov.in/schemes/affdf-serious-disease-treatment", type: "official" }
    ],
    requiredDocuments: [
      "Ex-Servicemen Discharge Book copy",
      "Sainik Board non-pensioner identity card",
      "Medical Certificate confirming cancer from approved government hospital",
      "Itemized medical bills, prescriptions, and receipts",
      "Affidavit declaring non-receipt of other medical pension/reimbursement",
      "Copy of bank passbook (SBI or PNB only)",
      "Aadhaar Card copy"
    ]
  },
  {
    title: "NPCDCS Breast Cancer Screening Program",
    category: "Breast Cancer Specific",
    state: "All India",
    tag: "Breast Cancer",
    tagTone: "surface-variant",
    icon: "female",
    body: "Clinical breast examination and screening through government Primary Health Centres (PHCs), CHCs and district hospitals.",
    bullets: [
      "Free clinical breast examinations by trained doctors",
      "Local community-level outreach and education programs",
      "Referral pipeline to Regional Cancer Centres for diagnostics"
    ],
    reliability: 82,
    description: "Under the NPCDCS, screening for breast cancer is prioritized at local primary healthcare touchpoints, helping detect abnormalities early for quick diagnostic follow-up.",
    links: [
      { label: "NPCDCS Information", url: "https://nhm.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Primary Health Centre (PHC) / CHC registration booklet",
      "Referral slip (if referred to tertiary center)"
    ]
  },
  {
    title: "Ayushman Bharat Breast Cancer Packages",
    category: "Breast Cancer Specific",
    state: "All India",
    tag: "Breast Cancer",
    tagTone: "surface-variant",
    icon: "medical_information",
    body: "Includes mastectomy, lumpectomy, chemo, radiation, diagnostics and reconstructive procedures in approved hospitals.",
    bullets: [
      "Full coverage for surgery, chemotherapy and radiation cycles",
      "Includes breast reconstruction procedures",
      "Cashless diagnostic packages at empanelled centers"
    ],
    reliability: 94,
    description: "Ayushman Bharat provides targeted breast cancer health benefit packages, which include surgical interventions (like mastectomy), adjuvant therapies, and reconstructive plastic surgery at approved network hospitals.",
    links: [
      { label: "Ayushman Breast Cancer Packages", url: "https://www.bajajfinserv.in", type: "official" }
    ],
    requiredDocuments: [
      "Ayushman Golden Card",
      "Biopsy and pathology diagnostic reports confirming breast cancer stage",
      "Doctor's surgical/chemotherapy prescription layout",
      "Ration Card showing family listing"
    ]
  },
  {
    title: "Regional Cancer Centres (RCCs) Subsidies",
    category: "Breast Cancer Specific",
    state: "All India",
    tag: "Breast Cancer",
    tagTone: "surface-variant",
    icon: "domain_add",
    body: "Government-supported specialized cancer institutes offering subsidized breast cancer treatment under HMCPF/RAN.",
    bullets: [
      "Subsidized high-quality surgery, radiation and chemo",
      "Facilitates direct application for central funds like RAN/HMCPF",
      "State-of-the-art oncology infrastructure & specialists"
    ],
    reliability: 91,
    description: "Regional Cancer Centres are government-supported super-specialty institutes that provide subsidized cancer care, allowing low-income families to access state-of-the-art diagnostics and therapies.",
    links: [
      { label: "RCCs Information", url: "https://pib.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "RCC OPD Card",
      "Biopsy / histopathology diagnosis report",
      "Income Certificate (if seeking subsidies / RAN registration)",
      "Aadhaar Card and Local residence proof"
    ]
  },
  {
    title: "Dr. YSR Aarogyasri Health Scheme",
    category: "State Specific",
    state: "Andhra Pradesh",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Cashless treatment for serious diseases including cancer at empanelled govt and private hospitals. Breast cancer surgeries and oncology packages covered.",
    bullets: [
      "100% cashless treatment in empanelled hospitals",
      "Covers breast cancer surgery & comprehensive oncology",
      "Income limit is verified via local state-issued ration cards"
    ],
    reliability: 90,
    description: "Dr. YSR Aarogyasri is the flagship health insurance scheme of Andhra Pradesh, offering high-fidelity cashless care for serious ailments including cancer therapies, surgery, and palliative care.",
    links: [
      { label: "YSR Aarogyasri Portal", url: "https://www.aarogyasri.ap.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Dr. YSR Aarogyasri Card or BPL Rice Card",
      "Aadhaar Card",
      "Doctor referral letter from empanelled hospital",
      "Cancer diagnostic reports (biopsy, imaging, etc.)"
    ]
  },
  {
    title: "Aarogyasri Health Scheme Telangana",
    category: "State Specific",
    state: "Telangana",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Major cancer treatment including breast cancer surgery, chemotherapy and radiation through empanelled hospitals.",
    bullets: [
      "Cashless care across public & private empanelled networks",
      "Comprehensive breast cancer surgery & radiation packages",
      "Fully integrated with state health authorities"
    ],
    reliability: 89,
    description: "The Aarogyasri Health Scheme in Telangana provides cashless healthcare to low-income families, ensuring they can access advanced cancer care without financial distress.",
    links: [
      { label: "Aarogyasri Telangana Portal", url: "https://www.aarogyasri.telangana.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Aarogyasri Card or Food Security Card (Ration Card)",
      "Aadhaar Card",
      "Doctor recommendation / referral slip",
      "Biopsy or medical report confirming cancer"
    ]
  },
  {
    title: "Mahatma Jyotiba Phule Jan Arogya Yojana (MJPJAY)",
    category: "State Specific",
    state: "Maharashtra",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Covers cancer hospitalization, surgeries, chemotherapy and radiation for eligible low-income families.",
    bullets: [
      "Covers breast oncology, surgeries, and chemotherapy",
      "For Yellow/Orange ration card holder families",
      "Substantial cash-free financial cover in empanelled centers"
    ],
    reliability: 88,
    description: "MJPJAY is a cashless health insurance scheme for poor families in Maharashtra. It offers comprehensive coverage for selected critical therapies, including complex cancer procedures.",
    links: [
      { label: "MJPJAY Portal", url: "https://www.jeevandayee.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Yellow or Orange Ration Card copy",
      "MJPJAY Health Card / Aadhaar Card",
      "Doctor diagnosis report and empanelled hospital referral slip",
      "Detailed pathology / biopsy reports"
    ]
  },
  {
    title: "Chief Minister Relief Fund Maharashtra",
    category: "State Specific",
    state: "Maharashtra",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Financial support for high-cost treatment including cancer and breast cancer surgeries.",
    bullets: [
      "One-time medical financial grant to cover bills",
      "Direct disbursement to the treating hospital",
      "Applies to critical procedures and chemotherapy"
    ],
    reliability: 80,
    description: "The CMRF Maharashtra provides immediate financial assistance to poor patients undergoing high-cost treatments for major ailments like cancer, open-heart surgery, or brain surgery.",
    links: [
      { label: "CMRF Maharashtra", url: "https://cmrf.maharashtra.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Official CMRF application form",
      "Income Certificate (family income under limits)",
      "Original hospital quotation / treatment cost estimate",
      "Treating doctor recommendation and biopsy reports",
      "Ration Card copy",
      "Aadhaar Card"
    ]
  },
  {
    title: "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS)",
    category: "State Specific",
    state: "Tamil Nadu",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Cashless oncology treatment including breast cancer diagnostics, surgery and chemotherapy.",
    bullets: [
      "Cashless diagnostic checks, surgery, and chemotherapy",
      "Smart-card based verification for quick processing",
      "Empanelled network across both state & private hospitals"
    ],
    reliability: 91,
    description: "CMCHIS in Tamil Nadu is a flagship state insurance plan that provides cashless tertiary health care, particularly focused on serious procedures including oncological services.",
    links: [
      { label: "CMCHIS Tamil Nadu Portal", url: "https://www.cmchistn.com", type: "official" }
    ],
    requiredDocuments: [
      "CMCHIS Smart Card",
      "Income Certificate (issued by Revenue Department)",
      "Aadhaar Card",
      "Treating doctor referral slip and biopsy reports"
    ]
  },
  {
    title: "Arogya Karnataka",
    category: "State Specific",
    state: "Karnataka",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Universal health coverage model including oncology and breast cancer treatment.",
    bullets: [
      "Covers primary to tertiary specialized oncology care",
      "Universal health coverage model with digital cards",
      "Available across empanelled hospitals in Karnataka"
    ],
    reliability: 87,
    description: "Arogya Karnataka aims to provide universal health coverage to residents, including cashless treatment for specified tertiary procedures for poor cardholders.",
    links: [
      { label: "Arogya Karnataka Portal", url: "https://arogya.karnataka.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Arogya Karnataka Card / PDS Card (Ration Card)",
      "Aadhaar Card",
      "Government referral letter (from taluk/district hospital to empanelled center)",
      "Biopsy oncology reports"
    ]
  },
  {
    title: "Karunya Arogya Suraksha Padhathi (KASP)",
    category: "State Specific",
    state: "Kerala",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "PMJAY-integrated scheme covering tertiary care including cancer treatment.",
    bullets: [
      "Integrated with Ayushman Bharat framework",
      "₹5 Lakh health cover per family annually",
      "Covers advanced surgeries and chemotherapy cycles"
    ],
    reliability: 90,
    description: "KASP provides cashless, comprehensive tertiary health coverage for Kerala families, integrating central and state resources to cover severe conditions like cancer.",
    links: [
      { label: "Kerala SHA / KASP Portal", url: "https://sha.kerala.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "KASP Smart Card",
      "Aadhaar Card",
      "Ration Card showing family listing in Kerala",
      "Confirmed cancer medical diagnosis and biopsy report"
    ]
  },
  {
    title: "Karunya Benevolent Fund",
    category: "State Specific",
    state: "Kerala",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Financial aid for costly diseases including cancer.",
    bullets: [
      "Financial grants up to ₹3 Lakh for cancer care",
      "Funded dynamically via state lottery proceeds",
      "Specifically targeted to poor & lower-middle class"
    ],
    reliability: 85,
    description: "The Karunya Benevolent Fund provides medical financial assistance to poor patients suffering from high-cost diseases, funded primarily through state lottery revenues.",
    links: [
      { label: "Karunya Fund Portal", url: "http://www.kbf.kerala.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Income Certificate (family income under ₹3 Lakh/year)",
      "Medical Certificate and cost estimate from treating doctor",
      "Ration Card / BPL card",
      "Aadhaar Card",
      "Copy of bank passbook"
    ]
  },
  {
    title: "Cancer Suraksha Scheme - Kerala (U-18)",
    category: "State Specific",
    state: "Kerala",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Free cancer treatment for children under 18 years. (myScheme)",
    bullets: [
      "100% free cancer treatments, implants and chemotherapy drugs",
      "Patient age: 18 years or below, resident of Kerala",
      "Initial expenditure limit: ₹50,000 (can be extended by committee)"
    ],
    reliability: 92,
    description: "Kerala's Cancer Suraksha Scheme provides completely free medical diagnostics, surgeries, and chemotherapy to children under the age of 18 belonging to low-income/BPL families. Treats cashlessly at RCC, Thiruvananthapuram and major medical colleges via Patient Cards.",
    links: [
      { label: "Cancer Suraksha Kerala", url: "https://www.myscheme.gov.in/schemes/css", type: "official" }
    ],
    requiredDocuments: [
      "Patient Birth Certificate (as proof of age <= 18)",
      "Kerala Residence / Domicile Certificate",
      "BPL Certificate or BPL Ration Card copy",
      "Aadhaar Card of the patient or parent",
      "Confirmed oncology diagnosis and pathology report",
      "Passport-sized photograph of the child"
    ]
  },
  {
    title: "Mukhyamantri Amrutam Yojana (MA)",
    category: "State Specific",
    state: "Gujarat",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Financial protection for tertiary treatments including oncology and breast cancer care.",
    bullets: [
      "Up to ₹3 Lakh cashless care cover per family",
      "Targeted for Below Poverty Line (BPL) families",
      "Covers surgery, radiation, and chemotherapy cycles"
    ],
    reliability: 89,
    description: "MA Yojana provides cashless tertiary care to poor families in Gujarat, covering surgeries, therapies, and medications in a wide empanelled network.",
    links: [
      { label: "Mukhyamantri Amrutam", url: "https://magujarat.com", type: "official" }
    ],
    requiredDocuments: [
      "MA Card",
      "BPL Ration Card showing family member registry",
      "Aadhaar Card",
      "Pathology / biopsy reports and doctor's referral"
    ]
  },
  {
    title: "MA Vatsalya Yojana",
    category: "State Specific",
    state: "Gujarat",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Expanded coverage for middle-income families requiring advanced treatment.",
    bullets: [
      "Extends MA scheme cashless benefits to middle class",
      "For families with annual income up to ₹4 Lakh",
      "Comprehensive cashless oncology care & packages"
    ],
    reliability: 88,
    description: "MA Vatsalya extends the premium cashless coverage of the MA Yojana to lower-middle-income families, shielding them from massive medical debts during cancer care.",
    links: [
      { label: "MA Gujarat", url: "https://magujarat.com", type: "official" }
    ],
    requiredDocuments: [
      "MA Vatsalya Card",
      "Income Certificate (family income under ₹4 Lakh/year)",
      "Aadhaar Card",
      "Doctor diagnosis report and biopsy results"
    ]
  },
  {
    title: "Free Medical Assistance - Gujarat",
    category: "State Specific",
    state: "Gujarat",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Free medical aid and support for cancer treatment for needy patients. (myScheme)",
    bullets: [
      "Managed by the Tribal Development Department, Govt of Gujarat",
      "Exclusively for Scheduled Tribe (ST) patients in Gujarat",
      "Covers critical illnesses: Cancer, TB, Leprosy, HIV/AIDS, Thalassemia"
    ],
    reliability: 80,
    description: "This state program ensures that patients from Scheduled Tribe backgrounds in Gujarat with family incomes of ₹6,00,000 or less receive critical medical assistance and free basic cancer care in public healthcare setups via Direct Benefit Transfer (DBT).",
    links: [
      { label: "Free Medical Assistance Gujarat Details", url: "https://www.myscheme.gov.in/schemes/fmaguj", type: "official" }
    ],
    requiredDocuments: [
      "Scheduled Tribe (ST) Certificate copy",
      "Income Certificate (showing annual family income <= ₹6,00,000)",
      "Medical Certificate from government hospital confirming cancer",
      "Aadhaar Card and bank passbook details (Aadhaar-linked)",
      "Gujarat Domicile proof",
      "Passport-sized photograph of the patient"
    ]
  },
  {
    title: "Mukhyamantri Chiranjeevi Swasthya Bima Yojana",
    category: "State Specific",
    state: "Rajasthan",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Large insurance coverage including cancer surgery, chemo and radiation in govt and private hospitals.",
    bullets: [
      "Substantial cash-free insurance cover per family",
      "Covers complex cancer surgeries, chemo & radiation",
      "Valid at public and empanelled private hospitals"
    ],
    reliability: 90,
    description: "Rajasthan's premium insurance scheme offers high-value healthcare coverage, covering major procedures and advanced oncology packages cashless.",
    links: [
      { label: "Chiranjeevi Rajasthan", url: "https://chiranjeevi.rajasthan.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Chiranjeevi Health Card or Jan Aadhaar Card",
      "Aadhaar Card",
      "Medical diagnosis reports (biopsy, histopathology)",
      "Doctor prescriptions and hospital referral details"
    ]
  },
  {
    title: "Financial Assistance for ex-Servicemen & Dependents - Rajasthan",
    category: "State Specific",
    state: "Rajasthan",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Financial Assistance for the Treatment of Blind, Disabled, Deaf, Dumb, or Mentally Challenged Ex-Servicemen and their Dependents (Wife and Children). (myScheme)",
    bullets: [
      "Rank limit: Havildar or below ex-servicemen, or wife/children",
      "Monthly financial aid of ₹1,000 to ₹3,000 (based on 40%+ disability)",
      "Limited to a maximum of 300 active beneficiaries at a time"
    ],
    reliability: 84,
    description: "Implemented by the Department of Sainik Welfare, Government of Rajasthan. It provides monthly financial assistance (₹1,000 for 40-60% disability, ₹2,000 for 60-80% disability, and ₹3,000 for 80%+ disability) for 3 years to ex-servicemen of the rank of Havildar or below and their dependents who suffer from specified severe disabilities/illnesses.",
    links: [
      { label: "Ex-Servicemen Medical Grant Rajasthan", url: "https://www.myscheme.gov.in/schemes/faafbdmmresf", type: "official" }
    ],
    requiredDocuments: [
      "Ex-Servicemen Discharge Book copy",
      "Sainik Welfare identity card (ex-servicemen/widow)",
      "Rajasthan Domicile/Residence proof Certificate",
      "Government Medical Board Disability Certificate (showing 40%+ disability)",
      "Bank account passbook details copy",
      "Aadhaar Card copy"
    ]
  },
  {
    title: "Biju Swasthya Kalyan Yojana (BSKY)",
    category: "State Specific",
    state: "Odisha",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Cashless hospitalization including oncology treatment.",
    bullets: [
      "Cashless treatment up to ₹5 Lakh (₹10 Lakh for women)",
      "Smart-card based seamless empanelled network",
      "Covers diagnostics, major surgeries & chemotherapy"
    ],
    reliability: 92,
    description: "BSKY is the premier cashless healthcare scheme of Odisha, providing high health assurance cover with an emphasis on female beneficiaries, who get up to ₹10 Lakh in tertiary care coverage.",
    links: [
      { label: "BSKY Odisha", url: "https://bsky.odisha.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "BSKY Smart Card or Ration Card (NFSA/SFSA)",
      "Aadhaar Card of the patient",
      "Confirmed medical cancer diagnosis and biopsy report",
      "Empanelled hospital consultation book"
    ]
  },
  {
    title: "Odisha Free Chemotherapy Programme",
    category: "State Specific",
    state: "Odisha",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Free chemotherapy at district hospitals.",
    bullets: [
      "Free chemotherapy drug administration",
      "Situated at local District Headquarters Hospitals",
      "Subsidizes primary cancer treatment costs"
    ],
    reliability: 85,
    description: "This pioneering state program provides free chemotherapy drugs and administration facilities at district levels, removing travel and medication burdens.",
    links: [
      { label: "Odisha Health Department", url: "https://health.odisha.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Aadhaar Card / local residence proof of Odisha",
      "Doctor's chemotherapy prescription layout",
      "Diagnostic report confirming cancer (biopsy)",
      "Registration card at District Headquarters Hospital"
    ]
  },
  {
    title: "Swasthya Sathi",
    category: "State Specific",
    state: "West Bengal",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Smart-card based cashless health scheme covering cancer treatment.",
    bullets: [
      "Cashless treatment up to ₹5 Lakh per family per year",
      "Entire family covered under a single smart card",
      "Includes complex surgeries, chemo & radiation"
    ],
    reliability: 88,
    description: "Swasthya Sathi is a premium smart-card-based cashless health insurance scheme in West Bengal, providing families with full coverage for critical secondary and tertiary care.",
    links: [
      { label: "Swasthya Sathi Portal", url: "https://swasthyasathi.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Swasthya Sathi Smart Card",
      "Aadhaar Card of the patient",
      "Ration Card copy",
      "Confirmed cancer diagnosis and oncologist prescription"
    ]
  },
  {
    title: "Medical Expenses for Treatment of Major Ailments Including Surgery - West Bengal",
    category: "State Specific",
    state: "West Bengal",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Financial assistance for medical expenses and major surgeries including oncology. (myScheme)",
    bullets: [
      "For registered West Bengal BOCW construction workers",
      "Ailments covered: Cancer, Heart, Kidney, TB, Leprosy",
      "Grant: up to ₹20,000/yr for medicine; up to ₹60,000 for surgeries"
    ],
    reliability: 81,
    description: "Administered by the Building and Other Construction Workers (BOCW) Welfare Board, Government of West Bengal. It provides registered construction workers (aged 18 to 60 with 90+ days work in previous year) and their dependents with financial assistance to cover medical expenses and major surgeries.",
    links: [
      { label: "Medical Expenses West Bengal Details", url: "https://www.myscheme.gov.in/schemes/metfmaiswb", type: "official" }
    ],
    requiredDocuments: [
      "Active West Bengal BOCW Registration Card",
      "Prescribed Form-XI Application Form",
      "Medical Certificate and diagnosis from treating oncologist",
      "Original bills, hospital prescriptions and invoice receipts",
      "Aadhaar Card and West Bengal Domicile proof",
      "Copy of bank passbook details"
    ]
  },
  {
    title: "Transport Workers’ Social Security: Medical Benefit for Major Ailments - West Bengal",
    category: "State Specific",
    state: "West Bengal",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Medical Benefit for Major Ailments for Transport Workers and family. (myScheme)",
    bullets: [
      "For registered unorganized transport workers (aged 18-60)",
      "Covers: Cancer, TB, cardiac problems, kidney malfunction, AIDS",
      "Up to ₹20,000/yr for treatment, up to ₹60,000 for major surgeries"
    ],
    reliability: 83,
    description: "A welfare initiative under the Labour Department, Government of West Bengal, providing transport workers (operating taxis, autos, buses, trucks) and their families with social security benefits and medical grants to cover high-cost cancer and critical surgery bills.",
    links: [
      { label: "Transport Workers Benefit West Bengal Details", url: "https://www.myscheme.gov.in/schemes/wbtwsmbma", type: "official" }
    ],
    requiredDocuments: [
      "Unorganized Transport Worker registration card/proof",
      "Online application submitted via eDistrict 2.0 portal",
      "Age proof (showing age between 18 and 60 years)",
      "Identity and Domicile proof (Aadhaar / Voter ID)",
      "Medical bills, doctor prescriptions, and oncology reports",
      "Copy of bank passbook details"
    ]
  },
  {
    title: "Delhi Arogya Kosh",
    category: "State Specific",
    state: "Delhi",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Financial aid for expensive illnesses including cancer for poor patients.",
    bullets: [
      "Covers specialized high-cost oncology surgeries",
      "Treatment in empanelled or referral state hospitals",
      "Targeted to Delhi residents with specific income ceilings"
    ],
    reliability: 85,
    description: "Delhi Arogya Kosh provides financial assistance to eligible patients for treatment of illnesses, diagnostics, and surgeries in government or empanelled hospitals.",
    links: [
      { label: "Delhi Health Department", url: "https://health.delhi.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Delhi Residence Proof (voter card/Aadhaar/electricity bill)",
      "Income Certificate (family income under limits)",
      "Prescribed DAK application form signed by treating doctor",
      "Original diagnostic reports and surgery estimation booklet",
      "Aadhaar Card"
    ]
  },
  {
    title: "Chirayu Ayushman Haryana",
    category: "State Specific",
    state: "Haryana",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Haryana extension of Ayushman Bharat covering cancer hospitalization and treatment.",
    bullets: [
      "State-led expansion of PM-JAY coverage",
      "₹5 Lakh comprehensive cover per family",
      "Valid for low and middle-income families"
    ],
    reliability: 89,
    description: "Chirayu Ayushman Haryana extends cashless coverage to families with moderate incomes, protecting thousands from large hospital bills during active cancer treatments.",
    links: [
      { label: "Ayushman Haryana", url: "https://ayushmanharyana.in", type: "official" }
    ],
    requiredDocuments: [
      "Chirayu Ayushman Card",
      "Aadhaar Card",
      "Haryana Domicile Certificate",
      "Parivar Pehchan Patra (PPP / Family ID card)"
    ]
  },
  {
    title: "Financial Assistance for Treatment of Chronic Diseases (HBOCWWB) - Haryana",
    category: "State Specific",
    state: "Haryana",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Financial assistance for workers and registered builders suffering from chronic diseases like cancer. (myScheme)",
    bullets: [
      "For construction workers registered under Haryana HBOCWWB",
      "Financial assistance up to ₹1,00,000 for indoor treatment",
      "Requires minimum of 1 year Board membership; domiciled in Haryana"
    ],
    reliability: 83,
    description: "The Haryana Building and Other Construction Workers Welfare Board (HBOCWWB) provides direct financial assistance of up to ₹1,00,000 to registered construction workers for indoor hospitalization and treatment of serious chronic diseases like Cancer, Tuberculosis (TB), or AIDS. OPD treatments are not covered.",
    links: [
      { label: "HBOCWWB Haryana Details", url: "http://myscheme.gov.in/schemes/fatcdhbocwwb", type: "official" }
    ],
    requiredDocuments: [
      "Active Haryana BOCW registration card (showing 1+ yr Board membership)",
      "Antyodaya-SARAL Portal online application receipt",
      "Medical Certificate from treating hospital confirming indoor treatment",
      "Original hospital bills, medicine invoices, and diagnostic reports",
      "Haryana Domicile/Residence proof certificate",
      "Aadhaar Card copy",
      "Copy of bank passbook passdetails",
      "Work slip and recent passport-size photograph"
    ]
  },
  {
    title: "Sarbat Sehat Bima Yojana",
    category: "State Specific",
    state: "Punjab",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Cashless treatment including oncology and major surgeries.",
    bullets: [
      "₹5 Lakh comprehensive cashless coverage",
      "Valid for secondary and tertiary care hospitalization",
      "Covers major cancer surgeries and therapies"
    ],
    reliability: 87,
    description: "Punjab's flagship state health insurance covers major ailments, including comprehensive cancer therapies, at empanelled public and private medical facilities.",
    links: [
      { label: "Punjab Health Insurance", url: "https://www.sha.punjab.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "SSBY Card or Ration Card copy",
      "Aadhaar Card",
      "Punjab Residence proof",
      "Doctor diagnostic recommendation and oncology reports"
    ]
  },
  {
    title: "Mukh Mantri Punjab Cancer Rahat Kosh Scheme",
    category: "State Specific",
    state: "Punjab",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Direct financial relief for cancer patients.",
    bullets: [
      "Up to ₹1.5 Lakh direct medical assistance",
      "Paid directly to the hospital for cancer care",
      "Valid at recognized regional cancer institutes"
    ],
    reliability: 90,
    description: "This scheme provides direct financial relief of up to ₹1.5 Lakh to Punjab residents suffering from cancer, covering medicines, chemotherapy, and surgeries.",
    links: [
      { label: "Punjab Health Dept", url: "https://health.punjab.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Prescribed application form completed by doctor",
      "Income Certificate (under limits)",
      "Original cost estimate from empanelled hospital",
      "Biopsy pathology report confirming cancer",
      "Aadhaar Card and Domicile proof",
      "Passport-sized photograph"
    ]
  },
  {
    title: "HIMCARE Scheme",
    category: "State Specific",
    state: "Himachal Pradesh",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Cashless hospitalization including cancer care.",
    bullets: [
      "₹5 Lakh cashless health cover per family",
      "Covers families not eligible under national PM-JAY",
      "Empanelled private & public hospital treatments"
    ],
    reliability: 88,
    description: "HIMCARE is the Himachal Pradesh state health card scheme, offering cashless treatment for selected critical illnesses, including oncology services.",
    links: [
      { label: "HIMCARE", url: "https://www.hpsbys.in", type: "official" }
    ],
    requiredDocuments: [
      "HIMCARE Card",
      "Himachal Pradesh Ration Card",
      "Aadhaar Card of the patient",
      "Biopsy / medical diagnosis reports"
    ]
  },
  {
    title: "Mukhya Mantri Sahara Yojana - Himachal Pradesh",
    category: "State Specific",
    state: "Himachal Pradesh",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Financial assistance for patients suffering from chronic diseases like cancer. (myScheme)",
    bullets: [
      "Monthly financial assistance of ₹3,000",
      "HP resident, EWS (family income below ₹4 Lakh per year)",
      "Covers chronic conditions: Malignant Cancer, Paralysis, Hemophilia, Muscular Dystrophy, Thalassemia, Renal Failure"
    ],
    reliability: 86,
    description: "A flagship social welfare scheme by the Government of Himachal Pradesh providing ₹3,000 per month financial aid to permanent HP residents from Economically Weaker Sections suffering from specified terminal or incapacitating illnesses. Applicants must not receive other government-sponsored pensions. Applications processed via sahara.hpsbys.in.",
    links: [
      { label: "Mukhya Mantri Sahara Yojana", url: "https://www.myscheme.gov.in/schemes/mmsy", type: "official" }
    ],
    requiredDocuments: [
      "Aadhaar Card copy",
      "Himachal Pradesh Permanent Residence Certificate",
      "Income Certificate (verifying annual family income < ₹4,00,000 issued by Tehsildar/SDM)",
      "Medical Certificate / diagnosis report from Government Hospital confirming chronic disease",
      "Bank account passbook details copy (Aadhaar-linked for DBT)",
      "Declaration stating non-receipt of other government pensions",
      "Recent passport-size photograph"
    ]
  },
  {
    title: "AB-PMJAY SEHAT Scheme",
    category: "State Specific",
    state: "Jammu & Kashmir",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Universal insurance coverage for residents including oncology packages.",
    bullets: [
      "Universal health insurance for all J&K residents",
      "₹5 Lakh comprehensive cashless cover per family",
      "Covers full cancer surgeries & chemotherapy"
    ],
    reliability: 91,
    description: "SEHAT scheme provides universal health insurance to all residents of Jammu and Kashmir. The benefits are similar to PM-JAY, offering comprehensive cashless cancer treatments.",
    links: [
      { label: "SEHAT J&K", url: "https://abpmjay.jk.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "SEHAT J&K Card / Golden Card",
      "Ration Card showing residency in Jammu & Kashmir",
      "Aadhaar Card",
      "Cancer diagnostic reports (biopsy, imaging)"
    ]
  },
  {
    title: "Mukhyamantri Jan Arogya Abhiyan",
    category: "State Specific",
    state: "Uttar Pradesh",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "State-linked insurance model supporting advanced treatment including cancer.",
    bullets: [
      "State-funded insurance for families left out of PM-JAY",
      "₹5 Lakh cashless hospitalization cover",
      "Empanelled network of public & private providers"
    ],
    reliability: 86,
    description: "This UP state scheme ensures that left-out underprivileged families receive identical cashless benefits to Ayushman Bharat, covering major oncological surgeries.",
    links: [
      { label: "UP SHA", url: "https://uphealth.up.nic.in", type: "official" }
    ],
    requiredDocuments: [
      "Jan Arogya Card",
      "Aadhaar Card",
      "UP Ration Card copy",
      "Biopsy pathology reports confirming cancer stage"
    ]
  },
  {
    title: "CM Relief Fund Uttar Pradesh",
    category: "State Specific",
    state: "Uttar Pradesh",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Financial assistance for serious illnesses including cancer.",
    bullets: [
      "Medical grant disbursed based on hospital quotation",
      "Requires application along with income certificates",
      "Direct payment to the treating empanelled hospital"
    ],
    reliability: 78,
    description: "The UP CM Relief Fund provides financial help to poor patients suffering from chronic and severe diseases, assisting them in paying for costly diagnostic tests or surgeries.",
    links: [
      { label: "UP CM Relief Fund", url: "http://upcmrelieffund.up.nic.in", type: "official" }
    ],
    requiredDocuments: [
      "UP CM Relief Fund application form",
      "Income Certificate (family income under limits)",
      "Treating hospital cost estimation / invoice receipt",
      "Treating doctor recommendation and pathology report",
      "UP Domicile certificate and Aadhaar Card"
    ]
  },
  {
    title: "Ayushman Madhya Pradesh",
    category: "State Specific",
    state: "Madhya Pradesh",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Cancer and tertiary-care packages under Ayushman framework.",
    bullets: [
      "Comprehensive oncology package coverage",
      "Cashless access with zero paper documentation",
      "Wide state-wide empanelled network"
    ],
    reliability: 89,
    description: "This initiative implements Ayushman Bharat packages in MP, helping thousands of families access cashless cancer surgeries, radiation and drug cycles.",
    links: [
      { label: "Ayushman MP", url: "https://ayushmanup.in", type: "official" }
    ],
    requiredDocuments: [
      "Ayushman MP Card / Golden Card",
      "Aadhaar Card",
      "MP Ration Card copy",
      "Biopsy pathology reports confirming cancer"
    ]
  },
  {
    title: "Dr. Khoobchand Baghel Swasthya Sahayata Yojana",
    category: "State Specific",
    state: "Chhattisgarh",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Cashless healthcare including cancer treatment.",
    bullets: [
      "Unified health insurance scheme in Chhattisgarh",
      "Up to ₹5 Lakh cashless coverage",
      "Includes major chemotherapy and cancer surgeries"
    ],
    reliability: 87,
    description: "This state-led unified healthcare scheme provides comprehensive health coverage and cashless oncological care to the registered beneficiaries in Chhattisgarh.",
    links: [
      { label: "Chhattisgarh SHA", url: "https://dkbssy.cg.nic.in", type: "official" }
    ],
    requiredDocuments: [
      "Ration Card (Priority or Antyodaya)",
      "Aadhaar Card of the patient",
      "Medical prescriptions and biopsy reports",
      "Empanelled hospital treatment registration slip"
    ]
  },
  {
    title: "Bihar Ayushman Bharat Scheme",
    category: "State Specific",
    state: "Bihar",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Cancer care through Ayushman-linked empanelled hospitals.",
    bullets: [
      "Ayushman-linked cashless oncology procedures",
      "Valid at public medical colleges & private empanelled hospitals",
      "₹5 Lakh cover per family"
    ],
    reliability: 85,
    description: "Bihar's state program rolls out PM-JAY health cards and cashless cancer treatment packages, making advanced therapies affordable for underprivileged families.",
    links: [
      { label: "Bihar SHA", url: "https://biharhealth.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Ayushman Golden Card",
      "Bihar Ration Card",
      "Aadhaar Card",
      "Oncology diagnostic reports confirming cancer"
    ]
  },
  {
    title: "Atal Amrit Abhiyan",
    category: "State Specific",
    state: "Assam",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Financial protection for high-cost diseases including cancer.",
    bullets: [
      "Cashless treatment up to ₹2 Lakh per family",
      "Covers specialty therapies, including oncology & chemo",
      "For low and middle-income families in Assam"
    ],
    reliability: 89,
    description: "Atal Amrit Abhiyan is a high-value health card scheme in Assam, focused on providing cashless treatment for critical diseases including cancer, cardiovascular diseases, and burns.",
    links: [
      { label: "Atal Amrit Abhiyan", url: "https://aaa-assam.in", type: "official" }
    ],
    requiredDocuments: [
      "Atal Amrit Card",
      "Income Certificate (family income under ₹1.2 Lakh/year)",
      "Aadhaar Card and Assam Domicile proof",
      "Oncologist diagnosis prescription and biopsy reports"
    ]
  },
  {
    title: "Grants To Patients Suffering From TB, Cancer & Major Diseases - Assam",
    category: "State Specific",
    state: "Assam",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Financial grants for patients suffering from tuberculosis, cancer, or other major diseases. (myScheme)",
    bullets: [
      "Tea Tribes and Adivasi Welfare Department initiative",
      "One-time financial grant for oncology treatment",
      "Assam resident, Tea Tribes/Adivasi community, family income under ₹5 Lakh"
    ],
    reliability: 82,
    description: "Provides one-time financial assistance to patients from the Tea Tribes and Adivasi community of Assam undergoing treatment for serious health conditions like TB, Cancer, or major surgeries. Not available to state government service holders. Applications processed online via sirishassam.in.",
    links: [
      { label: "Assam Major Diseases Details", url: "https://www.myscheme.gov.in/schemes/gpstbcomd", type: "official" }
    ],
    requiredDocuments: [
      "Tea Tribes / Adivasi Community Caste Certificate",
      "Income Certificate showing annual family income under ₹5,00,000",
      "Medical Certificate and treatment prescription from treating doctor",
      "Aadhaar Card and Assam Domicile/Residence proof",
      "Non-Government Employee declaration certificate",
      "Copy of bank passbook details (linked to Aadhaar)"
    ]
  },
  {
    title: "Grants In Aid To SC/ST Patients with Cancer - Assam",
    category: "State Specific",
    state: "Assam",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Specific grants-in-aid to SC/ST category patients suffering from cancer and other malignant diseases. (myScheme)",
    bullets: [
      "One-time fixed financial grant of ₹50,000",
      "Targeted exclusively for SC or ST community patients in Assam",
      "Helps poor patients cover drug costs & minor surgeries"
    ],
    reliability: 84,
    description: "Administered by the Welfare of Plain Tribes and Backward Classes Department, Government of Assam. It provides a one-time fixed financial grant of ₹50,000 to poor SC/ST patients suffering from cancer, TB, or other malignant diseases who are unable to afford treatment costs. Preference is given to widows, elderly, or BPL families.",
    links: [
      { label: "Assam SC/ST Cancer Details", url: "https://www.myscheme.gov.in/schemes/gascstpsfcad", type: "official" }
    ],
    requiredDocuments: [
      "SC or ST Caste Certificate copy (issued by Assam competent authority)",
      "Medical Certificate confirming cancer / malignant disease from RCC / Government Hospital",
      "Income Certificate / BPL ration card (proving poor status)",
      "Aadhaar Card and Domicile proof",
      "Copy of bank passbook details",
      "Recent passport-size photograph"
    ]
  },
  {
    title: "Medical Assistance (A.B.O.C.W.W.B) - Assam",
    category: "State Specific",
    state: "Assam",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Medical Assistance for Registered Construction Workers under building and other construction board. (myScheme)",
    bullets: [
      "Assistance up to ₹1,50,000 for critical illnesses (Cancer, bypass)",
      "Hospitalization: ₹1,000/day for first 5 days, ₹200/day after (max ₹20,000)",
      "Assam resident, active registered builder with A.B.O.C.W.W.B"
    ],
    reliability: 82,
    description: "Provides comprehensive financial support to registered building and construction workers in Assam. It covers up to ₹1,50,000 for treatments of critical diseases such as cancer, heart bypass surgery, kidney transplantation, and liver cirrhosis, alongside inpatient daily cash benefits during hospital stays.",
    links: [
      { label: "Assam ABOCWWB Details", url: "https://www.myscheme.gov.in/schemes/ma-abocwwb", type: "official" }
    ],
    requiredDocuments: [
      "Active Assam BOCW Construction Worker Registration Card copy",
      "Prescribed application form submitted via abocwwb.assam.gov.in",
      "Original medical bills, prescriptions, and discharge summary",
      "Medical oncology certificate confirming critical illness/surgery details",
      "Aadhaar Card and Assam Domicile proof",
      "Employer work certificate / active work slip",
      "Copy of bank passbook details"
    ]
  },
  {
    title: "Deen Dayal Swasthya Seva Yojana (DDSSY)",
    category: "State Specific",
    state: "Goa",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Cashless hospitalization including cancer treatment.",
    bullets: [
      "Up to ₹4 Lakh cashless cover for tertiary care",
      "Universal scheme for 5+ years Goan residents",
      "Includes oncology packages, surgeries & drugs"
    ],
    reliability: 90,
    description: "DDSSY is Goa's flagship health insurance card scheme, covering secondary and tertiary treatments, including comprehensive cancer care, for all Goan residents.",
    links: [
      { label: "DDSSY Goa", url: "https://www.ddssygoa.in", type: "official" }
    ],
    requiredDocuments: [
      "DDSSY Card",
      "Goa Domicile Proof (residing in Goa for 5+ years)",
      "Aadhaar Card",
      "Oncologist diagnosis layout and empanelled hospital consultation sheet"
    ]
  },
  {
    title: "Atal Ayushman Uttarakhand Yojana",
    category: "State Specific",
    state: "Uttarakhand",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "State health insurance including oncology procedures.",
    bullets: [
      "Universal cashless coverage across Uttarakhand",
      "₹5 Lakh comprehensive cover per family",
      "Includes standard oncology surgeries & drug therapies"
    ],
    reliability: 89,
    description: "Uttarakhand's premium state scheme provides health insurance for residents, ensuring low-income families get cashless oncology therapies at empanelled centres.",
    links: [
      { label: "Atal Ayushman Uttarakhand", url: "https://ayushmanuttarakhand.in", type: "official" }
    ],
    requiredDocuments: [
      "Atal Ayushman Uttarakhand Card",
      "Uttarakhand Ration Card / Family Register copy",
      "Aadhaar Card",
      "Biopsy cancer diagnostics reports"
    ]
  },
  {
    title: "Cancer Day Care Centre (CDCC) Uttarakhand",
    category: "State Specific",
    state: "Uttarakhand",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Free screening for common cancers is conducted across Uttarakhand to detect cancer at an early stage. (myScheme)",
    bullets: [
      "Free community screening for oral, breast, and cervical cancers",
      "Daycare chemotherapy and pain management at district hospitals",
      "Centers established across all 13 districts of Uttarakhand"
    ],
    reliability: 86,
    description: "Implemented by the Department of Medical Health and Family Welfare, Government of Uttarakhand. It aims to ensure early cancer detection and timely treatment. All cancer patients residing in Uttarakhand can access chemotherapy, pain management, and follow-up care offline at designated district hospitals.",
    links: [
      { label: "CDCC Uttarakhand Details", url: "https://www.myscheme.gov.in/schemes/cdccuk", type: "official" }
    ],
    requiredDocuments: [
      "Uttarakhand Domicile / Residence Proof Certificate",
      "Medical Diagnosis / Oncologist referral booklet",
      "District Hospital OPD Registration Card",
      "Aadhaar Card copy"
    ]
  },
  {
    title: "Mukhyamantri Gambhir Bimari Yojana",
    category: "State Specific",
    state: "Jharkhand",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Financial support for life-threatening diseases including cancer.",
    bullets: [
      "Direct medical assistance for critical illnesses",
      "Covers cancer treatment & major surgeries",
      "Valid at recognized public and private empanelled hospitals"
    ],
    reliability: 85,
    description: "Jharkhand's critical illness scheme provides substantial financial assistance to low-income families suffering from severe diseases like cancer or kidney failure.",
    links: [
      { label: "Jharkhand Health Dept", url: "https://health.jharkhand.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Income Certificate (showing low family income)",
      "Medical Certificate and cost estimate from government oncologist",
      "Jharkhand Domicile / Residence Proof",
      "Aadhaar Card and BPL Ration card",
      "Passport-sized photograph"
    ]
  },
  {
    title: "Chikitsa Pratipoorti Yojana - Jharkhand",
    category: "State Specific",
    state: "Jharkhand",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Medical reimbursement scheme for treatments of serious illnesses including cancer. (myScheme)",
    bullets: [
      "100% state-sponsored medical assistance scheme",
      "For registered construction workers under JBOCWW Board aged 18+",
      "Covers: Cancer, heart/kidney surgeries, mental illness, AIDS, organ transplant"
    ],
    reliability: 82,
    description: "Implemented by the Department of Labour, Employment, Training & Skill Development, Government of Jharkhand. It provides registered construction workers engaged in building activities with financial assistance for the treatment of serious chronic illnesses. Applications are processed 100% online via the Shramadhan portal for ₹0.",
    links: [
      { label: "Chikitsa Pratipoorti details", url: "https://www.myscheme.gov.in/schemes/cpy", type: "official" }
    ],
    requiredDocuments: [
      "Jharkhand Building & Other Construction Worker Welfare Board registration card copy",
      "Online application submitted via Jharkhand Shramadhan portal",
      "Medical oncologist certificate and pathology report confirming illness",
      "Original treatment bills, prescriptions, and pharmacy invoices",
      "Jharkhand Domicile certificate copy",
      "Age proof (18 years or older)",
      "Aadhaar Card and copy of bank passbook details"
    ]
  },
  {
    title: "Chief Minister's Arogya Arunachal Yojana (CMAAY)",
    category: "State Specific",
    state: "Arunachal Pradesh",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Health assurance including cancer care.",
    bullets: [
      "₹5 Lakh cashless health cover per family",
      "Covers secondary/tertiary cancer hospitalizations",
      "Valid across state and empanelled specialty networks"
    ],
    reliability: 86,
    description: "CMAAY provides cashless assurance to low-income residents of Arunachal Pradesh, helping them cover oncology and complex surgical procedures.",
    links: [
      { label: "CMAAY Portal", url: "https://www.cmaay.com", type: "official" }
    ],
    requiredDocuments: [
      "CMAAY Card / Golden Card",
      "Arunachal Pradesh ST Certificate or Domicile proof",
      "Aadhaar Card",
      "Cancer diagnostic reports (biopsy)"
    ]
  },
  {
    title: "Chief Minister’s Free Cancer Chemotherapy Scheme (CMFCCS) - Arunachal Pradesh",
    category: "State Specific",
    state: "Arunachal Pradesh",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Free chemotherapy at selected state hospitals up to ₹10 Lakh per patient per year. (myScheme)",
    bullets: [
      "Provides free commonly used chemotherapy medicines",
      "Coverage limit: up to ₹10 Lakh per patient per year (₹5 Lakh per 6 months)",
      "Arunachal resident, AP Scheduled Tribe (APST) members, or state employees/dependents"
    ],
    reliability: 90,
    description: "Launched on August 1, 2017, by the Department of Health & Family Welfare, Government of Arunachal Pradesh. It provides free chemotherapy medicines and oncologist consultations up to ₹10 Lakh annually. Benefits are accessible at State Tertiary Cancer Centres (such as Tomo Riba Institute of Health & Medical Sciences - TRIHMS, Naharlagun) after verification by the scheme's Nodal Officer.",
    links: [
      { label: "Arunachal Free Chemo details", url: "https://www.myscheme.gov.in/schemes/cmfccs", type: "official" }
    ],
    requiredDocuments: [
      "Arunachal Pradesh Scheduled Tribe (APST) Certificate copy",
      "Aadhaar Card or Voter ID card",
      "Relevant residency documentation (Domicile proof)",
      "Medical records, oncologist prescriptions and drug schedule from TRIHMS",
      "Arunachal State Government employee/dependent book copy (if applicable)",
      "Two recent passport-size photographs"
    ]
  },
  {
    title: "Chief Minister-gi Hakshelgi Tengbang (CMHT)",
    category: "State Specific",
    state: "Manipur",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Hospitalization support for secondary and tertiary care for poor families including cancer treatment.",
    bullets: [
      "Up to ₹2 Lakh cashless health cover per family",
      "Direct smart-card based hospital check-ins",
      "Covers critical cancer diagnostics & surgeries"
    ],
    reliability: 88,
    description: "CMHT is Manipur's flagship healthcare scheme, designed to protect BPL and vulnerable families from the devastating costs of critical surgeries and therapies.",
    links: [
      { label: "CMHT Manipur", url: "https://www.cmhtmanipur.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "CMHT Smart Card",
      "Income Certificate / BPL status proof",
      "Aadhaar Card",
      "Doctor diagnostic recommendation and oncology reports"
    ]
  },
  {
    title: "Medical Expenses for Treatment of Major Ailments of a Beneficiary - Manipur",
    category: "State Specific",
    state: "Manipur",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Medical Expenses for Treatment of Major Ailments of a Beneficiary registered under BOCW. (myScheme)",
    bullets: [
      "For registered construction workers under Manipur MBOCWWB & family",
      "Covers: Cancer, Tuberculosis, Heart/Kidney/Eye/Leprosy/Nerve Diseases",
      "Grant: up to ₹45,000 for major surgeries, ₹2,000/yr for minor treatments"
    ],
    reliability: 80,
    description: "Implemented by the Manipur Building and Other Construction Workers' Welfare Board (MBOCWWB). It provides registered building and construction workers and their immediate family members (spouse & children) with financial assistance to cover medical expenses and major operations at public or recognized private oncology settings.",
    links: [
      { label: "Manipur BOCW details", url: "https://www.myscheme.gov.in/schemes/metmab", type: "official" }
    ],
    requiredDocuments: [
      "Manipur BOCW Labour Card copy",
      "Prescribed application form submitted directly to MBOCWWB",
      "Relevant medical bills, doctor prescriptions, and hospital discharge summary",
      "Oncology medical report and biopsy diagnosis",
      "Manipur Residence Proof and Aadhaar Card copy",
      "Copy of bank passbook details"
    ]
  },
  {
    title: "Meghalaya Health Insurance Scheme (MHIS)",
    category: "State Specific",
    state: "Meghalaya",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Cashless treatment for secondary and tertiary care in empanelled hospitals.",
    bullets: [
      "₹5.3 Lakh health cover per family per year",
      "Integrated with PM-JAY for seamless state top-ups",
      "Covers major cancer surgeries and oncology packages"
    ],
    reliability: 89,
    description: "MHIS in Meghalaya provides comprehensive health assurance, covering critical treatments cashless for the vast majority of state residents.",
    links: [
      { label: "MHIS Meghalaya", url: "https://www.mhis.org.in", type: "official" }
    ],
    requiredDocuments: [
      "MHIS Smart Card",
      "Aadhaar Card",
      "Meghalaya Ration Card copy",
      "Confirmed cancer diagnosis and biopsy report"
    ]
  },
  {
    title: "State Illness Assistance - Mizoram",
    category: "State Specific",
    state: "Mizoram",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Cancer aid and medical grant for poor patients receiving treatment in government hospitals.",
    bullets: [
      "Financial assistance and direct illness grants",
      "Aims to cover critical cancer treatment expenses",
      "Targeted to Below Poverty Line (BPL) families"
    ],
    reliability: 83,
    description: "This Mizoram welfare scheme provides direct cash grants or hospital invoice clearings for BPL families undergoing severe cancer care in government setups.",
    links: [
      { label: "Mizoram Health Grants Details", url: "https://health.mizoram.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Income Certificate (proving BPL status)",
      "Hospital quotation / treatment cost estimate signed by doctor",
      "Mizoram Domicile / Residence Proof",
      "Aadhaar Card and BPL Ration card copy",
      "Copy of bank passbook details"
    ]
  },
  {
    title: "Chief Minister's Health Insurance Scheme (CMHIS) - Nagaland",
    category: "State Specific",
    state: "Nagaland",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Universal health insurance for Nagaland residents covering advanced oncology.",
    bullets: [
      "₹5 Lakh comprehensive cashless cover per family",
      "Universal scheme covering almost all state residents",
      "Covers major cancer surgeries and chemotherapy packages"
    ],
    reliability: 87,
    description: "CMHIS Nagaland provides universal health coverage, allowing residents to access critical tertiary care cashless, including intensive cancer surgery and radiation therapies.",
    links: [
      { label: "CMHIS Nagaland", url: "https://cmhis.nagaland.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "CMHIS Card / Nagaland Golden Card",
      "Indigenous Inhabitant of Nagaland Certificate (IINC) or Domicile proof",
      "Aadhaar Card",
      "Biopsy cancer reports and oncologist referral letter"
    ]
  },
  {
    title: "Sikkim State Illness Assistance Scheme",
    category: "State Specific",
    state: "Sikkim",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Medical grants for poor patients suffering from serious illnesses like cancer.",
    bullets: [
      "One-time medical assistance and grants",
      "Assistance for treatments in approved settings",
      "Special provisions for low-income residents"
    ],
    reliability: 82,
    description: "This scheme provides crucial financial support for treatments and surgeries of serious illnesses for BPL residents in Sikkim, helping clear hospital bills.",
    links: [
      { label: "Sikkim Health Department", url: "https://sikkimhealth.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Income Certificate verifying BPL status",
      "Government Medical Officer detailed diagnosis and cost estimate",
      "Sikkim Domicile / Residence certificate copy",
      "Aadhaar Card and bank passbook details copy"
    ]
  },
  {
    title: "Tripura PMJAY & State Programs",
    category: "State Specific",
    state: "Tripura",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Cancer treatment support through Ayushman Bharat state top-up and local cancer center programs.",
    bullets: [
      "Cashless treatment integrated with PM-JAY",
      "Tripura Regional Cancer Centre medical concessions",
      "Support for cancer diagnostics & chemotherapy drugs"
    ],
    reliability: 86,
    description: "Tripura integrates the national PM-JAY cards with state-level medical subsidies to ensure residents get subsidized or free cancer treatments at major state oncology facilities.",
    links: [
      { label: "Tripura Health Insurance Details", url: "https://health.tripura.gov.in", type: "official" }
    ],
    requiredDocuments: [
      "Ayushman Golden Card",
      "Tripura Ration Card / Permanent Resident Certificate (PRTC)",
      "Aadhaar Card",
      "Doctor diagnostic referral sheet from Agartala Regional Cancer Centre"
    ]
  },
  {
    title: "Pension Scheme for Cancer Patients - Tripura",
    category: "State Specific",
    state: "Tripura",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "location_on",
    body: "Monthly pension of 2,000 rupees for cancer patients from low-income groups. (myScheme)",
    bullets: [
      "Provides monthly financial pension of ₹2,000",
      "Tripura resident, annual income must not exceed ₹1,50,000",
      "No member of applicant's family should be in government service"
    ],
    reliability: 88,
    description: "Launched by the Directorate of Social Welfare and Social Education, Government of Tripura. It provides crucial monthly pension support of ₹2,000 directly to the patient's bank account to help cover diagnostic fees and regular transport costs to the hospital. Applications must be submitted offline to the Child Development Project Officer (CDPO) or the Help Desk at the Atal Bihari Vajpayee Regional Cancer Centre (AVBRCC) in Agartala.",
    links: [
      { label: "Tripura Cancer Pension Details", url: "https://www.myscheme.gov.in/schemes/pscp", type: "official" }
    ],
    requiredDocuments: [
      "Permanent Resident of Tripura Certificate (PRTC) / Voter ID / Aadhaar",
      "Income Certificate (showing annual family income <= ₹1,50,000, issued by SDM or DCM)",
      "Medical Certificate confirming cancer from Agartala Regional Cancer Center / Govt Hospital",
      "Non-Government Employee declaration certificate (from a Gazetted Officer)",
      "Copy of bank passbook details (Aadhaar-linked for pension deposits)",
      "Recent passport-sized photograph"
    ]
  },
  {
    title: "Financial Assistance to Old Age Pensioners Suffering From TB/ Cancer - Puducherry",
    category: "State Specific",
    state: "Puducherry",
    tag: "State Govt",
    tagTone: "surface-variant",
    icon: "diversity_3",
    body: "₹500/- per month in addition to the old age pension amount for pensioners suffering from TB or Cancer. (myScheme)",
    bullets: [
      "Additional ₹500/month pension top-up",
      "Indian citizen aged 60+ years, resident of Puducherry",
      "Must be an existing Old Age Pensioner / Destitute Pensioner"
    ],
    reliability: 85,
    description: "Abbreviated as FAOAPSTBC and implemented by the Department of Women and Child Development, Government of Puducherry. It provides additional monthly financial assistance of ₹500 directly via DBT to existing old age or destitute pensioners who are diagnosed with Tuberculosis or Cancer to help offset medicine and nutrition costs. Applications submitted offline to the local CDPO or Deputy Director of DWCD.",
    links: [
      { label: "TB/Cancer Pension details", url: "https://www.myscheme.gov.in/schemes/faoapstbc", type: "official" }
    ],
    requiredDocuments: [
      "Aadhaar Card copy",
      "Puducherry Residence Certificate / Domicile proof",
      "Medical Certificate confirming Cancer or TB from a Government Hospital",
      "Existing Old Age / Destitute Pension card or pension receipt copy",
      "Income Certificate copy",
      "Recent passport-size photograph"
    ]
  }
];

const statesList = [
  "All India",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

export default function Schemes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All India");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeDetailedScheme, setActiveDetailedScheme] = useState<Scheme | null>(null);

  // Esc key closes the drawer/modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDetailedScheme(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when drawer/modal is open
  useEffect(() => {
    if (activeDetailedScheme) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeDetailedScheme]);

  const filteredSchemes = useMemo(() => {
    return schemes.filter((s) => {
      // 1. Text Search Filter
      const searchLower = searchQuery.toLowerCase().trim();
      let matchesSearch = true;
      if (searchLower) {
        matchesSearch =
          s.title.toLowerCase().includes(searchLower) ||
          s.body.toLowerCase().includes(searchLower) ||
          s.state.toLowerCase().includes(searchLower) ||
          s.description.toLowerCase().includes(searchLower) ||
          s.bullets.some((b) => b.toLowerCase().includes(searchLower));
      }

      // 2. Category Filter
      let matchesCategory = true;
      if (selectedCategory !== "All") {
        if (selectedCategory === "Breast Cancer Specific") {
          matchesCategory = s.category === "Breast Cancer Specific";
        } else if (selectedCategory === "General") {
          matchesCategory = s.category === "General";
        } else if (selectedCategory === "State Specific") {
          matchesCategory = s.category === "State Specific";
        }
      }

      // 3. State Filter
      let matchesState = true;
      if (selectedState !== "All India") {
        // If user selects a specific state, show:
        // - Schemes from that specific state
        // - Central Schemes (state === "All India") because they apply everywhere
        matchesState = s.state === selectedState || s.state === "All India";
      }

      return matchesSearch && matchesCategory && matchesState;
    });
  }, [searchQuery, selectedState, selectedCategory]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedState("All India");
    setSelectedCategory("All");
  };

  return (
    <AppShell>
      <div className="p-md md:p-lg max-w-container-max mx-auto relative">
        
        {/* Header */}
        <div className="mb-lg">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">
            Government Schemes & Insurance Catalog
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
            Empowering cancer patients and their families by providing simple, verified details for {schemes.length} major financial aid and health insurance programs in India.
          </p>
        </div>

        {/* Filters Layout */}
        <div className="bg-surface-container-low p-sm md:p-md rounded-2xl border border-outline-variant/60 shadow-sm mb-lg">
          <div className="flex flex-col lg:flex-row gap-sm items-stretch lg:items-center">
            
            {/* Search Input */}
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/80">
                search
              </span>
              <input
                className="w-full pl-12 pr-12 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface-container-lowest outline-none transition-all font-body-md"
                placeholder="Search by scheme name, benefits, keywords..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1 rounded-full hover:bg-surface-container-high transition-all"
                  aria-label="Clear search"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            {/* State Select Dropdown */}
            <div className="relative min-w-[200px] flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-outline/80 z-10 pointer-events-none">
                map
              </span>
              <select
                className="w-full pl-12 pr-8 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest font-body-md text-on-surface outline-none appearance-none cursor-pointer focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                {statesList.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 text-outline pointer-events-none">
                expand_more
              </span>
            </div>

            {/* Reset Button */}
            {(searchQuery || selectedState !== "All India" || selectedCategory !== "All") && (
              <button
                onClick={resetFilters}
                className="flex items-center justify-center gap-xs px-md py-3 rounded-xl border border-outline text-outline font-label-md hover:bg-surface-container hover:text-primary transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span> Reset
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex gap-xs mt-sm overflow-x-auto pb-xs custom-scrollbar">
            {[
              { id: "All", label: "All Schemes", count: schemes.length },
              { id: "Breast Cancer Specific", label: "Breast Cancer Focus", count: schemes.filter(s => s.category === "Breast Cancer Specific").length },
              { id: "General", label: "National & Central Programs", count: schemes.filter(s => s.category === "General").length },
              { id: "State Specific", label: "State Government Schemes", count: schemes.filter(s => s.category === "State Specific").length }
            ].map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-xs px-md py-2.5 rounded-full font-label-sm text-[13px] whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-on-primary shadow-md transform -translate-y-[1px]"
                      : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/50"
                  }`}
                >
                  {cat.label}
                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                    isActive ? "bg-on-primary/20 text-on-primary" : "bg-surface-container text-on-surface-variant"
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Hero: Ayushman Bharat (only shown when selected state is All India or when it matches current filters) */}
        {selectedState === "All India" && selectedCategory !== "State Specific" && !searchQuery && (
          <section className="mb-lg">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary-container text-on-primary p-md md:p-lg flex flex-col md:flex-row items-stretch gap-md shadow-xl border border-primary/20">
              <div className="flex-grow z-10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-xs px-3 py-1 bg-on-primary/20 rounded-full font-label-sm text-label-sm mb-sm border border-on-primary/10">
                    <span className="material-symbols-outlined fill-icon text-[16px] text-tertiary-fixed">star</span>
                    National Health Assurance Priority
                  </div>
                  <h2 className="font-headline-lg text-[26px] md:text-headline-lg mb-sm">
                    Ayushman Bharat (PM-JAY)
                  </h2>
                  <p className="font-body-md md:font-body-lg mb-md max-w-2xl text-on-primary/90 leading-relaxed">
                    Provides ₹5 Lakh medical coverage per family per year for secondary and tertiary care hospitalization. Covers major cancer procedures completely cashless.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-sm md:gap-md mb-md border-t border-on-primary/10 pt-md">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider opacity-70 font-semibold">Coverage Amount</p>
                      <p className="font-headline-sm text-headline-sm text-tertiary-fixed font-bold">₹5,00,000 /yr</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider opacity-70 font-semibold">Cancer Care</p>
                      <p className="font-headline-sm text-headline-sm font-semibold">Full Assistance</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-[11px] uppercase tracking-wider opacity-70 font-semibold">Network Hospitals</p>
                      <p className="font-headline-sm text-headline-sm font-semibold">27,000+ Pan-India</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-sm flex-wrap pt-xs">
                  <button
                    onClick={() => setActiveDetailedScheme(schemes[0])}
                    className="px-md py-3 bg-white text-primary rounded-xl font-label-md text-label-md hover:bg-surface-bright transition-all shadow-md active:scale-95 flex items-center gap-xs"
                  >
                    <span className="material-symbols-outlined text-[18px]">launch</span> Read Application Guide
                  </button>
                  <a
                    href="https://beneficiary.nha.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-md py-3 border border-white/60 text-on-primary rounded-xl font-label-md text-label-md hover:bg-on-primary/10 transition-all active:scale-95 flex items-center gap-xs"
                  >
                    Check Eligibility Online →
                  </a>
                </div>
              </div>
              <div className="hidden lg:flex w-64 h-64 rounded-2xl bg-on-primary/5 items-center justify-center flex-shrink-0 border border-white/10 self-center">
                <span className="material-symbols-outlined text-[130px] text-on-primary/40 select-none">local_hospital</span>
              </div>
            </div>
          </section>
        )}

        {/* Dynamic Catalog Section Header */}
        <div className="flex justify-between items-center mb-md border-b border-outline-variant/40 pb-sm">
          <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary text-[24px]">list_alt</span>
            {filteredSchemes.length === schemes.length ? "All Catalogue Programs" : "Filtered Matches"}
            <span className="text-body-sm font-normal text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
              {filteredSchemes.length} programs found
            </span>
          </h2>
        </div>

        {/* Catalog Grid */}
        {filteredSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter animate-fade-in">
            {filteredSchemes.map((s) => (
              <SchemeTile
                key={s.title}
                scheme={s}
                onViewDetails={() => setActiveDetailedScheme(s)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-xl bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant/80 p-lg text-center shadow-inner">
            <span className="material-symbols-outlined text-[64px] text-outline/50 mb-sm">
              info_i
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">No matching schemes found</h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-md">
              We couldn't find any schemes in {selectedState !== "All India" ? selectedState : "India"} matching "{searchQuery}" under "{selectedCategory}".
            </p>
            <button
              onClick={resetFilters}
              className="px-lg py-3 bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:bg-primary/95 transition-all shadow-md active:scale-95 flex items-center gap-xs"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span> Clear Filter Options
            </button>
          </div>
        )}
      </div>

      {/* Slide-over Detailed Drawer / Modal */}
      {activeDetailedScheme && (
        <div className="fixed inset-0 z-50 flex justify-end transition-all duration-300">
          
          {/* Backdrop glassmorphic */}
          <div
            onClick={() => setActiveDetailedScheme(null)}
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
          />

          {/* Panel Container */}
          <div className="relative w-full max-w-2xl bg-surface-bright h-full shadow-2xl flex flex-col justify-between border-l border-outline-variant/40 animate-slide-in overflow-hidden">
            
            {/* Header */}
            <div className="p-md md:p-lg border-b border-outline-variant/40 flex justify-between items-start bg-surface-container-low">
              <div className="flex-grow pr-sm">
                <div className="flex items-center gap-sm mb-sm flex-wrap">
                  <span className={`px-3 py-1 text-[12px] rounded-full font-label-sm ${
                    activeDetailedScheme.tagTone === "tertiary-container"
                      ? "bg-tertiary-container text-on-tertiary-container font-bold"
                      : "bg-surface-variant text-on-surface-variant font-bold"
                  }`}>
                    {activeDetailedScheme.tag}
                  </span>
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-[12px] font-semibold flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[14px]">map</span>
                    {activeDetailedScheme.state}
                  </span>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[12px] font-semibold flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[14px]">category</span>
                    {activeDetailedScheme.category}
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-primary leading-tight">
                  {activeDetailedScheme.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveDetailedScheme(null)}
                className="p-2 hover:bg-surface-container-high rounded-full text-outline hover:text-on-surface transition-all flex items-center justify-center"
                aria-label="Close details"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Scrollable details container */}
            <div className="p-md md:p-lg overflow-y-auto flex-grow space-y-md custom-scrollbar">
              
              {/* Detailed Description */}
              <div>
                <h3 className="font-label-md text-label-md uppercase tracking-wider text-outline mb-xs">
                  About the Scheme
                </h3>
                <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  {activeDetailedScheme.description || activeDetailedScheme.body}
                </p>
              </div>

              {/* Key Benefits Bullet points */}
              <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/60">
                <h3 className="font-label-md text-label-md uppercase tracking-wider text-outline mb-sm flex items-center gap-xs">
                  <span className="material-symbols-outlined text-secondary text-[18px]">verified</span> Key Takeaways & Guidelines
                </h3>
                <div className="space-y-sm">
                  {activeDetailedScheme.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-sm">
                      <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5 select-none">
                        check_circle
                      </span>
                      <span className="font-body-md text-body-md text-on-surface">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typically Required Documents */}
              {activeDetailedScheme.requiredDocuments && activeDetailedScheme.requiredDocuments.length > 0 && (
                <div>
                  <h3 className="font-label-md text-label-md uppercase tracking-wider text-outline mb-sm flex items-center gap-xs">
                    <span className="material-symbols-outlined text-outline text-[18px]">folder_open</span> Required Checklist Documents
                  </h3>
                  <ul className="grid grid-cols-1 gap-xs pl-sm text-body-sm text-on-surface-variant list-disc">
                    {activeDetailedScheme.requiredDocuments.map((doc, idx) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Trust/Reliability Meter */}
              <div className="bg-surface-container-low p-md rounded-xl flex items-center gap-md border border-outline-variant/40">
                <div className="w-14 h-14 relative flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-outline-variant/30"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="text-secondary transition-all duration-1000"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray={`${activeDetailedScheme.reliability}, 100`}
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute text-[12px] font-bold text-secondary">
                    {activeDetailedScheme.reliability}%
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold">Reliability Score: Verified</p>
                  <p className="text-[12px] text-on-surface-variant leading-tight">
                    This program has a verified approval success rate based on community feedback.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions Footer */}
            <div className="p-md md:p-lg border-t border-outline-variant/40 bg-surface-container-low flex flex-col sm:flex-row gap-sm items-stretch">
              
              {/* Primary Action Buttons */}
              {activeDetailedScheme.links && activeDetailedScheme.links.length > 0 ? (
                <div className="flex flex-col sm:flex-row gap-sm w-full">
                  {activeDetailedScheme.links.map((link, idx) => {
                    const isOfficial = link.type === "official";
                    const isHospital = link.type === "hospitals";
                    const isEligibility = link.type === "eligibility";
                    const isGuide = link.type === "guide";

                    let btnClass = "flex-grow flex items-center justify-center gap-xs px-md py-3 rounded-xl font-label-md text-label-md transition-all active:scale-[0.98] shadow-sm ";
                    let iconName = "open_in_new";

                    if (isOfficial) {
                      btnClass += "bg-primary text-on-primary hover:bg-primary/95";
                      iconName = "language";
                    } else if (isEligibility) {
                      btnClass += "bg-secondary text-on-secondary hover:bg-secondary/95";
                      iconName = "check_box";
                    } else if (isHospital) {
                      btnClass += "bg-surface-container-lowest text-primary border border-primary hover:bg-surface-container-high";
                      iconName = "local_hospital";
                    } else if (isGuide) {
                      btnClass += "bg-error-container text-on-error-container hover:bg-error-container/90";
                      iconName = "video_library";
                    } else {
                      btnClass += "bg-surface-container-lowest text-on-surface-variant border border-outline hover:bg-surface-container-high";
                    }

                    return (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnClass}
                      >
                        <span className="material-symbols-outlined text-[18px]">{iconName}</span>
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center w-full py-2 font-label-sm text-outline text-[12px]">
                  No external links configured for this offline program.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

interface SchemeTileProps {
  scheme: Scheme;
  onViewDetails: () => void;
}

function SchemeTile({ scheme, onViewDetails }: SchemeTileProps) {
  const tagCls =
    scheme.tagTone === "tertiary-container"
      ? "bg-tertiary-container text-on-tertiary-container font-semibold"
      : "bg-surface-variant text-on-surface-variant font-semibold";

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
      
      {/* Top Banner section */}
      <div className="p-md border-b border-outline-variant/40 bg-surface-container-low flex justify-between items-center">
        <div className="bg-primary/5 p-2 rounded-xl group-hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined text-primary text-[22px]">{scheme.icon}</span>
        </div>
        <div className="flex gap-xs items-center">
          <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-[11px] ${tagCls}`}>
            {scheme.tag}
          </span>
          <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant rounded-full text-[10px] font-medium flex items-center gap-[2px]">
            <span className="material-symbols-outlined text-[10px]">map</span>
            {scheme.state === "All India" ? "National" : scheme.state}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-md flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-primary mb-xs group-hover:text-primary-container transition-colors line-clamp-2 min-h-[48px]">
            {scheme.title}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-md line-clamp-3">
            {scheme.body}
          </p>

          {/* Quick highlights */}
          <div className="space-y-xs mb-md border-t border-dashed border-outline-variant/40 pt-md">
            {scheme.bullets.slice(0, 2).map((b, idx) => (
              <div key={idx} className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-secondary text-[16px] flex-shrink-0 select-none">
                  check_circle
                </span>
                <span className="font-body-sm text-[12px] text-on-surface line-clamp-1">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reliability Score section */}
        <div>
          <div className="bg-surface-container-low p-2 rounded-xl flex items-center gap-sm mb-md">
            <div className="w-9 h-9 relative flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-outline-variant/30"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  className="text-secondary"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={`${scheme.reliability}, 100`}
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
              </svg>
              <span className="absolute text-[9px] font-bold text-secondary">
                {scheme.reliability}%
              </span>
            </div>
            <div>
              <p className="font-label-sm text-[11px] text-on-surface font-bold">Reliability Score</p>
              <p className="text-[10px] text-on-surface-variant/80 leading-none">Community verified</p>
            </div>
          </div>

          {/* CTA View details */}
          <button
            onClick={onViewDetails}
            className="w-full py-2.5 border border-primary text-primary rounded-xl font-label-md text-label-md hover:bg-primary/5 transition-all flex items-center justify-center gap-xs active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">launch</span> View Application Details
          </button>
        </div>
      </div>
    </div>
  );
}
