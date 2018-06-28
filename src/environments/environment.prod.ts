export const environment = {
  applicationName: 'heroes',
  apiUrl: 'http://localhost:8080',
  production: true,
  simulateDelay: 2000,
  auth0: {
    clientID: '-DyxQVtki6JNIi3SxBq7yB6OAOGho6Hh',
    domain: 'mierian.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://mierian.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile',
  },
};
