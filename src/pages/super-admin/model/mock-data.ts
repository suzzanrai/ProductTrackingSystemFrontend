import { create } from "zustand";

// Temporary in-memory preview data; replace this store with API-backed queries and mutations.
export interface MockCategory {
  id: number;
  nameEn: string;
  nameNp: string;
}

export interface MockUnit {
  id: number;
  nameEn: string;
  nameNp: string;
  shortEn: string;
  shortNp: string;
  type: "Weight" | "Volume" | "Count";
}

export interface MockProduct {
  id: number;
  nameEn: string;
  nameNp: string;
  categoryId: number;
  units: string[];
  usedCount: number;
  descEn: string;
  descNp: string;
}

export interface MockAdmin {
  id: number;
  nameEn: string;
  nameNp: string;
  email: string;
  contact?: string;
  province?: string;
  district?: string;
  municipality?: string;
  ward?: string;
  regionEn: string;
  regionNp: string;
  status: "Active" | "Pending invite";
  dateEn: string;
  dateNp: string;
}

export const initialCategories: MockCategory[] = [
  { id: 1, nameEn: "Spices", nameNp: "मसला" },
  { id: 2, nameEn: "Tea", nameNp: "चिया" },
  { id: 3, nameEn: "Dairy", nameNp: "दुग्ध पदार्थ" },
  { id: 4, nameEn: "Honey", nameNp: "मह" },
];

export const initialUnits: MockUnit[] = [
  {
    id: 1,
    nameNp: "किलोग्राम",
    nameEn: "Kilogram",
    shortEn: "kg",
    shortNp: "के.जी.",
    type: "Weight",
  },
  {
    id: 2,
    nameNp: "क्विन्टल",
    nameEn: "Quintal",
    shortEn: "qtl",
    shortNp: "क्वि.",
    type: "Weight",
  },
  {
    id: 3,
    nameNp: "ग्राम",
    nameEn: "Gram",
    shortEn: "g",
    shortNp: "ग्रा.",
    type: "Weight",
  },
  {
    id: 4,
    nameNp: "लिटर",
    nameEn: "Litre",
    shortEn: "L",
    shortNp: "लि.",
    type: "Volume",
  },
  {
    id: 5,
    nameNp: "गोटा",
    nameEn: "Piece",
    shortEn: "pcs",
    shortNp: "गोटा",
    type: "Count",
  },
];

export const initialProducts: MockProduct[] = [
  {
    id: 1,
    nameNp: "अदुवा",
    nameEn: "Ginger",
    categoryId: 1,
    units: ["kg", "qtl"],
    usedCount: 120,
    descEn: "Washed fresh ginger root from hill collection points.",
    descNp: "पहाडी संकलन केन्द्रबाट ल्याइएको सफा ताजा अदुवा।",
  },
  {
    id: 2,
    nameNp: "चिया पात",
    nameEn: "Tea leaf",
    categoryId: 2,
    units: ["kg", "qtl"],
    usedCount: 95,
    descEn: "Orthodox grade two leaves and a bud.",
    descNp: "अर्थोडक्स दुई पात एक सुइरो चिया पत्ती।",
  },
  {
    id: 3,
    nameNp: "दूध",
    nameEn: "Milk",
    categoryId: 3,
    units: ["L"],
    usedCount: 80,
    descEn: "Pasteurized organic dairy farm milk.",
    descNp: "अग्र्यानिक गाईभैंसीको ताजा दूध।",
  },
  {
    id: 4,
    nameNp: "मह",
    nameEn: "Honey",
    categoryId: 4,
    units: ["kg", "g"],
    usedCount: 60,
    descEn: "Wild raw multifloral forest honey.",
    descNp: "प्राकृतिक जंगली ताजा काँचो मह।",
  },
  {
    id: 5,
    nameNp: "बेसार",
    nameEn: "Turmeric",
    categoryId: 1,
    units: ["kg", "qtl", "g"],
    usedCount: 45,
    descEn: "High-curcumin dried yellow turmeric fingers.",
    descNp: "उच्च कुर्कुमिनयुक्त शुद्ध सुकेको बेसार।",
  },
  {
    id: 6,
    nameNp: "अलैंची",
    nameEn: "Cardamom",
    categoryId: 1,
    units: ["kg", "g"],
    usedCount: 30,
    descEn: "Large black cardamom pods premium grade.",
    descNp: "उच्च ग्रेडको ठूलो कालो अलैंची दाना।",
  },
];

export const initialAdmins: MockAdmin[] = [
  {
    id: 1,
    nameEn: "Rajesh Adhikari",
    nameNp: "राजेश अधिकारी",
    email: "rajesh.adhikari@gov.np",
    regionEn: "Ilam Municipality",
    regionNp: "इलाम नगरपालिका",
    status: "Active",
    dateEn: "2024-04-12",
    dateNp: "२०८१-०१-०१",
  },
  {
    id: 2,
    nameEn: "Sunita Shrestha",
    nameNp: "सुनिता श्रेष्ठ",
    email: "sunita.shrestha@gov.np",
    regionEn: "Kavrepalanchok Rural",
    regionNp: "काभ्रेपलाञ्चोक गाउँपालिका",
    status: "Active",
    dateEn: "2024-04-20",
    dateNp: "२०८१-०१-०९",
  },
  {
    id: 3,
    nameEn: "Bikash Thapa",
    nameNp: "बिकास थापा",
    email: "bikash.thapa@gov.np",
    regionEn: "Damak Ward 3",
    regionNp: "दमक वडा नं ३",
    status: "Pending invite",
    dateEn: "2024-05-15",
    dateNp: "२०८१-०२-०२",
  },
  {
    id: 4,
    nameEn: "Kamala Subedi",
    nameNp: "कमला सुवेदी",
    email: "kamala.subedi@gov.np",
    regionEn: "Dhankuta District",
    regionNp: "धनकुटा जिल्ला",
    status: "Active",
    dateEn: "2024-06-01",
    dateNp: "२०८१-०२-१९",
  },
];

interface SuperAdminMockData {
  products: MockProduct[];
  categories: MockCategory[];
  units: MockUnit[];
  admins: MockAdmin[];
  setProducts: (update: (items: MockProduct[]) => MockProduct[]) => void;
  setCategories: (update: (items: MockCategory[]) => MockCategory[]) => void;
  setUnits: (update: (items: MockUnit[]) => MockUnit[]) => void;
  setAdmins: (update: (items: MockAdmin[]) => MockAdmin[]) => void;
}

export const useSuperAdminMockData = create<SuperAdminMockData>((set) => ({
  products: initialProducts,
  categories: initialCategories,
  units: initialUnits,
  admins: initialAdmins,
  setProducts: (update) =>
    set((state) => ({ products: update(state.products) })),
  setCategories: (update) =>
    set((state) => ({ categories: update(state.categories) })),
  setUnits: (update) => set((state) => ({ units: update(state.units) })),
  setAdmins: (update) => set((state) => ({ admins: update(state.admins) })),
}));
