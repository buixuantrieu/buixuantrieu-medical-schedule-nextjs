import { useQuery } from "@tanstack/react-query";
import { fetchMessageDetail } from "./fetchers";

const useGetMessageDetail = (senderId: string, receiverId: string) => {
  return useQuery({
    queryKey: [senderId, receiverId],
    queryFn: () => fetchMessageDetail(senderId, receiverId),
  });
};

export { useGetMessageDetail };
