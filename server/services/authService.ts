import prisma from "@lib/prisma";
import { IRegister, ROLE, STATUS_USER } from "type/interface";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import { randomCodeVerify } from "@utils/index";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);

const registerAccount = async (data: IRegister) => {
  const id = uuid();
  const codeVerify = randomCodeVerify();
  const hashPass = bcrypt.hashSync(data.password, salt);
  const codeVerifyExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const result = await prisma.$transaction(async (prisma) => {
    const user = await prisma.user.create({
      data: {
        id,
        roleId: ROLE.USER,
        password: hashPass,
        email: data.email,
        codeVerify,
        codeVerifyExpiresAt,
        status: STATUS_USER.UNVERIFIED,
      },
    });

    await prisma.profile.create({
      data: {
        fullName: data.fullName,
        address: data.address,
        wardId: data.wardId,
        districtId: data.districtId,
        cityId: data.cityId,
        phone: data.phone,
        genre: data.genre,
        userId: user.id,
        birthday: data.birthday,
      },
    });
  });
  return codeVerify;
};

const checkExitEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (user) {
    return true;
  }
  return false;
};

const verifyAccount = async (email: string) => {
  await prisma.user.updateMany({
    where: {
      email,
    },
    data: {
      status: STATUS_USER.ACTIVATED,
    },
  });
};

const deleteInActiveAccounts = async () => {
  await prisma.profile.deleteMany({
    where: {
      user: {
        status: STATUS_USER.UNVERIFIED,
        codeVerifyExpiresAt: {
          lt: new Date(),
        },
      },
    },
  });
  await prisma.user.deleteMany({
    where: {
      status: STATUS_USER.UNVERIFIED,
      codeVerifyExpiresAt: {
        lt: new Date(),
      },
    },
  });
};

const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (user) {
    const checkPass = bcrypt.compareSync(password, user.password);
    if (checkPass) {
      return user;
    }
  }
  return false;
};

const createAccessToken = async (data: { id: string }) => {
  const result = jwt.sign(data, process.env.PRIMARY_KEY_ACCESS_TOKEN as string, { expiresIn: "1h" });
  return result;
};
const createRefreshToken = async (data: { id: string }) => {
  const result = jwt.sign(data, process.env.PRIMARY_KEY_REFRESH_TOKEN as string, { expiresIn: "7d" });
  return result;
};

export {
  registerAccount,
  checkExitEmail,
  verifyAccount,
  deleteInActiveAccounts,
  loginUser,
  createAccessToken,
  createRefreshToken,
};
