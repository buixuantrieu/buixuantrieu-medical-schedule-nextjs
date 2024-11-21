import prisma from "@lib/prisma";

const fetchCity = async () => {
  const result = await prisma.city.findMany();
  return result;
};
const fetchDistrict = async () => {
  const result = await prisma.district.findMany();
  return result;
};

const fetchDistrictByCityId = async (cityId: number) => {
  const result = await prisma.district.findMany({
    where: {
      cityId,
    },
  });
  return result;
};
const fetchWard = async () => {
  const result = await prisma.ward.findMany();
  return result;
};

const fetchWardByDistrictId = async (districtId: number) => {
  const result = await prisma.ward.findMany({
    where: {
      districtId,
    },
  });
  return result;
};

export { fetchCity, fetchDistrict, fetchDistrictByCityId ,fetchWard,fetchWardByDistrictId};
