const axios = require("axios");

const api = axios.create({
    baseUrl: "viacep.com.br/ws"
});

module.exports = axios;