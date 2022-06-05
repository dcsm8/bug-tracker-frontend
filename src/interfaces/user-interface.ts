export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
}

export interface UserToken {
  email: string;
  exp: number;
  fullName: string;
  iat: number;
  keyId: number;
  username: string;
}
