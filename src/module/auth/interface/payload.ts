export interface Payload {
  sub: string;
  iat: number;
  exp: number;
}

export interface PayloadUser {
  uuid: string;
  iat: number;
  exp: number;
}
