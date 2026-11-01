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
      verification: "प्रमाणीकरण",
    },
  },
  roleSelect: {
    title: "आफ्नो भूमिका छान्नुहोस्",
    subtitle: "यसले तपाईंको आवश्यकता अनुसारका उपकरणहरू उपलब्ध गराउँछ।",
    label: "कार्यगत भूमिका",
    needsApproval: "स्वीकृति आवश्यक",
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
};
