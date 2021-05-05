/* For the old Facade. Only use for Examples.
import { Router } from "express"
const router = Router();

//import facade from "../facades/DummyDB-Facade"
import {ApiError} from "../errors/apiError"

const cors = require("cors");
import authMiddleware from "../middleware/basic-auth";
router.use(authMiddleware)

// Enable all CORS requests:
// app.use(cors())

// Configuring CORS:
var corsOptions = {
    // origin: 'http://localhost:3001',
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// getAll
router.get("/all", cors(corsOptions), async (req, res) => {
    // my note: should be handled by DTO instead, to not retrieve the password and only output certain fields, on the endpoint.
    const friends = await facade.getAllFriends();
    //res.json(friends);

    // here we make a DTO instead:
    const friendsDTO = friends.map(friend => {
        const { firstName, lastName, email } = friend; // destructuring
        // return {firstName: firstName, lastName: lastName} // svarer til samme som nedenfor (at vi læser firstName og lastName fra L13). nedenstående er blot et shortcut da variabel-navnet hedder det samme .
        return { firstName, lastName, email } // laver et objekt, med en property der hedder firstName, og en property der hedder lastName. Læser properties data fra L13.
    })
    res.json(friendsDTO)
})

// getByEmail. uses request parameter with email.
router.get("/:email", async (req, res, next) => {
    const friend = await facade.getFriend(req.params.email);
    try {
        if (friend == null) {
            throw new ApiError("User not found", 404)
        }
        const { firstName, lastName, email } = friend;
        const friendDTO = { firstName, lastName, email }
        res.json(friendDTO);
    } catch (err) {
        next(err)
    }
})

// add. takes all the friend attributes (firstName etc.) as body parameter.
router.post("/add", async (req, res) => {
    const person = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    const friend = await facade.addFriend(person)
    res.json(friend)
})

// delete. takes an email as body parameter
// could also have handled it as a request parameter
router.delete("/delete", async (req, res) => {
    const friend = await facade.deleteFriend(req.body.email)
    res.json(friend)
})

export default router
*/