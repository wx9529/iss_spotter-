const request = require("request");
const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request("https://api64.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  // use request to Fetch Geo Coordinates By IP
  request(
    `https://api.freegeoip.app/json/${ip}?apikey=93b47970-a647-11ec-8b54-2de097870533`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching Geo Coordinates for IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const output = {
        latitude: JSON.parse(body).latitude,
        longitude: JSON.parse(body).longitude,
      };
      callback(null, output);
    }
  );
};

const fetchISSFlyOverTimes = function (coords, callback) {
  //use request to fetch ISSFlyOverTimes by coords
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.latitude}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching ISSFlyOverTimes for coords. Response: ${body}`;
        callback(Error(msg), null);
      }
      callback(null, JSON.parse(body).response);
    }
  );
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((err, ip) => {
    if (err) callback(err);
    fetchCoordsByIP(ip, (err2, coords) => {
      if (err) callback(err);
      fetchISSFlyOverTimes(coords, (err3, passTimes) => {
        if (err) callback(err);
        callback(null,passTimes);
      });
    });
  });
};

module.exports = {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
