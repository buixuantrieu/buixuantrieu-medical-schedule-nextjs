import { useMutation, useQuery } from "@tanstack/react-query";
import { registerUser, verifyAccount } from "./fetchers";

enum QueryKeys {
  REGISTER = "register",
  VERIFY = "verify",
}

const RegisterUser = () => {
  return useMutation({
    mutationKey: [QueryKeys.REGISTER],
    mutationFn: registerUser,
  });
};
const VerifyAccount = () => {
  return useMutation({
    mutationKey: [QueryKeys.VERIFY],
    mutationFn: verifyAccount,
  });
};

export { RegisterUser, VerifyAccount };
