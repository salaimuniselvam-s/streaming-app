export interface LoginType {
  username: string;
  password: string;
}

export interface RegisterType extends LoginType {
  confirmPassword: string;
  plan: string;
}

export interface movieType {
  title: string;
  description: string;
  imgUrl: string;
  srcUrl: string;
  plans: string[];
  _id?: string;
}

export interface planType {
  title: string;
  price: number;
  _id?: string;
}
