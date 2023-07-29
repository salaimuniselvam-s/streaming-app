export interface LoginType {
  username: string;
  password: string;
}

export interface RegisterType extends LoginType {
  confirmPassword: string;
}
