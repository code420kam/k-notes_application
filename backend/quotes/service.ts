import Client from "../db"

export default class QuoteSrvc{
    static async quote(user_id:number, quote:string, quote_id: number){
        try {
            const sql = `INSERT INTO quotes (quote_id, quote, user_id) VALUES(${quote_id}, '${quote}', ${user_id})`
            const result = await Client.query(sql)
            return result.rows
        } catch (error) {
            console.log(error)
        }
    }
}