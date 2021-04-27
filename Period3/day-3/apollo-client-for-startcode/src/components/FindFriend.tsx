/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client"
import ILyndaFriend from "../interfaces/interfaces"

interface IFriendResult {
  getFriendByEmail: ILyndaFriend
}

interface IVariableInput {
  input: string
}
// getFriendByEmail(input:String): Friend
const GET_FRIEND = gql`
 query getFriendByEmail($input:String){
  getFriendByEmail(input:$input)
  {
    id
    firstName
    lastName
    email
    role
  }
}
`

export default function FindFriend() {
  const [input, setInput] = useState("")
  const [getFriendByEmail, {loading, called, data}] = useLazyQuery<IFriendResult, IVariableInput>(
    GET_FRIEND,
    {fetchPolicy:"cache-and-network"}
  );

  const fetchFriend = () => {
    alert(`Find friend with email: ${input}`)
    getFriendByEmail({variables:{input: input}})
  }

  return (
    <div>
      <h2>Fetch a friend using the provided Email</h2>
      Email: <input type="txt" value={input} onChange={e => {
        setInput(e.target.value)
      }} />
      &nbsp; <button onClick={fetchFriend}>Find Friend</button>
      <br />
      <br />

      {called && loading && <p>loading</p>}
      {data && (
      <div>
      <p>{data.getFriendByEmail.firstName}</p>
      <p>{data.getFriendByEmail.lastName}</p>
      </div>
      )}
    </div>)
}
