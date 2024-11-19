import { publicClient } from "@/lib/axios";

export const registerUser = async ({ userName, password }: { userName: string; password: string }) => {
  const response = await publicClient.post("/auth/register", { userName, password });
  return response.data;
};
