import Client from "../db"

export default class QuoteSrvc{
    static async quote(user_id:number, quote:string, quote_id: number){
        try {
            const sql = `INSERT INTO quotes (quote_id, quote, user_id) VALUES('${quote_id}', '${quote}', '${user_id}')`
            const result = await Client.query(sql)
            return result.rows
        } catch (error) {
            console.log(error)
        }
    }
    
    static async quoteNote(user_id:number){
        try {
            console.log("QUOTE NOTE " + user_id)
            const note_Req = `SELECT * FROM notes WHERE ( user_id= ${user_id}) ORDER BY note_id DESC LIMIT 1`;
            const quote_Req = `SELECT * FROM quotes WHERE (user_id= ${user_id}) ORDER BY quote_id DESC LIMIT 1`;
            const note = await Client.query(note_Req);
            const quote = await Client.query(quote_Req);
            const sql = `INSERT INTO quote_notes (quote_id, note_id, user_id) VALUES ('${quote.rows[0].quote_id}','${note.rows[0].note_id}', '${user_id}')`
            const result = await Client.query(sql);
            return result.rows
        } catch (error) {
            console.log(error)
        }
    }
}