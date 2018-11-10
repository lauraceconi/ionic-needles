const DEBUG = true;
let SERVIDOR = '';
SERVIDOR = DEBUG ? 'http://192.168.161.128:8000/' : 'https://lceconi.pythonanywhere.com/';

// Configurações gerais
export const SETTINGS = Object.freeze({
    DEBUG: DEBUG,
    SERVIDOR: SERVIDOR,
    API_URL: SERVIDOR + 'api/',
});
