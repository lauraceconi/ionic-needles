const DEBUG = true;
<<<<<<< HEAD
//const SERVIDOR = 'https://lceconi.pythonanywhere.com/';
const SERVIDOR = 'http://192.168.161.128:8000/';
//const SERVIDOR = 'http://localhost:8000/';
=======
// const SERVIDOR = 'https://lceconi.pythonanywhere.com/';
//const SERVIDOR = 'http://192.168.161.128:8000/';
const SERVIDOR = 'http://localhost:8000/';
>>>>>>> a0fe8d59cb2fb768ddc7c34097184df7cd0189ad

// Configurações gerais
export const SETTINGS = Object.freeze({
    DEBUG: DEBUG,
    SERVIDOR: SERVIDOR,
    API_URL: SERVIDOR + 'api/',
});
