/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });
// fetchCoordsByIP("24.87.38.195", (error, data) => {
//   console.log(error, data);
// });
// fetchISSFlyOverTimes(
//   { latitude: 49.2246, longitude: -123.0711 },
//   (error, data) => {
//     console.log(error, data);
//   }
// );

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});
