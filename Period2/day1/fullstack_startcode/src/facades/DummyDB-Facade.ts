import { IFriend } from '../interfaces/IFriend';

function singleValuePromise<T>(val: T | null): Promise<T | null> {
    return new Promise<T | null>((resolve, reject) => {
        setTimeout(() => resolve(val), 0);
    })
}
function arrayValuePromise<T>(val: Array<T>): Promise<Array<T>> {
    return new Promise<Array<T>>((resolve, reject) => {
        setTimeout(() => resolve(val), 0);
    })
}

class FriendsFacade {
    friends: Array<IFriend> = [
        { id: "id1", firstName: "Peter", lastName: "Pan", email: "pp@b.dk", password: "secret" },
        { id: "id2", firstName: "Donald", lastName: "Duck", email: "dd@b.dk", password: "secret" },
    ]
    async addFriend(friend: IFriend): Promise<IFriend> {
        // Validate to check if the email already exists. If so, we don't want to add the new friend.
        if (this.friends.find(f => f.email === friend.email)) {
            throw new Error("Email already exists!")
        } else {
            this.friends.push(friend)
            return friend;
        }
    }
    async deleteFriend(friendEmail: string): Promise<IFriend> {
        // let friend: IFriend;
        let friend: IFriend | undefined = this.friends.find(f => f.email === friendEmail);

        if (friend) {
            const index = this.friends.indexOf(friend)
            this.friends.splice(index, 1)
            return friend;
        } else {
            throw new Error("The friend/person doesn't exist!")
        }
    }
    async getAllFriends(): Promise<Array<IFriend>> {
        const f: Array<IFriend> = this.friends;
        return arrayValuePromise<IFriend>(this.friends);
    }
    async getFriend(friendEmail: string): Promise<IFriend | null> {
        let friend: IFriend | null
        friend = this.friends.find(f => f.email === friendEmail) || null;
        return singleValuePromise<IFriend>(friend);
    }
}

const facade = new FriendsFacade();
export default facade; // vi laver en instans som vi eksporterer. Det betyder at alle som importerer denne, får den samme instans. Dvs. vi får en Singleton - hvilket vi gerne vil have.