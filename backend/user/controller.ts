import { Request, Response } from 'express'
import { generateUserToken } from '../middleware/auth'
import UserSrvc, { User } from './service'

export default class UserCtrl {
    static async userLogin(req: Request, res: Response): Promise<Response> {
        const user: User = {
            username: req.body.username,
            password: req.body.password,
        }
        if ((await UserSrvc.getPassword(user)) === null) {
            return res.status(401).send('Wrong Username or Password. Please try again..')
        }
        const publicToken = await generateUserToken(user)
        res.header('authorization', publicToken)
        console.log('SUCCESSFULL LOGIN')
        return res.send(publicToken)
    }
    static async create(req: Request, res: Response): Promise<Response> {
        console.log('REQ BODY' + req.body)
        const user: User = {
            username: req.body.username,
            password: req.body.password,
        }
        console.log(user.password)
        console.log(user.username)
        await UserSrvc.createUser(user)
        return res.send(user)
    }
}
