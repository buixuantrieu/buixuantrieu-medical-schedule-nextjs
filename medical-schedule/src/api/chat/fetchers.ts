import { publicClient } from "@/lib/axios";

export const fetchMessageDetail = async (senderId: string, receiverId: string) => {
  const response = await publicClient.get("/chat/detail", {
    params: {
      senderId,
      receiverId,
    },
  });
  return response.data;
};
