import { Request, Response } from "express";
import NoteSrvc, {Note} from "./service"

export default class NoteCtrl{
    static async newNode(req: Request, res: Response): Promise<Response>{
        const singleNote: Note = {
            subject: req.body.subject,
            note: req.body.note,
            user_id: req.body.user_id,
            date: Date.now()
        }
        await NoteSrvc.newNote(singleNote)
        return res.status(200).send(singleNote)
    }
    static async allNotes(req: Request, res: Response): Promise<Response>{
        console.log(req.params.user_id)
        const notes = await NoteSrvc.getAll(req.params.user_id)

        if(notes === null){
            return res.status(404).send(`There are no Notes`)
        }
        return res.status(200).send(notes);
    }
    static async updateNote(req: Request, res: Response): Promise<Response | undefined>{
        const note: Note = {
            subject : req.body.subject,
            note : req.body.note,
            user_id: req.body.user_id,
            date: Date.now()
        }
        try {
            console.log(note)   
            const note_id = req.params.note_id
            await NoteSrvc.update(note, note_id)
            return res.status(201).send("Successfull updated")
        } catch (error) {
            console.log(error)
        }
        res.send(note)
    }
    static async deleteNote(req: Request, res: Response):Promise<Response|undefined>{
        // console.log("request body" + req.)
        console.log(req.params)
        
        try {
            const user_id = req.body.user_id
            const note_id = req.body.note_id
            await NoteSrvc.delete(user_id, note_id)
            return res.status(200).send("Successful deleted")
        } catch (error) {
            console.log(error)
        }
    }
    static async topFive(req: Request, res: Response):Promise<Response|undefined>{
        try {
            const user_id = req.params.user_id
            const data = await NoteSrvc.lastFive(user_id)
            return res.status(200).send(data)
        } catch (error) {
            console.log(error)
        }
    }
}