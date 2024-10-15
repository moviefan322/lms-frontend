export interface LoginRes {
  token: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface AuthErrorRes {
  non_field_errors?: string[];
  detail?: string;
}

export interface UserDetailsRes {
  email: string;
  name: string;
}
