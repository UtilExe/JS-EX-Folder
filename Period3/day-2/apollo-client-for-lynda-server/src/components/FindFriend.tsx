/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client"
import ILyndaFriend from "../interfaces/interfaces"

interface IFriendResult {
  getFriend: ILyndaFriend
}

interface IVariableInput {
  id: string
}

const GET_FRIEND = gql`
 query getFriend($id:ID){
  getFriend(id:$id)
  {
    id
    firstName
    lastName
    gender
    email
    age
  }
}
`

export default function FindFriend() {
  const [id, setId] = useState("")
  const [getFriend, {loading, called, data}] = useLazyQuery<IFriendResult, IVariableInput>(
    GET_FRIEND,
    {fetchPolicy:"cache-and-network"}
  );

  const fetchFriend = () => {
    alert(`Find friend with id: ${id}`)
    getFriend({variables:{id}})
  }

  return (
    <div>
      <h2>Fetch a friend using the provided id</h2>
      ID:<input type="txt" value={id} onChange={e => {
        setId(e.target.value)
      }} />
      &nbsp; <button onClick={fetchFriend}>Find Friend</button>
      <br />
      <br />

      {called && loading && <p>loading</p>}
      {data && (
      <div>
      <p>{data.getFriend.firstName}</p>
      <p>{data.getFriend.lastName}</p>
      </div>
      )}
    </div>)
}
