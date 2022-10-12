import { Router } from "express";
import { auth } from "../middleware/auth";
import QuoteCtrl from "./controller";

export default Router()
.post("/quote_post", [auth], QuoteCtrl.saveQuote)
.post("/note_quote", [auth], QuoteCtrl.quoteNoteTable)