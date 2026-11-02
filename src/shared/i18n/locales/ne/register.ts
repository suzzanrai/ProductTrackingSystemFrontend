import type { enRegister } from "../en/register";

export const neRegister: typeof enRegister = {
  auth: {
    login: "लगइन गर्नुहोस्",
    createAccount: "खाता खोल्नुहोस्",
    chooseRole: "आफ्नो भूमिका छान्नुहोस्",
    locationSecurity: "ठेगाना र सुरक्षा",
  },
  registration: {
    progress: "दर्ता प्रगति",
    steps: {
      account: "खाता विवरण",
      role: "भूमिका चयन",
      verification: "खाता सुरक्षा",
    },
  },
  roleSelect: {
    title: "आफ्नो भूमिका छान्नुहोस्",
    subtitle: "यसले तपाईंको आवश्यकता अनुसारका उपकरणहरू उपलब्ध गराउँछ।",
    label: "कार्यगत भूमिका",
    ledgerNote:
      "तपाईंको प्रमाणित लेजर पोर्टल र मोबाइल संकलन प्रणाली कन्फिगर गर्दछ।",
    roles: {
      farmer: {
        title: "किसान",
        description: "आफ्नो बाली र आपूर्ति विवरण साझा गर्नुहोस्।",
      },
      collector: {
        title: "संकलक",
        description:
          "किसानहरूबाट उत्पादन संकलन गरी कारखानामा ढुवानी गर्नुहोस्।",
      },
      factory: {
        title: "कारखाना प्रशासक",
        description:
          "आफ्नो कारखाना, ब्याच र क्यूआर कोडहरू व्यवस्थापन गर्नुहोस्।",
      },
      wholesaler: {
        title: "थोक विक्रेता",
        description: "थोक रूपमा उत्पादनहरू प्राप्त र वितरण गर्नुहोस्।",
      },
      retailer: {
        title: "खुद्रा विक्रेता",
        description: "उत्पादनहरू प्राप्त गरी ग्राहकहरूलाई बिक्री गर्नुहोस्।",
      },
      consumer: {
        title: "उपभोक्ता",
        description: "तपाईंका उत्पादनहरू कहाँबाट आएका हुन् जाँच गर्नुहोस्।",
      },
    },
  },
  registrationDetails: {
    roleLabel: "भूमिका:",
    editRole: "परिवर्तन",
    title: "आफ्नो खाता बनाउनुहोस्",
    subtitle:
      "अंग्रेजी र नेपालीमा आफ्नो नाम, सम्पर्क विवरण र सुरक्षित पासवर्ड प्रविष्ट गर्नुहोस्।",
    englishName: "अंग्रेजीमा नाम",
    englishNamePlaceholder: "अंग्रेजीमा आफ्नो नाम लेख्नुहोस्",
    nepaliName: "नेपालीमा नाम",
    nepaliNamePlaceholder: "नेपालीमा आफ्नो नाम लेख्नुहोस्",
    contactNumber: "सम्पर्क नम्बर",
    contactNumberPlaceholder: "+९७७ ९८XXXXXXXX",
    email: "इमेल ठेगाना",
    emailPlaceholder: "name@example.com",
    emailRule: "मान्य इमेल ठेगाना लेख्नुहोस्।",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड पुष्टि गर्नुहोस्",
    passwordsMatch: "पासवर्डहरू मिलेका छन्",
    back: "पछाडि",
    submit: "खाता खोल्नुहोस्",
    submitting: "खाता बनाउँदै...",
    registrationSuccess: "तपाईंको दर्ता सफलतापूर्वक पठाइयो।",
    registrationFailed: "दर्ता असफल भयो। कृपया फेरि प्रयास गर्नुहोस्।",
    securityTitle: "तपाईंको खाता सुरक्षा महत्त्वपूर्ण छ",
    securityNote:
      "आफ्नो खाता सुरक्षित राख्न बलियो र अरू खातामा प्रयोग नगरेको पासवर्ड राख्नुहोस्। तपाईंका सम्पर्क विवरण खाता पहुँच र सम्पर्कका लागि प्रयोग हुनेछन्।",
    securityNoticeLabel: "सुरक्षा र गोपनीयता सूचना",
    copyright: "© २०२५ TraceNepal",
    collaboration: "कृषि तथा पशुपन्छी विकास मन्त्रालयको सहकार्य",
    terms: "सर्तहरू",
    privacy: "गोपनीयता",
    support: "सहायता",
    required: "यो विवरण आवश्यक छ।",
    passwordMismatch: "पासवर्डहरू मेल खाँदैनन्।",
  },
};
