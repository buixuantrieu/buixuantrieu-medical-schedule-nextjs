import { useMutation } from "@tanstack/react-query";
import { registerUser } from "./fetchers";

enum QueryKeys {
  REGISTER = "register",
}

const RegisterUser = () => {
  return useMutation({
    mutationKey: [QueryKeys.REGISTER],
    mutationFn: registerUser,
  });
};
export { RegisterUser };
