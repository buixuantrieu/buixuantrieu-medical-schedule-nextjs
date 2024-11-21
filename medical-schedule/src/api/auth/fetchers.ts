import { publicClient } from "@/lib/axios";
import { IRegister } from "./type";

export const registerUser = async (data: IRegister) => {
  const response = await publicClient.post("/auth/register", data);
  return response.data;
};
