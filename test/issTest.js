const { fetchMyIP  } = require("../index");
const { assert } = require("chai");

describe("fetchMyIP", () => {
  it("returns a string description for a valid breed, via callback", (done) => {
    fetchMyIP((error, ip) => {

      done();
    })
  });
});