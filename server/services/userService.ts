import prisma from "@lib/prisma";
import { STATUS_USER } from "type/interface";

const fetchUserByEmail = async (email: string) => {
  const result = await prisma.user.findFirst({
    where: {
      email,
      status: STATUS_USER.UNVERIFIED,
    },
  });
  return result;
};
const fetchUserInfo = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  return user;
};

export { fetchUserByEmail, fetchUserInfo };
