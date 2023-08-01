export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    user: UserType;
    token: string;
  };
}

export interface RegisterResponse {
  statusCode: number;
  message: string;
  user: UserType;
}
