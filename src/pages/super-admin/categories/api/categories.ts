import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@shared/api/http";
import { unwrapBackendData, type BackendEnvelope } from "../../api/response";

export interface MaterialCategory {
  id: string;
  nameEn: string;
  nameNp: string;
  code: string | null;
  description: string | null;
  parentCategoryId: string | null;
  parentCategoryNameEn?: string | null;
  parentCategoryNameNp?: string | null;
  createdAt?: string;
}

export interface MaterialCategoryWrite {
  nameEn: string;
  nameNp: string;
  code: string | null;
  description: string | null;
  parentCategoryId: string | null;
}

const queryKey = ["super-admin", "material-categories"] as const;

async function getMaterialCategories(): Promise<MaterialCategory[]> {
  const response = await http.get<BackendEnvelope<MaterialCategory[]>>(
    "/MaterialCategory",
  );
  return unwrapBackendData(response.data);
}

async function createMaterialCategory(
  values: MaterialCategoryWrite,
): Promise<string> {
  const response = await http.post<BackendEnvelope<string>>(
    "/MaterialCategory",
    values,
  );
  return unwrapBackendData(response.data);
}

async function updateMaterialCategory({
  id,
  values,
}: {
  id: string;
  values: MaterialCategoryWrite;
}): Promise<void> {
  await http.put(`/MaterialCategory/${encodeURIComponent(id)}`, values);
}

async function deleteMaterialCategory(id: string): Promise<void> {
  await http.delete(`/MaterialCategory/${encodeURIComponent(id)}`);
}

export function useMaterialCategories() {
  return useQuery({ queryKey, queryFn: getMaterialCategories });
}

export function useCreateMaterialCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMaterialCategory,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey }),
        queryClient.invalidateQueries({ queryKey: ["super-admin", "materials"] }),
      ]),
  });
}

export function useUpdateMaterialCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMaterialCategory,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey }),
        queryClient.invalidateQueries({ queryKey: ["super-admin", "materials"] }),
      ]),
  });
}

export function useDeleteMaterialCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMaterialCategory,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey }),
        queryClient.invalidateQueries({ queryKey: ["super-admin", "materials"] }),
      ]),
  });
}
