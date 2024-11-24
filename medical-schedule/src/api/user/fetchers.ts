import { publicClient, httpClient } from "@/lib/axios";

export const fetchAccount = async (email: string) => {
  const response = await publicClient.get("/user", {
    params: {
      email,
    },
  });
  return response.data;
};
export const fetchUserInfo = async () => {
  const response = await httpClient.get("/user/user-info");
  return response.data;
};
