import gju from "geojson-utils";

// const {gameArea, players} = require("./gameData")
import {gameArea, players} from "./gameData";

const gameAreaForResponse = gameArea.coordinates[0].map(p=>{
  return {longitude:p[0], latitude:p[1]}
})

export const resolvers = {
  Query: {
    gameArea: () => {
      return gameArea
    },
    isUserInArea: (_:any,{longitude,latitude}:{latitude:number,longitude:number})=> {
      const point = {type:"Point",coordinates:[longitude,latitude]}
      const isInside = gju.pointInPolygon(point,gameArea)
      let result: any = {};
      result.status = isInside;
      result.msg = isInside ? "Point was inside the GameArea" : "Point was NOT inside the GameArea";
      return result
    }
  },
};
