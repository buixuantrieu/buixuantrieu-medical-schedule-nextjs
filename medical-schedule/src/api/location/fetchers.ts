import { publicClient } from "@/lib/axios";

export const fetchCity = async () => {
  const response = await publicClient.get("/location/cities");
  return response.data;
};
export const fetchDistrict = async () => {
  const response = await publicClient.get("/location/districts");
  return response.data;
};
export const fetchDistrictByCityId = async (cityId: string) => {
  const response = await publicClient.get("location/districts", {
    params: { cityId },
  });
  return response.data;
};
export const fetchWardByDistrictId = async (districtId: string) => {
  const response = await publicClient.get("location/wards", {
    params: { districtId },
  });
  return response.data;
};

