import { httpClient, publicClient } from "@/lib/axios";
import { ISpecialtyCreate, IUpdateSpecialty } from "./type";

export const createSpecialty = async (data: ISpecialtyCreate) => {
  const response = await httpClient.post("/specialty", data);
  return response.data;
};
export const fetchSpecialty = async () => {
  const response = await publicClient.get("/specialty");
  return response.data;
};
export const updateSpecialty = async (data: IUpdateSpecialty) => {
  const response = await httpClient.put(`/specialty/${data.id}`, data);
  return response.data;
};
export const deleteSpecialty = async (id: number) => {
  const response = await httpClient.delete(`/specialty/${id}`);
  return response.data;
};
