import prisma from "@lib/prisma";
import { IRegister, STATUS_USER } from "type/interface";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import { randomCodeVerify } from "@utils/index";

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
  return result;
};

export { registerAccount };
