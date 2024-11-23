import { useQuery } from "@tanstack/react-query";
import { fetchAccount } from "./fetchers";

enum QueryKeys {
  GET_USER = "get-user",
}
const useFetchUser = (email: string) =>
  useQuery({
    queryKey: [QueryKeys.GET_USER, email],
    queryFn: () => fetchAccount(email),
    enabled: !!email,
    retry: false,
  });

export { useFetchUser };
