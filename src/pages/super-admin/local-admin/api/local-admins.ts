import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@shared/api/http";
import { unwrapBackendData, type BackendEnvelope } from "../../api/response";

export interface LocalAdmin {
  userId: string;
  firstName: string;
  lastName: string;
  contact: string | null;
  email: string;
  verificationStatus: boolean;
  municipalityId: number;
}

interface Page<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface LocationOption {
  id: number;
  nameEn: string;
  nameNp: string;
}

const adminsKey = ["super-admin", "local-admins"] as const;
const locationsKey = ["locations"] as const;

async function listLocalAdmins(pageNumber: number, pageSize: number) {
  const response = await http.get<BackendEnvelope<Page<LocalAdmin>>>("/User/LocalAdmin", { params: { pageNumber, pageSize } });
  return unwrapBackendData(response.data);
}

async function createLocalAdmin(values: { firstName: string; lastName: string; contact: string; email: string; password: string; municipalityId: number }) {
  const response = await http.post<BackendEnvelope<string>>("/User/LocalAdmin", values);
  return unwrapBackendData(response.data);
}

async function listLocations(path: string) {
  const response = await http.get<BackendEnvelope<LocationOption[]>>(path);
  return unwrapBackendData(response.data);
}

export function useLocalAdmins(pageNumber = 1, pageSize = 10) {
  return useQuery({ queryKey: [...adminsKey, pageNumber, pageSize], queryFn: () => listLocalAdmins(pageNumber, pageSize) });
}

export function useCreateLocalAdmin() {
  const client = useQueryClient();
  return useMutation({ mutationFn: createLocalAdmin, onSuccess: () => client.invalidateQueries({ queryKey: adminsKey }) });
}

export function useProvinces() {
  return useQuery({ queryKey: [...locationsKey, "provinces"], queryFn: () => listLocations("/Location/Provinces") });
}

export function useDistricts(provinceId: number | null) {
  return useQuery({ queryKey: [...locationsKey, "districts", provinceId], enabled: provinceId !== null, queryFn: () => listLocations(`/Location/Provinces/${provinceId}/Districts`) });
}

export function useMunicipalities(districtId: number | null) {
  return useQuery({ queryKey: [...locationsKey, "municipalities", districtId], enabled: districtId !== null, queryFn: () => listLocations(`/Location/Districts/${districtId}/Municipalities`) });
}
