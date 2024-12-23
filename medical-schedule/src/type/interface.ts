export interface ICity {
  id: number;
  name: string;
}
export interface IDistrict {
  id: number;
  name: string;
  cityId: number;
}
export interface IWard {
  id: number;
  name: string;
  districtId: number;
}
export interface ISpecialty {
  id: number;
  logo: string;
  name: string;
  description: string;
  isDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
}
