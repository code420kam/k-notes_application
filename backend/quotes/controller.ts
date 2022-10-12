import { Request, Response } from "express";
import QuoteSrvc from "./service";

type Quote = {
    quote_id: number,
    quote: string,
    user_id: number
}

export default class QuoteCtrl{
    static async saveQuote(req: Request, res: Response){
        const typ:Quote = {
            quote: req.body.quote,
            quote_id: req.body.quote_id,
            user_id: req.body.user_id
        }
        await QuoteSrvc.quote( typ.user_id, typ.quote, typ.quote_id)
        return res.status(200).send("Saved")
    }

    static async quoteNoteTable(req: Request, res: Response){
        console.log("REQ BODY" + req.body)
        const user_id = req.body.user_id
        await QuoteSrvc.quoteNote(user_id)
        return res.status(200).send("Saved")
    }
}