const expect = require("chai").expect;
import app from "./whattodo";
const request = require("supertest")(app);
import nock from "nock";

describe("What to do endpoint", function () {
  before(() => { //Figure out what to do here })
    nock('https://www.boredapi.com')
    .get('/api/activity')
    .reply(200, {
      "activity":"Cook something together with someone","type":"cooking","participants":2,"price":0.3,"link":"","key":"1799120","accessibility":0.8
    })
  it("Should eventually provide 'drink a single beer'", async function () {
    const response = await request.get("/whattodo")
    expect(response.body.activity).to.be.equal("drink a single beer");
  })
})
})