import { publicClient } from "@/lib/axios";
import { ILogin, IRegister } from "./type";

export const registerUser = async (data: IRegister) => {
  const response = await publicClient.post("/auth/register", data);
  return response.data;
};
export const loginUser = async (data: ILogin) => {
  const response = await publicClient.post("/auth/login", data);
  return response.data;
};
export const verifyAccount = async (email: string) => {
  return await publicClient.post("/auth/verify", { email });
};
export const fetchAccount = async (email: string) => {
  const response = await publicClient.post("/user", email);
  return response.data;
};
