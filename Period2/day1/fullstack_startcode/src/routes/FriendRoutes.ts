import {Router} from "express"
const router = Router();

import facade from "../facades/DummyDB-Facade"

// getAll
router.get("/all", async (req, res) => {
  const friends = await facade.getAllFriends();
  res.json(friends);
})

// getByEmail. uses request parameter with email.
router.get("/:email", async (req, res) => {
    const friend = await facade.getFriend(req.params.email);
    res.json(friend);
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
router.delete("/delete", async(req, res) => {
    const friend = await facade.deleteFriend(req.body.email)
    res.json(friend)
})

export default router