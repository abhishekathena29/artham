import type { Language } from "./translations";

export type ScreeningTest = {
  id: string;
  name: string;
  code: string;
  purpose: string;
  targetArea: string;
  bseInstruction?: string;
  clinicalSignificance: string;
};

export type AgeGuideline = {
  ageGroup: string;
  generalAdvice: string;
  recommendations: {
    testId: string;
    frequency: string;
    description: string;
    badgeTone: "primary" | "secondary" | "tertiary" | "outline";
  }[];
};

export type AreaTier = "tier1" | "tier2" | "tier3";

export type CostDetails = {
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

export const localizedTests: Record<Language, ScreeningTest[]> = {
  en: [
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
  ],
  hi: [
    {
      id: "mammogram",
      name: "डिजिटल मैमोग्राफी",
      code: "MAMM",
      purpose: "कैल्सीफिकेशन, घाव या छिपी हुई गांठों का पता लगाने के लिए स्तन के ऊतकों की प्राथमिक एक्स-रे इमेजिंग।",
      targetArea: "उच्च-सटीक सॉफ्ट-टिशू डायग्नोस्टिक स्कैन",
      clinicalSignificance: "स्तन जांच के लिए स्वर्ण मानक। गांठ बनने से 2 साल पहले तक प्रारंभिक चरण के सूक्ष्म-कैल्सीफिकेशन का पता लगाता है।"
    },
    {
      id: "cbe",
      name: "क्लिनिकल ब्रेस्ट परीक्षा (CBE)",
      code: "CBE",
      purpose: "एक प्रशिक्षित स्वास्थ्य देखभाल पेशेवर (स्त्री रोग विशेषज्ञ/ऑन्कोलॉजिस्ट) द्वारा की जाने वाली शारीरिक स्तन परीक्षा।",
      targetArea: "इन-ऑफिस मैनुअल पल्पेशन और दृश्य ऑडिट",
      clinicalSignificance: "स्कैन में छूटे शारीरिक परिवर्तनों या संरचनात्मक विसंगतियों की पहचान करने के लिए अनुशंसित।"
    },
    {
      id: "bse",
      name: "ब्रेस्ट सेल्फ-एग्जाम (BSE)",
      code: "BSE",
      purpose: "सक्रिय शरीर जागरूकता बनाए रखने के लिए व्यक्तियों द्वारा की जाने वाली मासिक स्व-परीक्षण तकनीक।",
      targetArea: "घर पर नियमित शारीरिक मूल्यांकन",
      bseInstruction: "अपने मासिक धर्म समाप्त होने के 3-5 दिन बाद करें। समरूपता परिवर्तनों के लिए दर्पण में देखें, हाथ उठाएं, और निप्पल से बाहरी सीमाओं तक गोलाकार पैटर्न में स्पर्श करें।",
      clinicalSignificance: "नई बनावट, मोटा होना, या त्वचा में डिंपल की तुरंत पहचान करने के लिए व्यक्तिगत आधारभूत जागरूकता सक्षम बनाता है।"
    },
    {
      id: "ultrasound",
      name: "लक्षित स्तन अल्ट्रासाउंड",
      code: "USG",
      purpose: "द्रव से भरे सिस्ट और ठोस गांठों के बीच अंतर करने के लिए उपयोग की जाने वाली उच्च आवृत्ति ध्वनि तरंग मैपिंग।",
      targetArea: "पूरक अल्ट्रासोनिक सॉफ्ट-टिशू इमेजिंग",
      clinicalSignificance: "घने स्तन ऊतक के लिए आवश्यक माध्यमिक निदान जहां मानक मैमोग्राम की संवेदनशीलता कम होती है।"
    },
    {
      id: "mri",
      name: "कंट्रास्ट-एन्हांस्ड ब्रेस्ट एमआरआई",
      code: "MRI",
      purpose: "घने या उच्च जोखिम वाले ऊतकों की जांच के लिए अंतःशिरा कंट्रास्ट के साथ उच्च-रिज़ॉल्यूशन चुंबकीय क्षेत्र इमेजिंग।",
      targetArea: "तृतीयक संवहनी सॉफ्ट-टिशू स्कैन",
      clinicalSignificance: "अत्यधिक संवेदनशील स्कैन। अत्यधिक उच्च जोखिम (>20% आजीवन जोखिम) या सत्यापित आनुवंशिक उत्परिवर्तन वाली महिलाओं के लिए संकेत दिया गया है।"
    },
    {
      id: "brca",
      name: "BRCA1 और BRCA2 जेनेटिक स्क्रीनिंग",
      code: "BRCA",
      purpose: "वंशानुगत उच्च-जोखिम वाले ऑन्कोलॉजिकल उत्परिवर्तन का पता लगाने के लिए जीन अनुक्रमण विश्लेषण (रक्त या लार)।",
      targetArea: "ऑन्कोजेनेटिक डीएनए अनुक्रमण पैनल",
      clinicalSignificance: "एक बार का परीक्षण। उन्नत वंशानुगत जोखिम (स्तन कैंसर के विकास का 70-80% आजीवन जोखिम तक) की पहचान करता है, जो शल्य चिकित्सा/निवारक रोडमैप का मार्गदर्शन करता है।"
    }
  ],
  mr: [
    {
      id: "mammogram",
      name: "डिजिटल मॅमोग्राफी",
      code: "MAMM",
      purpose: "कॅल्सीफिकेशन, जखम किंवा लपलेल्या गाठी शोधण्यासाठी स्तनाच्या ऊतकांचे प्राथमिक क्ष-किरण इमेजिंग.",
      targetArea: "उच्च-अचूक सॉफ्ट-टिश्यू डायग्नोस्टिक स्कॅन्स",
      clinicalSignificance: "स्तन तपासणीसाठी सुवर्ण मानक. गाठ तयार होण्याच्या २ वर्षे आधीपर्यंत सूक्ष्म-कॅल्सीफिकेशन शोधते."
    },
    {
      id: "cbe",
      name: "शारीरिक स्तन तपासणी (CBE)",
      code: "CBE",
      purpose: "तज्ञ डॉक्टर (स्त्रीरोगतज्ञ/कर्करोगतज्ञ) यांच्याद्वारे केली जाणारी स्तनाच्या आरोग्याची तपासणी.",
      targetArea: "दवाखान्यातील शारीरिक तपासणी आणि दृश्य निरीक्षण",
      clinicalSignificance: "स्कॅनमध्ये सुटलेले शारीरिक बदल किंवा रचनात्मक विसंगती ओळखण्यासाठी शिफारस केलेले."
    },
    {
      id: "bse",
      name: "स्तन स्व-तपासणी (BSE)",
      code: "BSE",
      purpose: "शरीराविषयी जागरूकता ठेवण्यासाठी स्वतः केली जाणारी मासिक शारीरिक तपासणी.",
      targetArea: "घरी केली जाणारी नियमित शारीरिक तपासणी",
      bseInstruction: "मासिक पाळी संपल्यानंतर ३-५ दिवसांनी करा. आरशात पाहून स्तनांचा आकार आणि त्वचेतील बदल तपासा, हात वर करा, आणि निपलपासून बाहेरील भागापर्यंत गोलाकार पद्धतीने बोटांनी फिरवून तपासा.",
      clinicalSignificance: "त्वचेतील बदल किंवा गाठींची प्राथमिक माहिती मिळवून त्वरित डॉक्टरांशी संपर्क साधण्यास मदत करते."
    },
    {
      id: "ultrasound",
      name: "स्तनाचा अल्ट्रासाऊंड (Ultrasound)",
      code: "USG",
      purpose: "स्तनातील पाणी भरलेल्या गाठी आणि घन गाठी यांमधील फरक समजण्यासाठी ध्वनी लहरींचा वापर करणारी चाचणी.",
      targetArea: "अतिरिक्त अल्ट्रासोनिक मऊ ऊतकांचे इमेजिंग",
      clinicalSignificance: "घट्ट स्तनांच्या ऊतकांसाठी आवश्यक दुय्यम तपासणी, जिथे सामान्य मॅमोग्रामचे प्रमाण कमी संवेदनशील असते."
    },
    {
      id: "mri",
      name: "स्तनाची एमआरआय चाचणी (MRI)",
      code: "MRI",
      purpose: "अति-संवेदनशील मऊ ऊतकांची तपासणी करण्यासाठी कॉन्ट्रास्टसह हाय-रिझोल्यूशन चुंबकीय क्षेत्र इमेजिंग.",
      targetArea: "अति-अचूक सॉफ्ट-टिश्यू स्कॅन्स",
      clinicalSignificance: "अत्यंत संवेदनशील स्कॅन. अनुवांशिक बदल किंवा अति-धोका (>२०% आजीवन जोखीम) असलेल्या महिलांसाठी शिफारस केलेले."
    },
    {
      id: "brca",
      name: "BRCA1 आणि BRCA2 अनुवांशिक चाचणी",
      code: "BRCA",
      purpose: "अनुवांशिक कर्करोगाचा धोका शोधण्यासाठी डीएनए (लाळ किंवा रक्त) चाचणी.",
      targetArea: "डीएनए सिक्वेन्सिंग चाचण्या",
      clinicalSignificance: "आयुष्यात एकदाच करायची चाचणी. अनुवांशिक वारशामुळे कर्करोग होण्याचा धोका (७०-८०% आजीवन जोखीम) ओळखते."
    }
  ],
  kn: [
    {
      id: "mammogram",
      name: "ಡಿಜಿಟಲ್ ಮ್ಯಾಮೊಗ್ರಫಿ",
      code: "MAMM",
      purpose: "ಕ್ಯಾಲ್ಸಿಯಂ ಶೇಖರಣೆ, ಗಾಯಗಳು ಅಥವಾ ಗುಪ್ತ ಗಡ್ಡೆಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಸ್ತನ ಅಂಗಾಂಶಗಳ ಪ್ರಾಥಮಿಕ ಕ್ಷ-ಕಿರಣ ಚಿತ್ರಣ.",
      targetArea: "ಹೆಚ್ಚಿನ ನಿಖರತೆಯ ಮೃದು ಅಂಗಾಂಶಗಳ ಡಯಾಗ್ನೋಸ್ಟಿಕ್ ಸ್ಕ್ಯಾನ್‌ಗಳು",
      clinicalSignificance: "ಸ್ತನ ತಪಾಸಣೆಗೆ ಸುವರ್ಣ ಮಾನದಂಡ. ಗಡ್ಡೆ ರೂಪುಗೊಳ್ಳುವ ೨ ವರ್ಷಗಳ ಮೊದಲೇ ಸೂಕ್ಷ್ಮ ಕ್ಯಾಲ್ಸಿಯಂ ಶೇಖರಣೆಯನ್ನು ಪತ್ತೆ ಮಾಡುತ್ತದೆ."
    },
    {
      id: "cbe",
      name: "ಕ್ಲಿನಿಕಲ್ ಸ್ತನ ಪರೀಕ್ಷೆ (CBE)",
      code: "CBE",
      purpose: "ತರಬೇತಿ ಪಡೆದ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರಿಂದ (ಸ್ತ್ರೀರೋಗತಜ್ಞರು/ಆಂಕೊಲಾಜಿಸ್ಟ್) ಮಾಡಲಾಗುವ ದೈಹಿಕ ಸ್ತನ ಪರೀಕ್ಷೆ.",
      targetArea: "ಕ್ಲಿನಿಕ್‌ನಲ್ಲಿ ವೈದ್ಯರಿಂದ ಮಾಡಲಾಗುವ ದೈಹಿಕ ತಪಾಸಣೆ",
      clinicalSignificance: "ಸ್ಕ್ಯಾನ್‌ಗಳಲ್ಲಿ ತಪ್ಪಿಹೋಗಬಹುದಾದ ದೈಹಿಕ ಬದಲಾವಣೆಗಳು ಅಥವಾ ರಚನಾತ್ಮक ವ್ಯತ್ಯಾಸಗಳನ್ನು ಗುರುತಿಸಲು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ."
    },
    {
      id: "bse",
      name: "ಸ್ತನ ಸ್ವಯಂ ಪರೀಕ್ಷೆ (BSE)",
      code: "BSE",
      purpose: "ದೇಹದ ಜಾಗೃತಿ ಕಾಯ್ದುಕೊಳ್ಳಲು ವ್ಯಕ್ತಿಗಳು ಪ್ರತಿ ತಿಂಗಳು ಮಾಡುವ ಸ್ವಯಂ ತಪಾಸಣಾ ವಿಧಾನ.",
      targetArea: "ಮನೆಯಲ್ಲಿ ಮಾಡುವ ದಿನಚರಿ ದೈಹಿಕ ಮೌಲ್ಯಮಾಪನ",
      bseInstruction: "ನಿಮ್ಮ ಮುಟ್ಟು ಮುಗಿದ ೩-೫ ದಿನಗಳ ನಂತರ ಮಾಡಿ. ಕನ್ನಡಿಯ ಮುಂದೆ ನಿಂತು ಎರಡೂ ಕಡೆ ಸಮಾನತೆ ಗಮನಿಸಿ, ಕೈಗಳನ್ನು ಮೇಲೆತ್ತಿ, ಮತ್ತು ನಿಪ್ಪಲ್‌ನಿಂದ ಹೊರ ಅಂಚಿನವರೆಗೆ ಬೆರಳುಗಳಿಂದ ವೃತ್ತಾಕಾರದಲ್ಲಿ ಸ್ಪರ್ಶಿಸಿ ಪರೀಕ್ಷಿಸಿ.",
      clinicalSignificance: "ಹೊಸ ವಿನ್ಯಾಸಗಳು, ಗಡಸುತನ ಅಥವಾ ಚರ್ಮದ ಬದಲಾವಣೆಗಳನ್ನು ತಕ್ಷಣ ಗುರುತಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ."
    },
    {
      id: "ultrasound",
      name: "ಸ್ತನ ಅಲ್ಟ್ರಾಸೌಂಡ್ (Ultrasound)",
      code: "USG",
      purpose: "ನೀರು ತುಂಬಿದ ಚೀಲಗಳು ಮತ್ತು ಘನ ಗಡ್ಡೆಗಳ ನಡುವಿನ ವ್ಯತ್ಯಾಸವನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಬಳಸುವ ಹೆಚ್ಚಿನ ಆವರ್ತನದ ಧ್ವನಿ ತರಂಗ ಚಿತ್ರಣ.",
      targetArea: "ಪೂರಕ ಅಲ್ಟ್ರಾಸಾನಿಕ್ ಮೃದು ಅಂಗಾಂಶ ಇಮೇಜಿಂಗ್",
      clinicalSignificance: "ದಟ್ಟವಾದ ಸ್ತನ ಅಂಗಾಂಶ ಹೊಂದಿರುವ ಮಹಿಳೆಯರಲ್ಲಿ ಮ್ಯಾಮೊಗ್ರಫಿ ಸೂಕ್ಷ್ಮತೆ ಕಡಿಮೆಯಿರುವಾಗ ಇದು ಅತ್ಯಗತ್ಯ ದ್ವಿತೀಯಕ ತಪಾಸಣೆಯಾಗಿದೆ."
    },
    {
      id: "mri",
      name: "ಸ್ತನ ಎಂಆರ್ಐ (MRI) ತಪಾಸಣೆ",
      code: "MRI",
      purpose: "ದಟ್ಟವಾದ ಅಥವಾ ಹೆಚ್ಚಿನ ಅಪಾಯವಿರುವ ಅಂಗಾಂಶಗಳನ್ನು ಪರೀಕ್ಷಿಸಲು ಕಾಂಟ್ರಾสต์‌ನೊಂದಿಗೆ ಮಾಡುವ ಹೆಚ್ಚಿನ ರೆಸಲ್ಯೂಶನ್ ಕಾಂತೀಯ ಕ್ಷೇತ್ರ ಚಿತ್ರಣ.",
      targetArea: "ತೃತೀಯ ಹಂತದ ಅಂಗಾಂಶಗಳ ಸ್ಕ್ಯಾನ್‌ಗಳು",
      clinicalSignificance: "ಅತ್ಯಂತ ಸೂಕ್ಷ್ಮ ಸ್ಕ್ಯಾನ್. ಹೆಚ್ಚಿನ ಅಪಾಯ (>೨೦% ಜೀವಿತಾವಧಿಯ ಅಪಾಯ) ಅಥವಾ ಸಾಬೀತಾದ ಆನುವಂಶಿಕ ರೂಪಾಂತರಗಳನ್ನು ಹೊಂದಿರುವ ಮಹಿಳೆಯರಿಗೆ ಸೂಚಿಸಲಾಗುತ್ತದೆ."
    },
    {
      id: "brca",
      name: "BRCA1 ಮತ್ತು BRCA2 ಜೆನೆಟಿಕ್ ಸ್ಕ್ರೀನಿಂಗ್",
      code: "BRCA",
      purpose: "ಆನುವಂಶಿಕ ಹೆಚ್ಚಿನ ಅಪಾಯದ ರೂಪಾಂತರಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಜೀನ್ ಸೀಕ್ವೆನ್ಸಿಂಗ್ ವಿಶ್ಲೇಷಣೆ (ರಕ್ತ ಅಥವಾ ಲಾಲಾರಸ).",
      targetArea: "ಆಂಕೊಜೆನೆಟಿಕ್ ಡಿಎನ್ಎ ಸೀಕ್ವೆನ್ಸಿಂಗ್ ಪ್ಯಾನೆಲ್‌ಗಳು",
      clinicalSignificance: "ಜೀವನದಲ್ಲಿ ಒಂದು ಬಾರಿ ಮಾಡುವ ಪರೀಕ್ಷೆ. ಆನುವಂಶಿಕ ಅಪಾಯವನ್ನು (೭೦-೮೦% ರಷ್ಟು ಸ್ತನ ಕ್ಯಾನ್ಸರ್ ಅಪಾಯ) ಪತ್ತೆಹಚ್ಚಿ ಚಿಕಿತ್ಸೆಯ ಯೋಜನೆಯನ್ನು ರೂಪಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ."
    }
  ],
  bn: [
    {
      id: "mammogram",
      name: "ডিজিটাল ম্যামোগ্রাফি",
      code: "MAMM",
      purpose: "ক্যালসিফিকেশন, ক্ষত বা লুকানো পিণ্ড সনাক্ত করতে স্তন টিস্যুর প্রাথমিক এক্স-রে ইমেজিং।",
      targetArea: "উচ্চ-নির্ভুল সফট-টিস্যু ডায়াগনস্টিক স্ক্যান",
      clinicalSignificance: "স্তন স্ক্রীনিংয়ের জন্য গোল্ডেন স্ট্যান্ডার্ড। পিণ্ড তৈরি হওয়ার ২ বছর আগে পর্যন্ত প্রাথমিক স্তরের মাইক্রো-ক্যালসিফিকেশন সনাক্ত করে।"
    },
    {
      id: "cbe",
      name: "ক্লিনিক্যাল ব্রেস্ট এক্সাম (CBE)",
      code: "CBE",
      purpose: "একজন প্রশিক্ষিত স্বাস্থ্যসেবা পেশাদার (স্ত্রীরোগ বিশেষজ্ঞ/অনকোলজিস্ট) দ্বারা পরিচালিত শারীরিক স্তন পরীক্ষা।",
      targetArea: "চেম্বারে চিকিৎসকের দ্বারা শারীরিক পরীক্ষা",
      clinicalSignificance: "স্ক্যানে বাদ পড়া শারীরিক পরিবর্তন বা কাঠামোগত অসঙ্গতি সনাক্ত করতে প্রস্তাবিত।"
    },
    {
      id: "bse",
      name: "ব্রেস্ট সেলফ-এক্সাম (BSE)",
      code: "BSE",
      purpose: "সক্রিয় শরীরের সচেতনতা বজায় রাখার জন্য ব্যক্তিদের দ্বারা পরিচালিত মাসিক স্ব-পরীক্ষা পদ্ধতি।",
      targetArea: "বাড়িতে নিয়মিত শারীরিক পরীক্ষা",
      bseInstruction: "আপনার মাসিক শেষ হওয়ার ৩-৫ দিন পর করুন। আয়নায় দেখে প্রতিসাম্য পরিবর্তন লক্ষ্য করুন, হাত তুলুন এবং স্তনবৃন্ত থেকে বাইরের সীমানা পর্যন্ত বৃত্তাকার প্যাটার্নে স্পর্শ করে পরীক্ষা করুন।",
      clinicalSignificance: "নতুন টেক্সচার বা ত্বকের ডিম্পলিং অবিলম্বে সনাক্ত করার জন্য ব্যক্তিগত সচেতনতা তৈরি করে।"
    },
    {
      id: "ultrasound",
      name: "টারগেটেড ব্রেস্ট আল্ট্রাসাউন্ড",
      code: "USG",
      purpose: "তরল-ভরা সিস্ট এবং শক্ত পিণ্ডের মধ্যে পার্থক্য করার জন্য ব্যবহৃত উচ্চ-ফ্রিকোয়েন্সি শব্দ তরঙ্গ ম্যাপিং।",
      targetArea: "সম্পূরক আল্ট্রাসনিক সফট-টিস্যু ইমেজিং",
      clinicalSignificance: "ঘন স্তনের টিস্যুর জন্য অপরিহার্য মাধ্যমিক ডায়াগনস্টিক যেখানে সাধারণ ম্যামোগ্রামের সংবেদনশীলতা কম।"
    },
    {
      id: "mri",
      name: "কনট্রাস্ট-এনহান্সড ব্রেস্ট এমআরআই",
      code: "MRI",
      purpose: "ঘন বা উচ্চ ঝুঁকিপূর্ণ টিস্যু স্ক্রীন করার জন্য ইন্ট্রাভেনাস কনট্রাস্ট সহ উচ্চ-রেজোলিউশন চৌম্বক ক্ষেত্র ইমেজিং।",
      targetArea: "উচ্চ ক্ষমতাসম্পন্ন সফট-টিস্যু স্ক্যান",
      clinicalSignificance: "অত্যন্ত সংবেদনশীল স্ক্যান। অত্যন্ত উচ্চ ঝুঁকি (>২০% আজীবন ঝুঁকি) বা যাচাইকৃত জেনেটিক মিউটেশন সহ মহিলাদের জন্য নির্দেশিত।"
    },
    {
      id: "brca",
      name: "BRCA1 এবং BRCA2 জেনেটিক স্ক্রীনিং",
      code: "BRCA",
      purpose: "বংশগত উচ্চ-ঝুঁকিপূর্ণ অনকোলজিক্যাল মিউটেশন সনাক্ত করতে জিন সিকোয়েন্সিং বিশ্লেষণ (রক্ত বা লালা)।",
      targetArea: "অনকোজেনেটিক ডিএনএ সিকোয়েন্সিং প্যানেল",
      clinicalSignificance: "একবার করার মতো পরীক্ষা। বংশগত ঝুঁকি (স্তনের ক্যান্সারের ৭০-৮০% আজীবন ঝুঁকি পর্যন্ত) সনাক্ত করে এবং সতর্কতামূলক পদক্ষেপ নিতে সাহায্য করে।"
    }
  ]
};

export const localizedAgeGuidelines: Record<Language, AgeGuideline[]> = {
  en: [
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
  ],
  hi: [
    {
      ageGroup: "Ages 20 - 29",
      generalAdvice: "मुख्य रूप से बुनियादी जागरूकता, स्व-परीक्षण और जीवन शैली स्वास्थ्य बनाए रखने पर ध्यान दें। नैदानिक जांच केवल लक्षण संबंधी ट्रिगर्स या वंशानुगत पारिवारिक इतिहास के लिए इंगित की जाती है।",
      recommendations: [
        {
          testId: "bse",
          frequency: "मासिक",
          description: "व्यक्तिगत आधारभूत और विसंगतियों की पहचान करने के लिए नियमित रूप से घर पर स्व-परीक्षण।",
          badgeTone: "primary"
        },
        {
          testId: "cbe",
          frequency: "प्रत्येक 1 - 3 वर्ष",
          description: "सामान्य स्वास्थ्य ऑडिट के दौरान स्त्री रोग विशेषज्ञ द्वारा कार्यालय में शारीरिक जांच की सिफारिश की जाती है।",
          badgeTone: "outline"
        },
        {
          testId: "brca",
          frequency: "यदि उच्च जोखिम (एक बार)",
          description: "केवल तभी इंगित किया जाता है जब कई प्रत्यक्ष रिश्तेदारों (मां/बहन) के पास शुरुआती कैंसर का इतिहास हो।",
          badgeTone: "tertiary"
        }
      ]
    },
    {
      ageGroup: "Ages 30 - 39",
      generalAdvice: "शारीरिक परिवर्तनों में वृद्धि। क्लिनिकल परीक्षा अधिक लगातार की जानी चाहिए। मजबूत पारिवारिक पृष्ठभूमि के लिए आनुवंशिक परामर्श की अत्यधिक सिफारिश की जाती है।",
      recommendations: [
        {
          testId: "bse",
          frequency: "मासिक",
          description: "मासिक धर्म के समान समय चक्र पर हर महीने लगातार स्व-परीक्षण किया जाना चाहिए।",
          badgeTone: "primary"
        },
        {
          testId: "cbe",
          frequency: "प्रत्येक 1 - 3 वर्ष",
          description: "नियमित स्वास्थ्य जांच के दौरान शारीरिक नैदानिक परीक्षाओं को एकीकृत किया जाना चाहिए।",
          badgeTone: "outline"
        },
        {
          testId: "ultrasound",
          frequency: "लक्षण आधारित / निर्देशानुसार",
          description: "ठोस गांठों का पता चलने पर या घने स्तन प्रोफ़ाइल में अतिरिक्त जांच की आवश्यकता होने पर अनुशंसित।",
          badgeTone: "secondary"
        },
        {
          testId: "mri",
          frequency: "सालाना (केवल उच्च जोखिम)",
          description: "सत्यापित BRCA उत्परिवर्तन वाले या अत्यधिक आनुवंशिक जोखिम वाले लोगों के लिए सालाना संकेत दिया गया है।",
          badgeTone: "tertiary"
        }
      ]
    },
    {
      ageGroup: "Ages 40 - 49",
      generalAdvice: "महत्वपूर्ण खिड़की जहां नैदानिक जांच शुरू होनी चाहिए। वार्षिक डिजिटल मैमोग्राफी लाभों के संबंध में अपने चिकित्सक के साथ साझा निर्णय लें।",
      recommendations: [
        {
          testId: "mammogram",
          frequency: "प्रत्येक 1 - 2 वर्ष",
          description: "व्यक्तिगत जोखिम प्रोफ़ाइल और चिकित्सा परामर्श के आधार पर मैमोग्राम शुरू करें।",
          badgeTone: "secondary"
        },
        {
          testId: "cbe",
          frequency: "सालाना",
          description: "एक ऑन्कोलॉजिस्ट या वरिष्ठ चिकित्सक द्वारा आवश्यक वार्षिक नैदानिक जांच परीक्षा।",
          badgeTone: "primary"
        },
        {
          testId: "bse",
          frequency: "मासिक",
          description: "नियमित रूप से मासिक स्व-परीक्षण जारी रखें।",
          badgeTone: "outline"
        }
      ]
    },
    {
      ageGroup: "Ages 50 - 74",
      generalAdvice: "शीर्ष जांच वर्ष। अधिकतम निवारक लाभ और त्वरित गांठ पहचान प्राप्त करने के लिए नियमित रूप से मैमोग्राम किया जाना चाहिए।",
      recommendations: [
        {
          testId: "mammogram",
          frequency: "सालाना / प्रत्येक 2 वर्ष",
          description: "दीर्घकालिक ऑन्कोलॉजिकल मृत्यु दर को कम करने के लिए मुख्य निवारक मैमोग्राफी दृढ़ता से संकेतित है।",
          badgeTone: "primary"
        },
        {
          testId: "cbe",
          frequency: "सालाना",
          description: "आपके नैदानिक विशेषज्ञ द्वारा अनिवार्य वार्षिक इन-ऑफिस शारीरिक जांच।",
          badgeTone: "secondary"
        },
        {
          testId: "bse",
          frequency: "मासिक",
          description: "मासिक शरीर जागरूकता और स्व-परीक्षण बनाए रखें।",
          badgeTone: "outline"
        }
      ]
    },
    {
      ageGroup: "Ages 75+ / High Risk",
      generalAdvice: "केंद्रित देखभाल प्रबंधन। जब तक समग्र स्वास्थ्य मजबूत रहता है और जीवन प्रत्याशा उच्च रहती है, तब तक मैमोग्राम जारी रखें। शारीरिक परिवर्तनों के त्वरित मूल्यांकन पर ध्यान दें।",
      recommendations: [
        {
          testId: "mammogram",
          frequency: "विशेषज्ञ की सलाह पर",
          description: "वैश्विक कल्याण सूचकांकों के आधार पर चिकित्सा विशेषज्ञों द्वारा निर्धारित कस्टम स्क्रीनिंग अंतराल।",
          badgeTone: "outline"
        },
        {
          testId: "mri",
          frequency: "सालाना / लक्षण आधारित",
          description: "सक्रिय निगरानी और उच्च-रिज़ॉल्यूशन टिशू चेकिंग के लिए संकेत दिया गया है।",
          badgeTone: "secondary"
        },
        {
          testId: "bse",
          frequency: "मासिक",
          description: "नियमित व्यक्तिगत जांच और स्व-परीक्षण बनाए रखें।",
          badgeTone: "primary"
        }
      ]
    }
  ],
  mr: [
    {
      ageGroup: "Ages 20 - 29",
      generalAdvice: "प्रामुख्याने शरीराविषयी जागरूकता, स्व-तपासणी आणि निरोगी जीवनशैली राखण्यावर लक्ष केंद्रित करा. केवळ शारीरिक लक्षणे किंवा अनुवांशिक इतिहास असल्यास डॉक्टरांच्या सल्ल्याने तपासणी करा.",
      recommendations: [
        {
          testId: "bse",
          frequency: "दरमहा",
          description: "त्वचेतील बदल किंवा गाठी ओळखण्यासाठी घरी नियमित स्व-तपासणी.",
          badgeTone: "primary"
        },
        {
          testId: "cbe",
          frequency: "प्रत्येक १ - ३ वर्षांनी",
          description: "सर्वसाधारण तपासणीच्या वेळी स्त्रीरोगतज्ञांकडून शारीरिक तपासणी करून घेण्याची शिफारस.",
          badgeTone: "outline"
        },
        {
          testId: "brca",
          frequency: "धोका असल्यास (एकदाच)",
          description: "केवळ आय किंवा बहीण यांना कमी वयात कर्करोग झाल्याचा इतिहास असल्यास शिफारस केली जाते.",
          badgeTone: "tertiary"
        }
      ]
    },
    {
      ageGroup: "Ages 30 - 39",
      generalAdvice: "शरीरातील बदलांचा काळ. दरमहा ठराविक वेळी स्तनाच्या आरोग्याची तपासणी करावी. अनुवांशिक इतिहास असलेल्या महिलांनी डॉक्टरांचा सल्ला नक्की घ्यावा.",
      recommendations: [
        {
          testId: "bse",
          frequency: "दरमहा",
          description: "मासिक पाळीच्या चक्रानुसार दरमहा नियमित स्व-तपासणी करणे गरजेचे.",
          badgeTone: "primary"
        },
        {
          testId: "cbe",
          frequency: "प्रत्येक १ - ३ वर्षांनी",
          description: "सर्वसाधारण आरोग्य तपासणीच्या वेळी डॉक्टरांकडून शारीरिक तपासणी करून घेणे.",
          badgeTone: "outline"
        },
        {
          testId: "ultrasound",
          frequency: "लक्षणे आढळल्यास / सल्ल्यानुसार",
          description: "गाठ आढळल्यास किंवा घट्ट स्तनांच्या ऊतकांच्या तपासणीसाठी डॉक्टरांच्या सल्ल्याने आवश्यक.",
          badgeTone: "secondary"
        },
        {
          testId: "mri",
          frequency: "दरवर्षी (केवळ अति-धोका असल्यास)",
          description: "अनुवांशिक बदल किंवा अति-धोका असलेल्या महिलांसाठी दरवर्षी शिफारस केली जाते.",
          badgeTone: "tertiary"
        }
      ]
    },
    {
      ageGroup: "Ages 40 - 49",
      generalAdvice: "तपासणी सुरू करण्याचा अत्यंत महत्त्वाचा काळ. डॉक्टरांशी चर्चा करून दरवर्षी मॅमोग्राफी चाचणी सुरू करण्याबाबत निर्णय घ्यावा.",
      recommendations: [
        {
          testId: "mammogram",
          frequency: "प्रत्येक १ - २ वर्षांनी",
          description: "जोखीम घटक आणि डॉक्टरांच्या सल्ल्यानुसार मॅमोग्राफी सुरू करावी.",
          badgeTone: "secondary"
        },
        {
          testId: "cbe",
          frequency: "दरवर्षी",
          description: "कर्करोगतज्ञ किंवा वरिष्ठ डॉक्टरांकडून दरवर्षी शारीरिक तपासणी करून घेणे बंधनकारक.",
          badgeTone: "primary"
        },
        {
          testId: "bse",
          frequency: "दरमहा",
          description: "नियमितपणे दरमहा स्व-तपासणी करणे सुरू ठेवावे.",
          badgeTone: "outline"
        }
      ]
    },
    {
      ageGroup: "Ages 50 - 74",
      generalAdvice: "तपासणीचे मुख्य वय. कर्करोग लवकर ओळखण्यासाठी आणि प्रभावी उपचारांसाठी नियमितपणे मॅमोग्राफी चाचणी करणे अत्यंत फायदेशीर आहे.",
      recommendations: [
        {
          testId: "mammogram",
          frequency: "दरवर्षी / २ वर्षांनी",
          description: "कर्करोगामुळे होणारा संभाव्य धोका टाळण्यासाठी नियमित मॅमोग्राफी चाचणी अत्यंत आवश्यक आहे.",
          badgeTone: "primary"
        },
        {
          testId: "cbe",
          frequency: "दरवर्षी",
          description: "तज्ञ डॉक्टरांकडून दरवर्षी शारीरिक तपासणी करणे अनिवार्य.",
          badgeTone: "secondary"
        },
        {
          testId: "bse",
          frequency: "दरमहा",
          description: "दरमहा शरीराची स्व-तपासणी करणे सुरू ठेवावे.",
          badgeTone: "outline"
        }
      ]
    },
    {
      ageGroup: "Ages 75+ / High Risk",
      generalAdvice: "काळजीपूर्वक व्यवस्थापन. आरोग्य उत्तम असेपर्यंत डॉक्टरांच्या सल्ल्याने मॅमोग्राफी सुरू ठेवावी. शारीरिक बदलांवर विशेष लक्ष द्यावे.",
      recommendations: [
        {
          testId: "mammogram",
          frequency: "तज्ज्ञांच्या सल्ल्यानुसार",
          description: "डॉक्टरांनी सुचवलेल्या वेळेनुसार मॅमोग्राफीचे नियोजन करावे.",
          badgeTone: "outline"
        },
        {
          testId: "mri",
          frequency: "दरवर्षी / लक्षणे असल्यास",
          description: "स्तनाच्या आरोग्याची सखोल तपासणी आणि निरीक्षणासाठी आवश्यक चाचणी.",
          badgeTone: "secondary"
        },
        {
          testId: "bse",
          frequency: "दरमहा",
          description: "नियमितपणे दरमहा शरीराची स्व-तपासणी करणे सुरू ठेवावे.",
          badgeTone: "primary"
        }
      ]
    }
  ],
  kn: [
    {
      ageGroup: "Ages 20 - 29",
      generalAdvice: "ಮುಖ್ಯವಾಗಿ ಮೂಲಭೂತ ದೈಹಿಕ ಜಾಗೃತಿ, ಸ್ವಯಂ ತಪಾಸಣೆ ಮತ್ತು ಆರೋಗ್ಯಕರ ಜೀವನಶೈಲಿ ಕಾಯ್ದುಕೊಳ್ಳಲು ಗಮನ ನೀಡಿ. ಕೇವಲ ಲಕ್ಷಣಗಳು ಅಥವಾ ಆನುವಂಶಿಕ ಇತಿಹಾಸವಿದ್ದಾಗ ಮಾತ್ರ ಕ್ಲಿನಿಕಲ್ ತಪಾಸಣೆಯನ್ನು ಸೂಚಿಸಲಾಗುತ್ತದೆ.",
      recommendations: [
        {
          testId: "bse",
          frequency: "ಪ್ರತಿ ತಿಂಗಳು",
          description: "ದಿನನಿತ್ಯದ ದೈಹಿಕ ಬದಲಾವಣೆಗಳು ಮತ್ತು ವ್ಯತ್ಯಾಸಗಳನ್ನು ಗುರುತಿಸಲು ಮನೆಯಲ್ಲಿ ಸ್ವಯಂ ತಪಾಸಣೆ.",
          badgeTone: "primary"
        },
        {
          testId: "cbe",
          frequency: "ಪ್ರತಿ 1 - 3 ವರ್ಷಕ್ಕೊಮ್ಮೆ",
          description: "ಸಾಮಾನ್ಯ ಆರೋಗ್ಯ ತಪಾಸಣೆಯ ಸಮಯದಲ್ಲಿ ಸ್ತ್ರೀರೋಗತಜ್ಞರಿಂದ ದೈಹಿಕ ತಪಾಸಣೆಗೆ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.",
          badgeTone: "outline"
        },
        {
          testId: "brca",
          frequency: "ಹೆಚ್ಚಿನ ಅಪಾಯವಿದ್ದರೆ (ಒಂದು ಬಾರಿ)",
          description: "ತಾಯಿ ಅಥವಾ ಸಹೋದರಿಗೆ ಕಡಿಮೆ ವಯಸ್ಸಿನಲ್ಲಿ ಕ್ಯಾನ್ಸರ್ ಬಂದ ಇತಿಹಾಸವಿದ್ದರೆ ಮಾತ್ರ ಇದನ್ನು ಸೂಚಿಸಲಾಗುತ್ತದೆ.",
          badgeTone: "tertiary"
        }
      ]
    },
    {
      ageGroup: "Ages 30 - 39",
      generalAdvice: "ಹೆಚ್ಚುತ್ತಿರುವ ದೈಹಿಕ ಬದಲಾವಣೆಗಳು. ವೈದ್ಯಕೀಯ ತಪಾಸಣೆಗಳನ್ನು ಹೆಚ್ಚು ನಿಯಮಿತವಾಗಿ ಮಾಡಬೇಕು. ಆನುವಂಶಿಕ ಇತಿಹಾಸ ಹೊಂದಿರುವವರಿಗೆ ಜೆನೆಟಿಕ್ ಕೌನ್ಸೆಲಿಂಗ್ ಅತ್ಯಂತ ಸೂಕ್ತ.",
      recommendations: [
        {
          testId: "bse",
          frequency: "ಪ್ರತಿ ತಿಂಗಳು",
          description: "ಮುಟ್ಟಿನ ಚಕ್ರದ ಅದೇ ಸಮಯದಲ್ಲಿ ಪ್ರತಿ ತಿಂಗಳು ನಿಯಮಿತವಾಗಿ ಸ್ವಯಂ ತಪಾಸಣೆ ಮಾಡುವುದು ಸೂಕ್ತ.",
          badgeTone: "primary"
        },
        {
          testId: "cbe",
          frequency: "ಪ್ರತಿ 1 - 3 ವರ್ಷಕ್ಕೊಮ್ಮೆ",
          description: "ಸಾಮಾನ್ಯ ತಪಾಸಣೆಗಳ ಸಮಯದಲ್ಲಿ ಕ್ಲಿನಿಕಲ್ ಪರೀಕ್ಷೆಗಳನ್ನು ಸೇರಿಸಿಕೊಳ್ಳಬೇಕು.",
          badgeTone: "outline"
        },
        {
          testId: "ultrasound",
          frequency: "ಲಕ್ಷಣಗಳಿದ್ದರೆ / ವೈದ್ಯರ ಸಲಹೆಯಂತೆ",
          description: "ಗಡ್ಡೆಗಳು ಕಂಡುಬಂದಲ್ಲಿ ಅಥವಾ ದಟ್ಟವಾದ ಸ್ತನ ಹೊಂದಿರುವಾಗ ಪೂರಕ ತಪಾಸಣೆಗೆ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.",
          badgeTone: "secondary"
        },
        {
          testId: "mri",
          frequency: "ಪ್ರತಿ ವರ್ಷ (ಹೆಚ್ಚಿನ ಅಪಾಯವಿದ್ದರೆ ಮಾತ್ರ)",
          description: "ಸಾಬೀತಾದ ಜೆನೆಟಿಕ್ ರೂಪಾಂತರಗಳು ಅಥವಾ ಅತಿ ಹೆಚ್ಚು ಅಪಾಯವಿರುವ ಮಹಿಳೆಯರಿಗೆ ಪ್ರತಿ ವರ್ಷ ಸೂಚಿಸಲಾಗುತ್ತದೆ.",
          badgeTone: "tertiary"
        }
      ]
    },
    {
      ageGroup: "Ages 40 - 49",
      generalAdvice: "ಕ್ಲಿನಿಕಲ್ ತಪಾಸಣೆಗಳನ್ನು ಪ್ರಾರಂಭಿಸಲು ಇದು ಅತ್ಯಂತ ಪ್ರಮುಖ ವಯಸ್ಸು. ಪ್ರತಿ ವರ್ಷ ಮ್ಯಾಮೊಗ್ರಫಿ ಮಾಡುವ ಬಗ್ಗೆ ನಿಮ್ಮ ವೈದ್ಯರೊಂದಿಗೆ ಸಮಾಲೋಚಿಸಿ ನಿರ್ಧರಿಸಿ.",
      recommendations: [
        {
          testId: "mammogram",
          frequency: "ಪ್ರತಿ 1 - 2 ವರ್ಷಕ್ಕೊಮ್ಮೆ",
          description: "ವೈಯಕ್ತಿಕ ಅಪಾಯದ ಮಟ್ಟ ಮತ್ತು ವೈದ್ಯರ ಸಲಹೆಯ ಆಧಾರದ ಮೇಲೆ ಮ್ಯಾಮೊಗ್ರಫಿ ತಪಾಸಣೆ ಪ್ರಾರಂಭಿಸಿ.",
          badgeTone: "secondary"
        },
        {
          testId: "cbe",
          frequency: "ಪ್ರತಿ ವರ್ಷ",
          description: "ತಜ್ಞ ವೈದ್ಯರಿಂದ ಪ್ರತಿ ವರ್ಷ ಮಾಡಬೇಕಾದ ಕಡ್ಡಾಯ ಕ್ಲಿನಿಕಲ್ ದೈಹಿಕ ಪರೀಕ್ಷೆ.",
          badgeTone: "primary"
        },
        {
          testId: "bse",
          frequency: "ಪ್ರತಿ ತಿಂಗಳು",
          description: "ಪ್ರತಿ ತಿಂಗಳು ನಿಯಮಿತವಾಗಿ ಸ್ವಯಂ ಪರೀಕ್ಷೆಯನ್ನು ಮುಂದುವರಿಸಿ.",
          badgeTone: "outline"
        }
      ]
    },
    {
      ageGroup: "Ages 50 - 74",
      generalAdvice: "ನಿಯಮಿತ ತಪಾಸಣೆಯ ಅತ್ಯಂತ ಮುಖ್ಯ ವಯಸ್ಸು. ಕ್ಯಾನ್ಸರ್ ಅನ್ನು ಆರಂಭದಲ್ಲೇ ಪತ್ತೆಹಚ್ಚಲು ಮತ್ತು ಜೀವ ಉಳಿಸಲು ಪ್ರತಿ ವರ್ಷ ಮ್ಯಾಮೊಗ್ರಫಿ ತಪಾಸಣೆ ಮಾಡಬೇಕು.",
      recommendations: [
        {
          testId: "mammogram",
          frequency: "ಪ್ರತಿ ವರ್ಷ / 2 ವರ್ಷಕ್ಕೊಮ್ಮೆ",
          description: "ದೀರ್ಘಕಾಲದ ಕ್ಯಾನ್ಸರ್ ಅಪಾಯವನ್ನು ತಡೆಗಟ್ಟಲು ನಿಯಮಿತ ಮ್ಯಾಮೊಗ್ರಫಿ ತಪಾಸಣೆಯನ್ನು ಹೆಚ್ಚು ಸೂಚಿಸಲಾಗುತ್ತದೆ.",
          badgeTone: "primary"
        },
        {
          testId: "cbe",
          frequency: "ಪ್ರತಿ ವರ್ಷ",
          description: "ತಜ್ಞ ವೈದ್ಯರಿಂದ ಪ್ರತಿ ವರ್ಷ ಮಾಡಬೇಕಾದ ಕಡ್ಡಾಯ ದೈಹಿಕ ತಪಾಸಣೆ.",
          badgeTone: "secondary"
        },
        {
          testId: "bse",
          frequency: "ಪ್ರತಿ ತಿಂಗಳು",
          description: "ಪ್ರತಿ ತಿಂಗಳು ದೈಹಿಕ ಸ್ವಯಂ ತಪಾಸಣೆ ಮುಂದುವರಿಸಿ.",
          badgeTone: "outline"
        }
      ]
    },
    {
      ageGroup: "Ages 75+ / High Risk",
      generalAdvice: "ವಿಶೇಷ ಕಾಳಜಿ ನಿರ್ವಹಣೆ. ದೈಹಿಕ ಆರೋಗ್ಯ ಉತ್ತಮವಾಗಿರುವವರೆಗೆ ವೈದ್ಯರ ಸಲಹೆಯಂತೆ ಮ್ಯಾಮೊಗ್ರಫಿ ಮುಂದುವರಿಸಿ. ದೈಹಿಕ ಬದಲಾವणेಗಳ ಬಗ್ಗೆ ತಕ್ಷಣ ಗಮನಹರಿಸಿ.",
      recommendations: [
        {
          testId: "mammogram",
          frequency: "ತಜ್ಞ ವೈದ್ಯರ ಸಲಹೆಯಂತೆ",
          description: "ವೈದ್ಯರ ಸಲಹೆಯಂತೆ ನಿಯಮಿತ ತಪಾಸಣಾ ಸಮಯಗಳನ್ನು ನಿರ್ಧರಿಸಿ.",
          badgeTone: "outline"
        },
        {
          testId: "mri",
          frequency: "ಪ್ರತಿ ವರ್ಷ / ಲಕ್ಷಣಗಳಿದ್ದರೆ",
          description: "ಸ್ತನದ ಆರೋಗ್ಯದ ಹೆಚ್ಚಿನ ನಿಖರತೆಯ ತಪಾಸಣೆ ಮತ್ತು ಮೇಲ್ವಿಚಾರಣೆಗೆ ಬಳಸಲಾಗುತ್ತದೆ.",
          badgeTone: "secondary"
        },
        {
          testId: "bse",
          frequency: "ಪ್ರತಿ ತಿಂಗಳು",
          description: "ಪ್ರತಿ ತಿಂಗಳು ನಿಯಮಿತ ದೈಹಿಕ ಸ್ವಯಂ ತಪಾಸಣೆ ಮುಂದುವರಿಸಿ.",
          badgeTone: "primary"
        }
      ]
    }
  ],
  bn: [
    {
      ageGroup: "Ages 20 - 29",
      generalAdvice: "প্রাথমিকভাবে নিজের শরীর সম্পর্কে সচেতনতা, স্ব-পরীক্ষা এবং স্বাস্থ্যকর জীবনযাত্রা বজায় রাখার দিকে নজর দিন। লক্ষণ দেখা দিলে বা পারিবারিক ইতিহাস থাকলে চিকিৎসকের পরামর্শ নিন।",
      recommendations: [
        {
          testId: "bse",
          frequency: "মাসিক",
          description: "কোনো অসঙ্গতি বা পরিবর্তন লক্ষ্য করার জন্য বাড়িতে নিয়মিত স্ব-পরীক্ষা করা প্রয়োজন।",
          badgeTone: "primary"
        },
        {
          testId: "cbe",
          frequency: "প্রতি ১ - ৩ বছর অন্তর",
          description: "সাধারণ স্বাস্থ্য পরীক্ষার অংশ হিসেবে চিকিৎসকের দ্বারা স্তন পরীক্ষার পরামর্শ দেওয়া হয়।",
          badgeTone: "outline"
        },
        {
          testId: "brca",
          frequency: "উচ্চ ঝুঁকি থাকলে (একবার)",
          description: "মা বা বোনের কম বয়সে স্তন ক্যান্সারের ইতিহাস থাকলে তবেই এটি নির্দেশিত হয়।",
          badgeTone: "tertiary"
        }
      ]
    },
    {
      ageGroup: "Ages 30 - 39",
      generalAdvice: "শারীরিক পরিবর্তন বৃদ্ধি পাওয়ার সময়। শারীরিক পরীক্ষা আরও নিয়মিত করা উচিত। বংশগত ইতিহাস থাকলে জেনেটিক কাউন্সেলিং করার পরামর্শ দেওয়া হয়।",
      recommendations: [
        {
          testId: "bse",
          frequency: "মাসিক",
          description: "মাসিক চক্রের একই সময়ে প্রতি মাসে নিয়মিত স্ব-পরীক্ষা করা আবশ্যক।",
          badgeTone: "primary"
        },
        {
          testId: "cbe",
          frequency: "প্রতি ১ - ৩ বছর অন্তর",
          description: "সাধারণ স্বাস্থ্য পরীক্ষার সময় চিকিৎসকের দ্বারা স্তন পরীক্ষাকে অন্তর্ভুক্ত করা উচিত।",
          badgeTone: "outline"
        },
        {
          testId: "ultrasound",
          frequency: "লক্ষণ দেখা দিলে / নির্দেশানুসারে",
          description: "স্তনে পিণ্ড ধরা পড়লে বা ঘন স্তন টিস্যুর ক্ষেত্রে অতিরিক্ত পরীক্ষার জন্য প্রস্তাবিত।",
          badgeTone: "secondary"
        },
        {
          testId: "mri",
          frequency: "প্রতি বছর (কেবল উচ্চ ঝুঁকি)",
          description: "মিউটেশন বা বংশগত উচ্চ ঝুঁকি সম্পন্ন নারীদের ক্ষেত্রে প্রতি বছর করার নির্দেশ দেওয়া হয়।",
          badgeTone: "tertiary"
        }
      ]
    },
    {
      ageGroup: "Ages 40 - 49",
      generalAdvice: "নিয়মিত স্তন পরীক্ষা শুরু করার সবচেয়ে গুরুত্বপূর্ণ সময়। প্রতি বছর ম্যামোগ্রাফি পরীক্ষা করার বিষয়ে আপনার চিকিৎসকের সাথে কথা বলুন।",
      recommendations: [
        {
          testId: "mammogram",
          frequency: "প্রতি ১ - ২ বছর অন্তর",
          description: "ব্যক্তিগত ঝুঁকি এবং চিকিৎসকের পরামর্শের ভিত্তিতে ম্যামোগ্রাফি পরীক্ষা শুরু করুন।",
          badgeTone: "secondary"
        },
        {
          testId: "cbe",
          frequency: "প্রতি বছর",
          description: "অনকোলজিস্ট বা বিশেষজ্ঞ চিকিৎসকের দ্বারা প্রতি বছর স্তন পরীক্ষা করানো বাধ্যতামূলক।",
          badgeTone: "primary"
        },
        {
          testId: "bse",
          frequency: "মাসিক",
          description: "নিয়মিতভাবে প্রতি মাসে নিজের স্তন পরীক্ষা করা চালিয়ে যান।",
          badgeTone: "outline"
        }
      ]
    },
    {
      ageGroup: "Ages 50 - 74",
      generalAdvice: "নিয়মিত পরীক্ষার মূল সময়কাল। প্রাথমিক পর্যায়ে ক্যান্সার সনাক্ত করার জন্য নিয়মিত ম্যামোগ্রাফি পরীক্ষা করা অত্যন্ত জরুরি ও উপকারী।",
      recommendations: [
        {
          testId: "mammogram",
          frequency: "প্রতি বছর / ২ বছর অন্তর",
          description: "দীর্ঘমেয়াদী ক্যান্সারের ঝুঁকি এড়ানোর জন্য ম্যামোগ্রাফি পরীক্ষা করার পরামর্শ দেওয়া হয়।",
          badgeTone: "primary"
        },
        {
          testId: "cbe",
          frequency: "প্রতি বছর",
          description: "বিশেষজ্ঞ চিকিৎসকের দ্বারা প্রতি বছর স্তন পরীক্ষা করানো বাধ্যতামূলক।",
          badgeTone: "secondary"
        },
        {
          testId: "bse",
          frequency: "মাসিক",
          description: "প্রতি মাসে স্তন স্ব-পরীক্ষা করা চালিয়ে যান।",
          badgeTone: "outline"
        }
      ]
    },
    {
      ageGroup: "Ages 75+ / High Risk",
      generalAdvice: "বিশেষ যত্ন ও পর্যবেক্ষণ। শারীরিক স্বাস্থ্য ভালো থাকা পর্যন্ত চিকিৎসকের পরামর্শ অনুযায়ী ম্যামোগ্রাফি চালিয়ে যান। যেকোনো পরিবর্তন লক্ষ্য করলে অবিলম্বে জানান।",
      recommendations: [
        {
          testId: "mammogram",
          frequency: "বিশেষজ্ঞের পরামর্শ অনুযায়ী",
          description: "চিকিৎসকের পরামর্শ অনুযায়ী নিয়মিত স্ক্রীনিংয়ের সময়সূচী নির্ধারণ করুন।",
          badgeTone: "outline"
        },
        {
          testId: "mri",
          frequency: "প্রতি বছর / লক্ষণ দেখা দিলে",
          description: "স্তনের স্বাস্থ্য নিখুঁতভাবে পর্যবেক্ষণ এবং পরীক্ষা করার জন্য প্রয়োজনীয় স্ক্যান।",
          badgeTone: "secondary"
        },
        {
          testId: "bse",
          frequency: "মাসিক",
          description: "প্রতি মাসে স্তন স্ব-পরীক্ষা করা চালিয়ে যান।",
          badgeTone: "primary"
        }
      ]
    }
  ]
};

export const localizedAreaCostMultiplier: Record<Language, Record<AreaTier, { name: string; description: string }>> = {
  en: {
    tier1: {
      name: "Metro / Tier 1 (Mumbai, Delhi, Bangalore, Chennai, etc.)",
      description: "Major metropolitan cities with population above 4 million. High concentration of state-of-the-art super-specialty hospitals and oncology labs."
    },
    tier2: {
      name: "Tier 2 Cities (Pune, Jaipur, Lucknow, Kochi, Indore, etc.)",
      description: "Rapidly growing urban centers and state capitals with population between 1 million and 4 million. Excellent multi-specialty regional hospital chains available."
    },
    tier3: {
      name: "Tier 3 Cities / Rural Areas (Districts & Community Health)",
      description: "Towns and rural areas with population below 1 million. Screenings are often subsidized at government district hospitals, taluka centers, and NGO camps."
    }
  },
  hi: {
    tier1: {
      name: "मेट्रो / टियर 1 (मुंबई, दिल्ली, बैंगलोर, चेन्नई, आदि)",
      description: "4 मिलियन से अधिक आबादी वाले प्रमुख महानगरीय शहर। अत्याधुनिक सुपर-स्पेशलिटी अस्पतालों और ऑन्कोलॉजी प्रयोगशालाओं का उच्च संकेंद्रण।"
    },
    tier2: {
      name: "टियर 2 शहर (पुणे, जयपुर, लखनऊ, कोच्चि, इंदौर, आदि)",
      description: "तेजी से बढ़ते शहरी केंद्र और 1 मिलियन से 4 मिलियन के बीच की आबादी वाले राज्यों की राजधानियां। उत्कृष्ट मल्टी-स्पेशलिटी क्षेत्रीय अस्पताल श्रृंखलाएं उपलब्ध हैं।"
    },
    tier3: {
      name: "टियर 3 शहर / ग्रामीण क्षेत्र (जिले और सामुदायिक स्वास्थ्य)",
      description: "1 मिलियन से कम आबादी वाले शहर और ग्रामीण क्षेत्र। सरकारी जिला अस्पतालों, तालुका केंद्रों और गैर सरकारी संगठनों के शिविरों में स्क्रीनिंग पर अक्सर सब्सिडी दी जाती है।"
    }
  },
  mr: {
    tier1: {
      name: "मेट्रो / टियर १ (मुंबई, दिल्ली, बंगळुरू, चेन्नई, इत्यादी)",
      description: "४ दशलक्षाहून अधिक लोकसंख्या असलेली प्रमुख शहरे. अत्याधुनिक कर्करोग रुग्णालये आणि प्रयोगशाळांची उपलब्धता."
    },
    tier2: {
      name: "टियर २ शहरे (पुणे, जयपूर, लखनऊ, कोची, इंदूर, इत्यादी)",
      description: "१ दशलक्ष ते ४ दशलक्ष लोकसंख्या असलेली वेगाने वाढणारी शहरे. उत्कृष्ट प्रादेशिक रुग्णालय साखळी उपलब्ध."
    },
    tier3: {
      name: "टियर ३ शहरे / ग्रामीण भाग (जिल्हे आणि समुदाय आरोग्य)",
      description: "१ दशलक्ष पेक्षा कमी लोकसंख्या असलेली शहरे आणि ग्रामीण भाग. सरकारी रुग्णालय, प्राथमिक आरोग्य केंद्र किंवा शिबिरांमध्ये चाचण्यांसाठी सवलत."
    }
  },
  kn: {
    tier1: {
      name: "ಮೆಟ್ರೋ / ಟಯರ್ 1 (ಮುಂಬೈ, ದೆಹಲಿ, ಬೆಂಗಳೂರು, ಚೆನ್ನೈ, ಇತ್ಯಾದಿ)",
      description: "೪ ದಶಲಕ್ಷಕ್ಕೂ ಹೆಚ್ಚು ಜನಸಂಖ್ಯೆ ಹೊಂದಿರುವ ಪ್ರಮುಖ ನಗರಗಳು. ಸುಧಾರಿತ ಸೂಪರ್-ಸ್ಪೆಷಾಲಿಟಿ ಆಸ್ಪತ್ರೆಗಳು ಮತ್ತು ಲ್ಯಾಬ್‌ಗಳ ಹೆಚ್ಚಿನ ಸಾಂದ್ರತೆ."
    },
    tier2: {
      name: "ಟಯರ್ 2 ನಗರಗಳು (ಪುಣೆ, ಜೈಪುರ, ಲಕ್ನೋ, ಕೊಚ್ಚಿ, ಇಂದೋರ್, ಇತ್ಯಾದಿ)",
      description: "೧ ರಿಂದ ೪ ದಶಲಕ್ಷದಷ್ಟು ಜನಸಂಖ್ಯೆ ಹೊಂದಿರುವ ವೇಗವಾಗಿ ಬೆಳೆಯುತ್ತಿರುವ ನಗರಗಳು. ಉತ್ತಮ ಪ್ರಾದೇಶಿಕ ಮಲ್ಟಿ-ಸ್ಪೆಷಾಲಿಟಿ ಆಸ್ಪತ್ರೆಗಳು ಲಭ್ಯವಿವೆ."
    },
    tier3: {
      name: "ಟಯರ್ 3 ನಗರಗಳು / ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳು (ಜಿಲ್ಲೆಗಳು ಮತ್ತು ಸಮುದಾಯ ಆರೋಗ್ಯ)",
      description: "೧ ದಶಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ಜನಸಂಖ್ಯೆ ಹೊಂದಿರುವ ಪಟ್ಟಣಗಳು. ಸರ್ಕಾರಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆಗಳು, ತಾಲೂಕು ಕೇಂದ್ರಗಳು ಮತ್ತು ಎನ್‌ಜಿಒ ಶಿಬಿರಗಳಲ್ಲಿ ಉಚಿತ ಅಥವಾ ಸಬ್ಸಿಡಿ ತಪಾಸಣೆ."
    }
  },
  bn: {
    tier1: {
      name: "মেট্রো / টিয়ার ১ (মুম্বই, দিল্লি, বেঙ্গালুরু, চেন্নাই, ইত্যাদি)",
      description: "৪০ লক্ষের বেশি জনসংখ্যা বিশিষ্ট প্রধান শহরসমূহ। আধুনিক ক্যান্সার হাসপাতাল ও উন্নত ল্যাবরেটরি সমৃদ্ধ এলাকা।"
    },
    tier2: {
      name: "টিয়ার ২ শহর (পুনে, জয়পুর, লখনউ, কোচি, ইন্দোর, ইত্যাদি)",
      description: "১০ থেকে ৪০ লক্ষের মাঝারি জনসংখ্যা বিশিষ্ট শহর ও রাজ্যের রাজধানীসমূহ। উন্নত মানের হাসপাতাল চেইন বিদ্যমান।"
    },
    tier3: {
      name: "টিয়ার ৩ শহর / গ্রামীণ এলাকা (জেলা ও স্বাস্থ্য কেন্দ্র)",
      description: "১০ লক্ষের কম জনসংখ্যা বিশিষ্ট এলাকা। সরকারি জেলা হাসপাতাল, ব্লক প্রাথমিক স্বাস্থ্য কেন্দ্র এবং এনজিও শিবিরে স্ক্রীনিংয়েহ ভর্তুকি মিলতে পারে।"
    }
  }
};

export const localizedMatchedSchemes: Record<Language, { title: string; coverage: string; details: string; eligibility: string; icon: string; }[]> = {
  en: [
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
  ],
  hi: [
    {
      title: "आयुष्मान भारत PM-JAY (स्तन कैंसर स्क्रीनिंग पैक)",
      coverage: "प्रति परिवार प्रति वर्ष ₹5,00,000 तक",
      details: "पैनलबद्ध अस्पतालों में गहरी नैदानिक प्रक्रियाओं, विशेष शल्य चिकित्सा मास्टेक्टॉमी पैकेज, ऊतक बायोप्सी, कीमोथेरेपी प्रोटोकॉल और चिकित्सा अनुवर्ती जांच को कवर करता है।",
      eligibility: "एसईसीसी डेटाबेस लिस्टिंग, कम आय वाले परिवार और विशिष्ट ग्रामीण श्रेणी कल्याण कार्ड धारक।",
      icon: "account_balance"
    },
    {
      title: "राष्ट्रीय आरोग्य निधि (RAN) कैंसर उपचार कोष",
      coverage: "एक बार का वित्तीय अनुदान ₹15,00,000 तक",
      details: "सुपर-स्पेशलिटी केंद्रीय सरकारी अस्पतालों में महत्वपूर्ण कैंसर स्क्रीनिंग, बायोप्सी, स्कैन और तृतीयक उपचार के लिए तत्काल वित्तीय सहायता प्रदान करता है।",
      eligibility: "अग्रणी सार्वजनिक स्वास्थ्य संस्थानों में उपचार प्राप्त करने वाले गरीबी रेखा से नीचे (बीपीएल) रहने वाले रोगी।",
      icon: "health_and_safety"
    },
    {
      title: "कैंसर, मधुमेह, हृदय रोग और स्ट्रोक की रोकथाम के लिए राष्ट्रीय कार्यक्रम (NPCDCS)",
      coverage: "प्राथमिक केंद्रों में निःशुल्क निदान और जांच",
      details: "विकेंद्रीकृत नैदानिक स्क्रीनिंग शिविरों को शक्ति प्रदान करता है। ग्रामीण सामुदायिक स्वास्थ्य केंद्रों और जिला स्तरीय कल्याण क्लीनिकों में मुफ्त सीबीई और मैमोग्राफी मार्गदर्शन जांच प्रदान करता है।",
      eligibility: "सार्वभौमिक भारतीय नागरिक, 30-65 वर्ष की आयु की महिलाओं को प्राथमिकता।",
      icon: "volunteer_activism"
    }
  ],
  mr: [
    {
      title: "आयुष्मान भारत PM-JAY (स्तन कर्करोग तपासणी योजना)",
      coverage: "प्रति कुटुंब प्रति वर्ष ₹५,००,००० पर्यंत",
      details: "पॅनेलवरील रुग्णालयांमध्ये सखोल तपासणी, शस्त्रक्रिया (मॅस्टेक्टॉमी), बायोप्सी, केमोथेरपीचे डोस आणि फॉलो-अप तपासणी मोफत समाविष्ट करते.",
      eligibility: "SECC यादीतील कुटुंबांना, कमी उत्पन्न गटातील कुटुंबांना आणि ग्रामीण भागातील आरोग्य कार्ड धारकांना उपलब्ध.",
      icon: "account_balance"
    },
    {
      title: "राष्ट्रीय आरोग्य निधी (RAN) कर्करोग उपचार निधी",
      coverage: "कमाल ₹१५,००,००० पर्यंत एकवेळचे आर्थिक सहाय्य",
      details: "सरकारी सुपर-स्पेशालिटी रुग्णालयांमध्ये कर्करोग निदान, बायोप्सी, स्कॅन्स आणि पुढील उपचाऱ्यांसाठी तात्काळ आर्थिक मदत पुरवते.",
      eligibility: "प्रीमियर सरकारी रुग्णालयात उपचार घेत असलेले दारिद्र्यरेषेखालील (BPL) रुग्ण.",
      icon: "health_and_safety"
    },
    {
      title: "कर्करोग, मधुमेह आणि हृदयविकार प्रतिबंधात्मक राष्ट्रीय कार्यक्रम (NPCDCS)",
      coverage: "प्राथमिक आरोग्य केंद्रांमध्ये मोफत तपासणी",
      details: "ग्रामीण भागात आणि जिल्हा रुग्णालयांमध्ये मोफत कर्करोग तपासणी शिबिरे आयोजित केली जातात. यात मोफत शारीरिक तपासणी आणि मॅमोग्राफी केली जाते.",
      eligibility: "सर्व भारतीय नागरिक, ३० ते ६५ वयोगटातील महिलांना प्राधान्य.",
      icon: "volunteer_activism"
    }
  ],
  kn: [
    {
      title: "ಆಯುಷ್ಮಾನ್ ಭಾರತ್ PM-JAY (ಸ್ತನ ಕ್ಯಾನ್ಸರ್ ಸ್ಕ್ರೀನಿಂಗ್ ಪ್ಯಾಕ್)",
      coverage: "ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೆ ವರ್ಷಕ್ಕೆ ₹೫,೦೦,೦೦೦ ರವರೆಗೆ",
      details: "ನೋಂದಾಯಿತ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ಆಳವಾದ ರೋಗನಿರ್ಣಯ ವಿಧಾನಗಳು, ವಿಶೇಷ ಶಸ್ತ್ರಚಿಕಿತ್ಸಾ ಮ್ಯಾಸ್ಟೆಕ್ಟಮಿ ಪ್ಯಾಕೇಜ್‌ಗಳು, ಅಂಗಾಂಶ ಬಯಾಪ್ಸಿ, ಕೀಮೋಥೆರಪಿ ಮತ್ತು ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆಗಳನ್ನು ಒಳಗೊಳ್ಳುತ್ತದೆ.",
      eligibility: "SECC ಡೇಟಾಬೇಸ್ ಪಟ್ಟಿಗಳು, ಕಡಿಮೆ ಆದಾಯದ ಕುಟುಂಬಗಳು ಮತ್ತು ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಹೊಂದಿರುವವರು.",
      icon: "account_balance"
    },
    {
      title: "ರಾಷ್ಟ್ರೀಯ ಆರೋಗ್ಯ ನಿಧಿ (RAN) ಕ್ಯಾನ್ಸರ್ ಚಿಕಿತ್ಸಾ ನಿಧಿ",
      coverage: "₹೧೫,೦೦,೦೦೦ ರವರೆಗೆ ಒಂದು ಬಾರಿಯ ಆರ್ಥಿಕ ಸಹಾಯ",
      details: "ಪ್ರಮುಖ ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ಸಂಸ್ಥೆಗಳಲ್ಲಿ ಕ್ಯಾನ್ಸರ್ ಸ್ಕ್ರೀನಿಂಗ್‌ಗಳು, ಬಯಾಪ್ಸಿಗಳು, ಸ್ಕ್ಯಾನ್‌ಗಳು ಮತ್ತು ಚಿಕಿತ್ಸೆಗಳಿಗೆ ತುರ್ತು ಆರ್ಥಿಕ ಸಹಾಯವನ್ನು ಒದಗಿಸುತ್ತದೆ.",
      eligibility: "ದರಿದ್ರ ರೇಖೆಗಿಂತ ಕೆಳಗಿರುವ (BPL) ರೋಗಿಗಳು ಪ್ರಮುಖ ಸಾರ್ವಜನಿಕ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ಚಿಕಿತ್ಸೆ ಪಡೆಯುತ್ತಿರುವಾಗ.",
      icon: "health_and_safety"
    },
    {
      title: "ಕ್ಯಾನ್ಸರ್, ಮಧುಮೇಹ ಮತ್ತು ಹೃದಯರೋಗ ತಡೆಗಟ್ಟುವ ರಾಷ್ಟ್ರೀಯ ಕಾರ್ಯಕ್ರಮ (NPCDCS)",
      coverage: "ಪ್ರಾಥಮಿಕ ಕೇಂದ್ರಗಳಲ್ಲಿ ಉಚಿತ ರೋಗನಿರ್ಣಯ ಮತ್ತು ತಪಾಸಣೆ",
      details: "ಗ್ರಾಮೀಣ ಸಮುದಾಯ ಆರೋಗ್ಯ ಕೇಂದ್ರಗಳು ochu ಜಿಲ್ಲಾ ಮಟ್ಟದ ಚಿಕಿತ್ಸಾಲಯಗಳಲ್ಲಿ ಉಚಿತ ಸ್ತನ ಪರೀಕ್ಷೆ ಮತ್ತು ಮ್ಯಾಮೊಗ್ರಫಿ ಮಾರ್ಗದರ್ಶನ ತಪಾಸಣೆಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.",
      eligibility: "ಎಲ್ಲಾ ಭಾರತೀಯ ನಾಗರಿಕರು, ೩೦-೬೫ ವರ್ಷ ವಯಸ್ಸಿನ ಮಹಿಳೆಯರಿಗೆ ಆದ್ಯತೆ.",
      icon: "volunteer_activism"
    }
  ],
  bn: [
    {
      title: "আয়ুষ্মান ভারত PM-JAY (স্তন ক্যান্সার স্ক্রীনিং প্যাক)",
      coverage: "প্রতি পরিবারে প্রতি বছর ₹৫,০০,০০০ পর্যন্ত",
      details: "তালিকাভুক্ত হাসপাতালে গভীর ডায়াগনস্টিক পদ্ধতি, বিশেষ অস্ত্রোপচার ম্যাস্টেক্টমি প্যাকেজ, টিস্যু বায়োপসি, কেমোথেরাপি প্রোটোকল এবং ফলো-আপ পরীক্ষাগুলি কভার করে।",
      eligibility: "SECC ডেটাবেস তালিকাভুক্ত, নিম্ন আয়ের পরিবার এবং গ্রামীণ কল্যাণ কার্ডধারীরা।",
      icon: "account_balance"
    },
    {
      title: "রাষ্ট্রীয় আরোগ্য নিধি (RAN) ক্যান্সার চিকিত্সা তহবিল",
      coverage: "এককালীন আর্থিক অনুদান ₹১৫,০০,০০০ পর্যন্ত",
      details: "শীর্ষস্থানীয় সরকারি হাসপাতালে গুরুত্বপূর্ণ ক্যান্সার স্ক্রীনিং, বায়োপসি, স্ক্যান এবং চিকিৎসার জন্য জরুরি আর্থিক সহায়তা প্রদান করে।",
      eligibility: "দারিদ্র্যসীমার নিচে (BPL) বসবাসকারী রোগীরা যারা শীর্ষস্থানীয় সরকারি স্বাস্থ্য প্রতিষ্ঠানে চিকিৎসা নিচ্ছেন।",
      icon: "health_and_safety"
    },
    {
      title: "ক্যান্সার, ডায়াবেটিস এবং স্ট্রোক প্রতিরোধের জাতীয় কর্মসূচি (NPCDCS)",
      coverage: "প্রাথমিক কেন্দ্রগুলিতে বিনামূল্যে ডায়াগনস্টিকস ও স্ক্রীনিং",
      details: "নিয়মিত ক্যাম্পের মাধ্যমে প্রাথমিক চিকিৎসা ব্যবস্থা ও স্ক্রীনিং করা হয়। গ্রামীণ স্তরে বিনামূল্যে শারীরিক পরীক্ষা ও ম্যামোগ্রাফি করা হয়।",
      eligibility: "সাধারণ ভারতীয় নাগরিক, বিশেষ করে ৩০-৬৫ বছর বয়সী নারীদের অগ্রাধিকার।",
      icon: "volunteer_activism"
    }
  ]
};
