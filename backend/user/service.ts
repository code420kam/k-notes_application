import process from 'process'
import Client from '../db'
import bcrypt from 'bcrypt'
import { Response } from 'express'

export type User = {
    username: string
    password: string
}

export default class UserSrvc {
    static async getPassword(user: User): Promise<User | null> {
        const sql = `SELECT password FROM users WHERE(username='${user.username}')`
        const result = await Client.query(sql)
        const pw = user.password + process.env.SECRET_PW
        try {
            if (bcrypt.compareSync(pw, result.rows[0].password)) {
                return user
            }
        } catch (error) {
            return null
        }
        return null
    }
    static async createUser(user: User): Promise<string | string[]> {
        try {
            console.log(user.username)
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hashSync(user.password + process.env.SECRET_PW, salt)
            const sql = `INSERT INTO users(username, password) VALUES('${user.username}', '${hash}')`
            const result = await Client.query(sql)
            console.log(hash)
            return result.rows
        } catch (error) {
            return `Username already exists. Please choose another`
        }
    }
}
