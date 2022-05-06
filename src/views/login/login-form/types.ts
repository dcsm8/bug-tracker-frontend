export interface LoginDto {
  username?: string;
  password?: string;
}

export interface TokenResponse {
  accessToken: string;
}
