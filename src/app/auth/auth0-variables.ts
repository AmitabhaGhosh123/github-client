interface AuthConfig {

    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;

}

export const AUTH_CONFIG: AuthConfig = {

  CLIENT_ID: 'vNFpFacxs3hnGNGK4ScjLYqsNA7zhycv',
  CLIENT_DOMAIN: 'amitabha.auth0.com',
  AUDIENCE: 'https://amitabha.auth0.com/userinfo',
  REDIRECT: 'http://gitty.gq/profile',
  SCOPE: 'openid profile'

}