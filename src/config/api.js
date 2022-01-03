const axios = require("axios");

const API = axios.create({
  baseURL: "http://dev3.dansmultipro.co.id/api/recruitment",
});

module.exports = {
  API,
};
