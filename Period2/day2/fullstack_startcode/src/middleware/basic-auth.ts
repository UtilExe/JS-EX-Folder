import auth from 'basic-auth'
import compare from 'tsscmp'

import { Request, Response } from "express"
import facade from "../facades/DummyDB-Facade"

const authMiddleware = async function (req: Request, res: Response, next: Function) {
    var credentials = auth(req) // auth retrieves credentials from the request object.

    if (credentials && await check(credentials.name, credentials.pass, req)) {
        next()
    } else {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="example"')
        res.end('Access denied')
    }
}

async function check(name: string, pass: string, req:any) { // to make use of L23 without typescript disturbing (req.credentials). "hackfix". alternative and annoying solution would be to make an Interface that extends the Request object, with credential field.

    const user = await facade.getFriend(name)
    if (user && compare(pass, user.password)) {
        req.credentials = {userName:user.email, role:"user"}
    return true
    }
    return false;
}

export default authMiddleware;