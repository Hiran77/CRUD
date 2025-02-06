export interface ApiResponse<T> {
  message?: string;
  data: T;
}

export interface IEmployee {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}
