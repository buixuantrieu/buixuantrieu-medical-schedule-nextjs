import { useQuery } from "@tanstack/react-query";
import { fetchAccount, fetchUserInfo } from "./fetchers";

export enum QueryKeys {
  GET_USER = "get-user",
  GET_USER_INFO = "get-user-info",
}
const useFetchUser = (email: string) =>
  useQuery({
    queryKey: [QueryKeys.GET_USER, email],
    queryFn: () => fetchAccount(email),
    enabled: !!email,
    retry: false,
  });

const useGetUserInfo = () =>
  useQuery({
    queryKey: [QueryKeys.GET_USER_INFO],
    queryFn: fetchUserInfo,
    retry: false,
  });

export { useFetchUser, useGetUserInfo };
