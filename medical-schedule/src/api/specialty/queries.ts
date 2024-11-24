import { useMutation, useQuery } from "@tanstack/react-query";
import { createSpecialty, deleteSpecialty, fetchSpecialty, updateSpecialty } from "./fetchers";

export enum QueryKeys {
  CREATE_SPECIALTY = "create-specialty",
  GET_SPECIALTY = "get-specialty",
  UPDATE_SPECIALTY = "update-specialty",
  DELETE_SPECIALTY = "delete-specialty",
}

const CreateSpecialty = () => {
  return useMutation({
    mutationKey: [QueryKeys.CREATE_SPECIALTY],
    mutationFn: createSpecialty,
  });
};
const useSpecialties = () =>
  useQuery({
    queryKey: [QueryKeys.GET_SPECIALTY],
    queryFn: fetchSpecialty,
  });

const UpdateSpecialty = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_SPECIALTY],
    mutationFn: updateSpecialty,
  });
};
const DeleteSpecialty = () => {
  return useMutation({
    mutationKey: [QueryKeys.DELETE_SPECIALTY],
    mutationFn: deleteSpecialty,
  });
};

export { CreateSpecialty, useSpecialties, UpdateSpecialty, DeleteSpecialty };
