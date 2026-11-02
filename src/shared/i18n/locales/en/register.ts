export const enRegister = {
  auth: {
    login: "Log in",
    createAccount: "Create an account",
    chooseRole: "Choose your role",
    locationSecurity: "Location and security",
  },
  registration: {
    progress: "Registration Progress",
    steps: {
      account: "Account details",
      role: "Choose role",
      verification: "Account security",
    },
  },
  roleSelect: {
    title: "Choose your role",
    subtitle: "This sets up the right tools and ledgers for your workflow.",
    label: "Operational Role",
    ledgerNote:
      "Configures your verified ledger portal & mobile recording tools.",
    roles: {
      farmer: {
        title: "Farmer",
        description: "Share your harvest and supply details.",
      },
      collector: {
        title: "Collector",
        description: "Collect produce from farmers and deliver to factories.",
      },
      factory: {
        title: "Factory admin",
        description: "Manage your factory, batches and QR codes.",
      },
      wholesaler: {
        title: "Wholesaler",
        description: "Receive and distribute products in bulk.",
      },
      retailer: {
        title: "Retailer",
        description: "Receive and sell products to customers.",
      },
      consumer: {
        title: "Consumer",
        description: "Check where your products come from.",
      },
    },
  },
  registrationDetails: {
    roleLabel: "Role:",
    editRole: "Edit",
    title: "Create your account",
    subtitle:
      "Enter your name in English and Nepali, contact details, and a secure password.",
    englishName: "Name in English",
    englishNamePlaceholder: "Enter your name in English",
    nepaliName: "Name in Nepali",
    nepaliNamePlaceholder: "Enter your name in Nepali",
    contactNumber: "Contact number",
    contactNumberPlaceholder: "+977 98XXXXXXXX",
    email: "Email address",
    emailPlaceholder: "name@example.com",
    emailRule: "Enter a valid email address.",
    password: "Password",
    confirmPassword: "Confirm password",
    passwordsMatch: "Passwords match",
    back: "Back",
    submit: "Create account",
    securityTitle: "Your account security matters",
    securityNote:
      "Use a strong, unique password to protect your account. Your contact details will be used for account access and communication.",
    securityNoticeLabel: "Security and Privacy Notice",
    copyright: "© 2025 TraceNepal",
    collaboration:
      "Ministry of Agriculture & Livestock Development Collaboration",
    terms: "Terms",
    privacy: "Privacy",
    support: "Support",
    required: "This field is required.",
    passwordMismatch: "Passwords do not match.",
    formValidNotSubmitted:
      "The form passed local validation only. Your registration has not been submitted because the backend API is not connected yet.",
  },
};
