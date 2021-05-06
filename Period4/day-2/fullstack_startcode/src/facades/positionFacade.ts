import path from "path"
require('dotenv').config({ path: path.join(__dirname, "..", "..", '.env') })
import { Db, Collection, ObjectID } from "mongodb";
import IPosition from '../interfaces/IPosition'
import FriendsFacade from './friendFacade';
import { DbConnector } from "../config/dbConnector"
import { ApiError } from "../errors/apiError";

class PositionFacade {
  db: Db
  positionCollection: Collection
  friendFacade: FriendsFacade;

  constructor(db: Db) {
    this.db = db;
    this.positionCollection = db.collection("positions");
    this.friendFacade = new FriendsFacade(db);
  }

  async addOrUpdatePosition(email: string, longitude: number, latitude: number): Promise<IPosition> {
    // 1) Find friend in Friend Collection (Hvad gør vi med fejl?)
    const friend = await this.friendFacade.getFriendFromEmail(email)
    // 2) Lav name ud fra Firstname + lastName
    const fullName = friend.firstName + " " + friend.lastName;

    // 3) Lav position
    const query = { email };
    const pos:IPosition = {lastUpdated:new Date(), email, name:fullName, location: {type: "Point", coordinates: [longitude, latitude]}}
    const update = {
        $set: { ...pos }
      }

    const options = {upsert:true, returnOriginal: false} // upsert true: hvis ikke den finder den, så laver den det.
    const result = await this.positionCollection.findOneAndUpdate(query, update, options)
    return result.value;
  }

  async findNearbyFriends(email: string, password: string, longitude: number, latitude: number, distance: number): Promise<Array<IPosition>> {
    throw new Error("Not Implemented")
  }

  async getAllPositions(): Promise<Array<IPosition>> {
    return this.positionCollection.find({}).toArray();
  }


}

export default PositionFacade;

async function tester() {
  const client = await DbConnector.connect()
  const db = client.db(process.env.DB_NAME)
  const positionFacade = new PositionFacade(db)
  await positionFacade.addOrUpdatePosition("pp@b.dk", 5, 5)
  process.exit(0)
}

//tester()