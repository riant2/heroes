// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  applicationName: 'heroes',
  production: false,
  apiUrl: 'http://localhost:3001',
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

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
