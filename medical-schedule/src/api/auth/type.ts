export interface IRegister {
  email: string;
  fullName: string;
  cityId: number;
  address: string;
  districtId: number;
  phone: string;
  birthday: Date;
  wardId: number;
  password: string;
  genre: number;
}
export interface ILogin {
  email: string;
  password: string;
}
