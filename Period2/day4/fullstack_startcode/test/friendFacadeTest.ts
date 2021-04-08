import * as mongo from "mongodb"
import FriendFacade from '../src/facades/friendFacade';

import chai from "chai";
const expect = chai.expect;

//use these two lines for more streamlined tests of promise operations
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

import bcryptjs from "bcryptjs"
import { InMemoryDbConnector } from "../src/config/dbConnector"
import { ApiError } from "../src/errors/apiError";

let friendCollection: mongo.Collection;
let facade: FriendFacade;

// Yderste test-suite (hoved-test suiten), skal nu i gang med at teste FriendFacade.
describe("## Verify the Friends Facade ##", () => {

  before(async function () {
    //Connect to inmemory test database
    //Get the database and initialize the facade
    //Initialize friendCollection, to operate on the database without the facade
    const client = await InMemoryDbConnector.connect();
    const db = client.db();
    friendCollection = db.collection("friends");
    facade = new FriendFacade(db);

  })

  beforeEach(async () => {
    const hashedPW = await bcryptjs.hash("secret", 4)
    await friendCollection.deleteMany({})
    //Create a few few testusers for ALL the tests
    await friendCollection.insertMany([
        { firstName: "Lassen", lastName: "Hansen", email: "testing@test.dk", password: hashedPW},
        { firstName: "Yasin", lastName: "Olsen", email: "myemail@test.com", password:  hashedPW},
        { firstName: "Henriette", lastName: "Simonsen", email: "new@abc.dk", password: hashedPW},
    ])
  })

  describe("Verify the addFriend method", () => {
    it("It should Add the user Jan", async () => {
      const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret" }
      const status = await facade.addFriend(newFriend);
      expect(status).to.be.not.null
      const jan = await friendCollection.findOne({ email: "jan@b.dk" })
      expect(jan.firstName).to.be.equal("Jan")
    })

    it("It should not add a user with a role (validation fails)", async () => {
      const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret", role: "admin" }
      try {
        await facade.addFriend(newFriend);
        expect(false).to.be.true("Should never get here")
    } catch (err) {
        expect(err instanceof ApiError).to.be.true
    }
    })

    //Anden måde at gøre det på (virker kun med chai-as-promised)
    xit("It should not add a user with a role (validation fails)", async () => {
        const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret", role: "admin" }
        await expect(facade.addFriend(newFriend)).to.be.rejectedWith(ApiError);
      })
  })

  describe("Verify the editFriend method", () => {
    it("It should change lastName to XXXX", async () => {
        const editedFriend = { firstName: "Lassen", lastName: "XXXX", email: "testing@test.dk", password: "secret" }
        const status = await facade.editFriend("testing@test.dk", editedFriend)
        //expect(status).to.be.not.null. better below:
        expect(status.modifiedCount).to.be.equal(1)
        const lassen = await friendCollection.findOne({lastName: "XXXX"})
        expect(lassen.lastName).to.be.equal("XXXX")
    })
  })

/*
  describe("Verify the deleteFriend method", () => {
    xit("It should remove the user Peter", async () => {
    })
    xit("It should return false, for a user that does not exist", async () => {
    })
  })

  describe("Verify the getAllFriends method", () => {
    xit("It should get two friends", async () => {
    })
  })

  describe("Verify the getFriend method", () => {

    xit("It should find Donald Duck", async () => {
    })
    xit("It should not find xxx.@.b.dk", async () => {
    })
  })

  describe("Verify the getVerifiedUser method", () => {
    it("It should correctly validate Peter Pan's credential,s", async () => {
      const veriefiedPeter = await facade.getVerifiedUser("pp@b.dk", "secret")
      expect(veriefiedPeter).to.be.not.null;
    })

    xit("It should NOT validate Peter Pan's credential,s", async () => {
    })

    xit("It should NOT validate a non-existing users credentials", async () => {
    })
  })*/

})