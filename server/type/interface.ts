export enum STATUS_USER {
  UNVERIFIED = 0,
  ACTIVATED = 1,
  LOCKED = 2,
}
export enum GENRE {
  MAN = 0,
  WOMEN = 1,
}
export enum ROLE {
  ADMIN = 0,
  USER = 1,
  DOCTOR = 2,
}

export interface IRegister {
  email: string;
  password: string;
  fullName: string;
  roleId?: number;
  cityId: number;
  address: string;
  districtId: number;
  phone: string;
  birthday: Date;
  wardId: number;
  genre: GENRE;
  avatar?: string;
}
export interface IProfile {
  fullName: string;
  cityId: number;
  address: string;
  districtId: number;
  phone: string;
  birthday: Date;
  wardId: number;
  genre: number;
  avatar?: string;
}
