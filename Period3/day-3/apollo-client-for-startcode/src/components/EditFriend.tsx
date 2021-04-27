import React, { useState } from "react";
import ILyndaFriend, { Gender } from "../interfaces/interfaces"
import { useMutation, gql} from "@apollo/client"

import {ALL_FRIENDS} from "./AllFriends"
const EDIT_FRIEND = gql`
mutation editFriend($friend:FriendEditInput){
  editFriend(input:$friend) {
    firstName
    lastName
    email
  }
}
`

type AddFriendProps = {
  initialFriend?: ILyndaFriend
}

interface IKeyableFriend extends ILyndaFriend {
  [key: string]: any
}

const EditFriend = ({ initialFriend }: AddFriendProps) => {
 const EMPTY_FRIEND: ILyndaFriend = { firstName: "", lastName: "", email: "", password: "" }
  let newFriend = initialFriend ? initialFriend : { ...EMPTY_FRIEND }
  const [friend, setFriend] = useState({ ...newFriend })

  const [editFriend, {data}] = useMutation(
    EDIT_FRIEND, 
    {
      update(cache, { data }) {
      const editedFriend = data.editFriend;
      const d: any = cache.readQuery({ query: ALL_FRIENDS })
      if (!d) {
        return
      }
      let getAllFriends = d.getAllFriends
      cache.writeQuery({
        query: ALL_FRIENDS,
        data: { getAllFriends: [...getAllFriends, editedFriend] }
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
    editFriend({
      variables: {friend:{...friend}}
    })
    //Todo save friend on servers
    setFriend({ ...EMPTY_FRIEND })
  }

    /* NOTE: Atm EditFriend requires all files to be filled. Perhaps make validation on backend to modify only fields that aren't empty.) */
  return (
    <form onSubmit={handleSubmit}>
        <label>
        Email <br />
        <input type="text" id="email" value={friend.email} onChange={handleChange} />
      </label>
      <br /><br />
      <label>
        New FirstName<br />
        <input type="text" id="firstName" value={friend.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        New LastName <br />
        <input type="text" id="lastName" value={friend.lastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        New Password <br />
        <input type="text" id="password" value={friend.password} onChange={handleChange} />
      </label>
      <br />
      <input type="submit" value="Edit Friend" />
    </form>
  );
}

export default EditFriend;