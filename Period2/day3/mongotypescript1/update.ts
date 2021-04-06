import { MongoClient, Db, Collection } from "mongodb"
import connect from "./connect";
import setupTestData from "./setUpTestData"

(async function Tester() {
  const client = await connect();
  const db = client.db("day1ex1")
  const collection = db.collection("inventory")
  const status = await setupTestData(collection)

  //Add your play-around code here

  // Update all A to Q's.
  const demo = db.collection("inventory");
  await demo.updateMany(
      {status:"A"},
      {$set: {status:"Q"}}
  )

    // could also have used an insertMany.

    const all = await demo.find({status:"Q"}).toArray() // selects all.
    console.log(all)
  client.close()
})()
