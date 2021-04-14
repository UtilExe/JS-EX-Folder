import {Friends } from './dbConnectors';
// resolver map
export const resolvers = {
    Query: {
        getFriend: ({ id }) => {
            return new Friend(id, friendDatabase[id]);
        },
    },
    Mutation: {
        createFriend: (root, { input }) => {
            const newFriend = new Friends({
                firstName: input.firstName,
                lastName: input.lastName,
                gender: input.gender,
                language: input.language,
                age: input.age,
                email: input.email,
                contacts: input.contacts
            });

            newFriend.id = newFriend._id;

            return newFriend.save()
        },
        updateFriend: (root, {input }) => {
            return Friends.findOneAndUpdate({ _id: input.id}, input, {new: true}) // new: true means if the db doesn't find a row, then create one.
        },
        deleteFriend: async (root, {id}) => {
            const res = await Friends.deleteOne({ _id: id })
            if (res.deletedCount === 1) {
                return "Succesfully deleted a friend"
            }
            throw new Error("Could not delte a friend with the provided id")
        }
    },
};