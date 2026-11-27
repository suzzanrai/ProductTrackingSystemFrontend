import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@shared/api/http";
import { unwrapBackendData, type BackendEnvelope } from "../../api/response";

export interface UnitCategory {
  id: string;
  nameEn: string;
  nameNp: string;
  description: string | null;
  createdAt?: string;
}

export interface MaterialUnit {
  id: string;
  nameEn: string;
  nameNp: string;
  abbreviation: string;
  unitCategoryId: string;
  unitCategoryNameEn?: string;
  unitCategoryNameNp?: string;
  createdAt?: string;
}

export interface MaterialUnitWrite {
  nameEn: string;
  nameNp: string;
  abbreviation: string;
  unitCategoryId: string;
}

const unitsQueryKey = ["super-admin", "units"] as const;
const unitCategoriesQueryKey = ["super-admin", "unit-categories"] as const;

async function getUnits(): Promise<MaterialUnit[]> {
  const response = await http.get<BackendEnvelope<MaterialUnit[]>>("/Unit");
  return unwrapBackendData(response.data);
}

async function getUnitCategories(): Promise<UnitCategory[]> {
  const response = await http.get<BackendEnvelope<UnitCategory[]>>(
    "/MaterialUnitCategory",
  );
  return unwrapBackendData(response.data);
}

async function createUnit(values: MaterialUnitWrite): Promise<string> {
  const response = await http.post<BackendEnvelope<string>>("/Unit", values);
  return unwrapBackendData(response.data);
}

async function updateUnit({
  id,
  values,
}: {
  id: string;
  values: MaterialUnitWrite;
}): Promise<void> {
  await http.put(`/Unit/${encodeURIComponent(id)}`, values);
}

async function deleteUnit(id: string): Promise<void> {
  await http.delete(`/Unit/${encodeURIComponent(id)}`);
}

export function useUnits() {
  return useQuery({ queryKey: unitsQueryKey, queryFn: getUnits });
}

export function useUnitCategories() {
  return useQuery({
    queryKey: unitCategoriesQueryKey,
    queryFn: getUnitCategories,
  });
}

export function useCreateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUnit,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: unitsQueryKey }),
        queryClient.invalidateQueries({
          queryKey: ["super-admin", "materials"],
        }),
      ]),
  });
}

export function useUpdateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUnit,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: unitsQueryKey }),
        queryClient.invalidateQueries({
          queryKey: ["super-admin", "materials"],
        }),
      ]),
  });
}

export function useDeleteUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUnit,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: unitsQueryKey }),
        queryClient.invalidateQueries({
          queryKey: ["super-admin", "materials"],
        }),
      ]),
  });
}
