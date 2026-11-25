import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@shared/api/http";
import { unwrapBackendData, type BackendEnvelope } from "../../api/response";

export interface MaterialUnitDetail {
  unitId: string;
  nameEn: string;
  nameNp: string;
  abbreviation: string;
  unitCategoryId: string;
  unitCategoryNameEn: string;
  unitCategoryNameNp: string;
  conversionFactorToBaseUnit: number;
  isBaseUnit: boolean;
}

export interface Material {
  id: string;
  code: string;
  nameEn: string;
  nameNp: string;
  description: string | null;
  isBatchTracked: boolean;
  isSerialTracked: boolean;
  minimumStockLevel: number;
  reorderLevel: number;
  materialCategoryId: string;
  materialCategoryNameEn: string;
  materialCategoryNameNp: string;
  createdAt?: string;
  units: MaterialUnitDetail[];
}

export interface MaterialUnitWrite {
  unitId: string;
  conversionFactorToBaseUnit: number;
  isBaseUnit: boolean;
}

export interface MaterialWrite {
  code: string;
  nameEn: string;
  nameNp: string;
  materialCategoryId: string;
  isBatchTracked: boolean;
  isSerialTracked: boolean;
  minimumStockLevel: number;
  reorderLevel: number;
  description: string;
  units: MaterialUnitWrite[];
}

const queryKey = ["super-admin", "materials"] as const;

async function getMaterials(): Promise<Material[]> {
  const response = await http.get<BackendEnvelope<Material[]>>("/Material");
  return unwrapBackendData(response.data);
}

async function createMaterial(values: MaterialWrite): Promise<string> {
  const response = await http.post<BackendEnvelope<string>>(
    "/Material",
    values,
  );
  return unwrapBackendData(response.data);
}

async function updateMaterial({
  id,
  values,
}: {
  id: string;
  values: MaterialWrite;
}): Promise<void> {
  await http.put(`/Material/${encodeURIComponent(id)}`, values);
}

async function deleteMaterial(id: string): Promise<void> {
  await http.delete(`/Material/${encodeURIComponent(id)}`);
}

export function useMaterials() {
  return useQuery({ queryKey, queryFn: getMaterials });
}

export function useCreateMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMaterial,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey }),
  });
}

export function useUpdateMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMaterial,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey }),
  });
}

export function useDeleteMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMaterial,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey }),
  });
}
