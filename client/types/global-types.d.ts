export interface LoginRequest {
  email: string,
  password: string,
}

export interface User {
  id: string,
  email: string,
  firstName: string,
  lastName: string
}