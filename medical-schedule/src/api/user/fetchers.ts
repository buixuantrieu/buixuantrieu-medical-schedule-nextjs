import { publicClient } from "@/lib/axios";

export const fetchAccount = async (email: string) => {
  const response = await publicClient.get("/user", {
    params: {
      email,
    },
  });
  return response.data;
};
