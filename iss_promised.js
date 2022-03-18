const request = require("request-promise-native");

const fetchMyIP = function () {
  return request("https://api64.ipify.org/?format=json");
};

const fetchCoordsByIP = function (body) {
  return request(
    `https://api.freegeoip.app/json/${
      JSON.parse(body).ip
    }?apikey=93b47970-a647-11ec-8b54-2de097870533`
  );
};

const fetchISSFlyOverTimes = function (coords) {
  const { latitude, longitude } = JSON.parse(coords);
  return request(
    `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  );
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      return JSON.parse(body).response
    });
};

module.exports = {
  nextISSTimesForMyLocation,
};
