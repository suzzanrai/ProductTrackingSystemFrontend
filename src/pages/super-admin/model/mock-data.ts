import { create } from "zustand";

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

const initialAdmins: MockAdmin[] = [
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

interface SuperAdminPreviewData {
  admins: MockAdmin[];
  setAdmins: (update: (items: MockAdmin[]) => MockAdmin[]) => void;
}

export const useSuperAdminMockData = create<SuperAdminPreviewData>((set) => ({
  admins: initialAdmins,
  setAdmins: (update) => set((state) => ({ admins: update(state.admins) })),
}));
