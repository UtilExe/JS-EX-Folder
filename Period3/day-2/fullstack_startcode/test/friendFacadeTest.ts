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
            { firstName: "Peter", lastName: "Pan", email: "pp@b.dk", password: hashedPW, role: "user" },
            { firstName: "Donald", lastName: "Duck", email: "dd@b.dk", password: hashedPW, role: "user" },
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
            const editedFriend = { firstName: "Peter", lastName: "XXXX", email: "pp@b.dk", password: "secret" }
            const status = await facade.editFriend("pp@b.dk", editedFriend)
            //expect(status).to.be.not.null. or better below:
            expect(status.modifiedCount).to.be.equal(1)
            const lassen = await friendCollection.findOne({ lastName: "XXXX" })
            expect(lassen.lastName).to.be.equal("XXXX")
        })
    })

    describe("Verify the deleteFriend method", () => {
        it("It should remove the user Peter", async () => {
            const status = await facade.deleteFriend("pp@b.dk");
            expect(status).to.be.true;
        })

        it("It should return false, for a user that does not exist", async () => {
            const status = await facade.deleteFriend("idontexist@gmail.com");
            expect(status).to.be.false;
        })
    })

     
     describe("Verify the getAllFriends method", () => {
       it("It should get two friends", async () => {
        const friends = await facade.getAllFriends();
        const amountOfFriends = await friendCollection.find({}).toArray()
        // alternative would be: expect(status).to.be.length(2); but we wanna make it dynamic, instead of static :-)
        expect(friends).length(amountOfFriends.length)

       })
     })
   
     describe("Verify the getFriend method", () => {
   
       it("It should find Donald Duck", async () => {
           const friend = await facade.getFrind("dd@b.dk")
           expect(friend.firstName + " " + friend.lastName).to.be.equal("Donald Duck")
       })
       it("It should not find xxx.@.b.dk", async () => {
        const friendNotExist = await facade.getFrind("xxx.@.b.dk")
        expect(friendNotExist).to.be.null;
       })
     })
   
     describe("Verify the getVerifiedUser method", () => {
       it("It should correctly validate Peter Pan's credentials", async () => {
         const verifiedPeter = await facade.getVerifiedUser("pp@b.dk", "secret")
         expect(verifiedPeter).to.be.not.null;
       })
   
       it("It should NOT validate Peter Pan's credentials", async () => {
        const notVerifiedPeter = await facade.getVerifiedUser("pp@b.dk", "wrongpassword")
        expect(notVerifiedPeter).to.be.null;
       })
   
       it("It should NOT validate a non-existing users credentials", async () => {
        const nonExistingFriend = await facade.getVerifiedUser("idontexist@gmail.com", "wrongpassword")
        expect(nonExistingFriend).to.be.null;
       })
     })

})