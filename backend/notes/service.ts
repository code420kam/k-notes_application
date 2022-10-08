import Client from "../db"


export type Note= {
    subject: string,
    note: string,
    user_id: number,
    date: number
}

export default class NoteSrvc{
     static async newNote(note: Note):Promise<string[] | undefined>{
        try {
            
            const sql= `INSERT INTO notes (subject, note, user_id, date) VALUES ('${note.subject}', '${note.note}', '${note.user_id}', ${note.date})`
            const result = await Client.query(sql)
            return result.rows
        } catch (error) {
            console.log(error)
        }
    }
    static async getAll(user_id:string):Promise<string[]|null>{
        try {
            const sql = `SELECT * FROM notes WHERE (user_id='${user_id}')`
            const result = await Client.query(sql);
            return result.rows
        } catch (error) {
            return null
        }
    }
    static async update(note: Note, note_id:string):Promise<null|string[]>{
        try {
            const sql = `UPDATE notes SET subject = '${note.subject}', note = '${note.note}', date= ${note.date} WHERE (user_id='${note.user_id}') AND (note_id=${note_id})`
            const result = await Client.query(sql)
            return result.rows
            
        } catch (error) {
            return null
        }
    }

    static async lastFive(user_id:string):Promise<null|string[]>{
        try {
            const sql = `SELECT * FROM notes WHERE (user_id='${user_id}') ORDER BY date DESC LIMIT 5`
            const result = await Client.query(sql)
            return result.rows
        } catch (error) {
            return null
        }
    }

    static async delete(user_id: string, note_id:any):Promise<null|string[]>{
        try {
            const sql = `DELETE FROM quote_notes WHERE(user_id='${user_id}') AND (note_id='${note_id}')`
            const slq2 =`DELETE FROM notes WHERE(user_id='${user_id}') AND (note_id='${note_id}')` 
            const result = await Client.query(sql)
            await Client.query(slq2)
            return result.rows
        } catch (error) {
            return null
        }
    }
}