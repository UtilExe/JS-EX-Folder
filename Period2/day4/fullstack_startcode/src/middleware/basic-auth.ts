import auth from 'basic-auth'

import { Request, Response } from "express"
import FriendsFacade from '../facades/friendFacade'

let facade: FriendsFacade;

const authMiddleware = async function (req: Request, res: Response, next: Function) {
    if (!facade) {
        facade = new FriendsFacade(req.app.get("db")); // Observe how you have access to the global app-object via the request object. (note: det er sat via www.ts)
    }
    var credentials = auth(req) // auth retrieves credentials from the request object.

    if (credentials && await check(credentials.name, credentials.pass, req)) {
        next()
    } else {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="example"')
        res.end('Access denied')
    }
}

async function check(userName: string, pass: string, req:any) { // to make use of L23 without typescript disturbing (req.credentials). "hackfix". alternative and annoying solution would be to make an Interface that extends the Request object, with credential field.

    const verifiedUser = await facade.getVerifiedUser(userName, pass)
    if (verifiedUser) {
        req.credentials = {userName: verifiedUser.email, role: verifiedUser.role }
        return true
    }
    return false;
}

export default authMiddleware;