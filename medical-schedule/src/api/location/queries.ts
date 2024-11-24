import { useQuery } from "@tanstack/react-query";
import { fetchCity, fetchDistrictByCityId, fetchWardByDistrictId } from "./fetchers";

enum QueryKeys {
  GET_CITY = "get-city",
  GET_DISTRICT = "get-district",
  GET_WARD = "get-ward",
}

const useCities = () =>
  useQuery({
    queryKey: [QueryKeys.GET_CITY],
    queryFn: fetchCity,
  });

const useDistricts = (cityId: string) =>
  useQuery({
    queryKey: [QueryKeys.GET_DISTRICT, cityId],
    queryFn: () => fetchDistrictByCityId(cityId),
    enabled: !!cityId,
  });

const useWards = (districtId: string) =>
  useQuery({
    queryKey: [QueryKeys.GET_WARD, districtId],
    queryFn: () => fetchWardByDistrictId(districtId),
    enabled: !!districtId,
  });

export { useCities, useDistricts, useWards };
