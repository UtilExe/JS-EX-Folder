import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `

type Coordinate {
  latitude: Float!
  longitude:Float!
}

type Coordinates {  
  coordinates: [Coordinate]
}

type Status {
  """TRUE if coordinates was inside gameArea, otherwise FALSE"""
  status: String
  """ Contains a string with a description of whether given coordinates was inside or not inside the gameArea """
  msg: String
}

type Player {
  """ Will ALWAYS have the value --> Feature <-- """
  type: String
  """ userName of Player (or Team) """
  properties: Name
  """ GeoJson Point with the users location """
  geometry: Point
}

""" Contains userName of a Team found """
type Name {
  name: String
}

type Point {
  """ Will ALWAYS have the value Point """
  type: String
  """ Array with longitude followed by latitude [lon,lat] """
  coordinates: [Float]
}

""" Represents a user found, with the distance to the caller """
type User {
  """ Distance to the user seached for """
  distance: Float
  """ userName of the user found """
  to: String
}

type Query {

  """Returns a GeoJson Polygon representing the legal gameArea"""
  gameArea : Coordinates 

  """ Check whether caller, given his latitude and lontitude, is inside the gameArea """
  isUserInArea("""Callers latitude""" latitude:Float!, """ Callers longitude """ longitude:Float!):Status!

  """ Given callers latitude and longitude all nearby Teams will be found (inside the given radius) """
  findNearbyPlayers(latitude:Float!, longitude:Float!, distance:Int!):[Player]!

  """ Given callers latitude and longitude, and the userName of the Team to find, returs the distance to this Team """
  distanceToUser(""" callers latitude """ latitude:Float!, """ callers longitude """ longitude:Float!, """ user to find """ userName:String): User!

}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
