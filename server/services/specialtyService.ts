import prisma from "@lib/prisma";

const createSpecialty = async (name: string, description: string, logo: string) => {
  await prisma.specialty.create({
    data: {
      name,
      description,
      logo,
    },
  });
};
const fetchSpecialty = async () => {
  const result = await prisma.specialty.findMany({
    where: {
      isDelete: false,
    },
  });
  return result;
};
const updateSpecialty = async (id: number, name: string, description: string, logo: string) => {
  await prisma.specialty.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      logo,
    },
  });
};
const deleteSpecialty = async (id: number) => {
  await prisma.specialty.update({
    data: {
      isDelete: true,
    },
    where: {
      id,
    },
  });
};

export { createSpecialty, fetchSpecialty, updateSpecialty, deleteSpecialty };
