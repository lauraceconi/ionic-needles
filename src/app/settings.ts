const DEBUG = true;
// const SERVIDOR = 'https://lceconi.pythonanywhere.com/';
//const SERVIDOR = 'http://192.168.161.128:8000/';
const SERVIDOR = 'http://localhost:8000/';

// Configurações gerais
export const SETTINGS = Object.freeze({
    DEBUG: DEBUG,
    SERVIDOR: SERVIDOR,
    API_URL: SERVIDOR + 'api/',
});
