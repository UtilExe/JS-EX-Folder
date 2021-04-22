/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { useMutation, gql} from "@apollo/client"
import ILyndaFriend from "../interfaces/interfaces"

import {ALL_FRIENDS} from "./AllFriends"


const DELETE_FRIEND = gql`
 mutation deleteFriend($email:FriendEmailInput){
    deleteFriend(input:$email)
}
`

export default function DeleteFriend() {
  const [email, setEmail] = useState("")
  const [deleteFriend, {data}] = useMutation(
    DELETE_FRIEND, 
    {
      update(cache, { data }) {
      const deletedFriend = data.deleteFriend;
      const d: any = cache.readQuery({ query: ALL_FRIENDS })
      if (!d) {
        return
      }
      let getAllFriends = d.getAllFriends
      cache.writeQuery({
        query: ALL_FRIENDS,
        data: { getAllFriends: [...getAllFriends, deletedFriend] }
      })
    }
  }
)

  const fetchFriend = () => {
    alert(`Find friend with email: ${email}`)
    deleteFriend({variables:{email: {email: email}}})
  }

  return (
    <div>
      <h2>Fetch a friend using the provided Email</h2>
      Email: <input type="txt" value={email} onChange={e => {
        setEmail(e.target.value)
      }} />
      &nbsp; <button onClick={fetchFriend}>Delete Friend</button>
      <br />
      <br />

      {data && (
      <div>
      <p>Friend has been deleted succesfully</p>
      </div>
      )}
    </div>)
}
