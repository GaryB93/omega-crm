export interface User {
  id: number,
  firstname: string,
  lastname: string,
  phone: string,
  schedule: number,
  role: string,
  username?: string,
  password?: string,
  confirmPassword?: string
};