export enum STATUS_USER {
  UNVERIFIED = 0,
  ACTIVATED = 1,
  LOCKED = 2,
}
export enum GENRE {
  MAN = 0,
  WOMEN = 1,
}

export interface IRegister {
  email: string;
  password: string;
  fullName: string;
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
