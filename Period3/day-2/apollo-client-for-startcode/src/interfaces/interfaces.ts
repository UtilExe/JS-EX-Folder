// export enum Gender {
//  MALE,
//  FEMALE,
//  OTHER
// }
export type Gender = "MALE" | "FEMALE" | "OTHER"
/* me: todo
export default interface ILyndaFriend {
  id?: string
  firstName: string
  lastName: string
  gender: Gender
  age: number
  email: string
  role: string
}*/

export default interface ILyndaFriend {
  id?: string
  firstName: string
  lastName: string
  email: string
  role?: string // consider if it really should be optional, or if it should be handled better.
  password: string
}