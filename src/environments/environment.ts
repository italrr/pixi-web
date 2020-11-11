// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const host = '';
const baseUrl = '/api/v1';

export const environment = {
  production: false,
  endpoints: {
    // user
    USER_GET:`${host}${baseUrl}/user/get`,
    USER_CREATE:`${host}${baseUrl}/user/create`,    
    // channel
    CHANNEL_GET:`${host}${baseUrl}/channel/get`,
    CHANNEL_CREATE:`${host}${baseUrl}/channel/create`,
    // persona
    PERSONA_GET: `${host}${baseUrl}/persona/get`,
    PERSONA_CREATE: `${host}${baseUrl}/persona/create`,    
    // content
    CONTENT_GET: `${host}${baseUrl}/content/get`,
    CONTENT_GET_MANY: `${host}${baseUrl}/content/getMany`,
    CONTENT_CREATE: `${host}${baseUrl}/content/create`,
    // auth
    AUTH_LOGIN: `${host}${baseUrl}/auth/login`,
    AUTH_LOGOUT: `${host}${baseUrl}/auth/logout`,
    AUTH_REGISTER: `${host}${baseUrl}/auth/register`,
    AUTH_RENEW: `${host}${baseUrl}/auth/renew`,
    // img
    IMG: `${host}${baseUrl}/i/`,
    THUMBNAIL: `${host}${baseUrl}/t/`
  }
};