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
      verification: "Verification",
    },
  },
  roleSelect: {
    title: "Choose your role",
    subtitle: "This sets up the right tools and ledgers for your workflow.",
    label: "Operational Role",
    needsApproval: "Needs approval",
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
};
