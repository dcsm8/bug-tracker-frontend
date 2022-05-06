export interface LoginDto {
  username: string | undefined;
  password: string | undefined;
}

export interface TokenResponse {
  accessToken: string;
}
