import React, { useState } from "react";
import ILyndaFriend, { Gender } from "../interfaces/interfaces"
import { useMutation, gql} from "@apollo/client"

import {ALL_FRIENDS} from "./AllFriends"
const ADD_FRIEND = gql`
mutation createFriend($friend:FriendInput){
  createFriend(input:$friend) {
    firstName
    lastName
    email
    id
  }
}
`

type AddFriendProps = {
  initialFriend?: ILyndaFriend,
  allowEdit: true
}

interface IKeyableFriend extends ILyndaFriend {
  [key: string]: any
}

const AddFriend = ({ initialFriend, allowEdit }: AddFriendProps) => {
 // const EMPTY_FRIEND: ILyndaFriend = { firstName: "", lastName: "", gender: "OTHER", age: 0, email: "", role: "user" }
 const EMPTY_FRIEND: ILyndaFriend = { firstName: "", lastName: "", email: "", password: "" }
  let newFriend = initialFriend ? initialFriend : { ...EMPTY_FRIEND }
  const [friend, setFriend] = useState({ ...newFriend })
  const [readOnly, setReadOnly] = useState(!allowEdit)

  const [addFriend, {data}] = useMutation(
    ADD_FRIEND, 
    {
      update(cache, { data }) {
      const addedFriend = data.createFriend;
      const d: any = cache.readQuery({ query: ALL_FRIENDS })
      if (!d) {
        return
      }
      let getAllFriends = d.getAllFriends
      cache.writeQuery({
        query: ALL_FRIENDS,
        data: { getAllFriends: [...getAllFriends, addedFriend] }
      })
    }
  }
)

  const handleChange = (event: any) => {
    const id = event.currentTarget.id;
    let friendToChange: IKeyableFriend = { ...friend }
      friendToChange[id] = event.currentTarget.value;
    setFriend({ ...friendToChange })
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // alert(JSON.stringify(friend))
    addFriend({
      variables: {friend:{...friend}}
    })
    //Todo save friend on servers
    setFriend({ ...EMPTY_FRIEND })
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        FirstName<br />
        <input type="text" id="firstName" value={friend.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        LastName <br />
        <input type="text" readOnly={readOnly} id="lastName" value={friend.lastName} onChange={handleChange} />
      </label>
      <br />
      <br />
      <label>
        Password <br />
        <input type="text" readOnly={readOnly} id="password" value={friend.password} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email <br />
        <input type="text" readOnly={readOnly} id="email" value={friend.email} onChange={handleChange} />
      </label>
      <br />
      {!readOnly && <input type="submit" readOnly={readOnly} value="Add Friend" />}
    </form>
  );
}

export default AddFriend;