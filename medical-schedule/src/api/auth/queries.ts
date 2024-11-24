import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser, verifyAccount } from "./fetchers";

enum QueryKeys {
  REGISTER = "register",
  LOGIN = "login",
  VERIFY = "verify",
}

const RegisterUser = () => {
  return useMutation({
    mutationKey: [QueryKeys.REGISTER],
    mutationFn: registerUser,
  });
};
const LoginUser = () => {
  return useMutation({
    mutationKey: [QueryKeys.LOGIN],
    mutationFn: loginUser,
  });
};
const VerifyAccount = () => {
  return useMutation({
    mutationKey: [QueryKeys.VERIFY],
    mutationFn: verifyAccount,
  });
};

export { RegisterUser, VerifyAccount, LoginUser };
