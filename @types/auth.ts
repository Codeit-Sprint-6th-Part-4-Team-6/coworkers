declare module "@coworkers-types" {
  type BaseAuthEntity = {
    createdAt: ISODateString;
    updatedAt: ISODateString;
    id: number;
  };

  export type SignUpRequest = {
    email: string;
    nickname: string;
    password: string;
    passwordConfirmation: string;
  };

  export type LoginRequest = {
    email: string;
    password: string;
  };

  export type SocialLoginRequest = {
    redirectUri: string;
    token: string;
  };

  export type SocialLoginAppRegister = {
    appSecret: string;
    appKey: string;
    provider: string;
  };

  export type AuthResponse = RefreshToken &
    AccessToken & {
      user: UserInfo;
    };

  export type SocialLoginAppResponse = BaseAuthEntity & {
    appSecret: string;
    appKey: string;
    provider: string;
    teamId: string;
  };

  export type UserInfo = BaseAuthEntity & {
    email: string;
    nickname: string;
    image: string | null;
    teamId: string;
  };

  export type RefreshToken = {
    refreshToken: string;
  };

  export type AccessToken = {
    accessToken: string;
  };
}
