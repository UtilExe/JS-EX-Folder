const expect = require("chai").expect;
import app from "./whattodo";
const request = require("supertest")(app);
import nock from "nock";

describe("What to do endpoint", function () {
  before(() => { //Figure out what to do here })
    nock('https://www.boredapi.com')
    .get('/api/activity')
    .reply(200, {
      "activity":"drink a single beer","type":"education","participants":1,"price":0,"link":"","key":"1","accessibility":1
    })
})
it("Should eventually provide 'drink a single beer'", async function () {
  const response = await request.get("/whattodo")
  expect(response.body.activity).to.be.equal("drink a single beer");
})
})

describe("Name info endpoint", function () {
  before(() => { //Figure out what to do here })
    nock('https://api.genderize.io')
    .get('/?name=Ivan')
    .reply(200, {
      "name":"Ivan","gender":"male","probability":0.99,"count":117756
    })
    nock('https://api.nationalize.io')
    .get('/?name=Ivan')
    .reply(200, {
      "name":"ivan","country":[{"country_id":"HR","probability":0.12932920021420638},{"country_id":"ME","probability":0.07773068543992824},{"country_id":"RS","probability":0.06716370203086079}]
    })
    nock('https://api.agify.io')
    .get('/?name=Ivan')
    .reply(200, {
      "name":"ivan","age":31,"count":108583
    })
})
it("Should provide Ivan with the age of 31.", async function () {
  const response = await request.get("/nameinfo/Ivan")
  expect(response.body.age).to.be.equal(31);
  expect(response.body.gender).to.be.equal("male");
  expect(response.body.country).to.be.equal("HR");
})
})