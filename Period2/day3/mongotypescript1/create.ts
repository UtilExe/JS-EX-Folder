import { MongoClient, Db, Collection, ObjectId } from "mongodb"
import connect from "./connect";
import setupTestData from "./setUpTestData"

(async function Tester() {
  const client = await connect();
  const db = client.db("day1ex1")
  const collection = db.collection("inventory")
  const status = await setupTestData(collection)
  
  //Add your play-around code here
  const demo = db.collection("demo");
  await demo.insertOne({
      name: "Kurt",
      age: 26,
      status: "member"
    })
    await demo.insertOne({
      name: "Lone",
      age: 45,
      status: "unregistered",
      country: "Denmark"
    })

    const all = await demo.find({}).toArray() // selects all.
    console.log(all)
    const first:any = all[0]
    console.log(new ObjectId(first._id).getTimestamp())

  client.close()
})()
