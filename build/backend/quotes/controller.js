"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
class QuoteCtrl {
    static saveQuote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const typ = {
                quote: req.body.quote,
                quote_id: req.body.quote_id,
                user_id: req.body.user_id,
            };
            yield service_1.default.quote(typ.user_id, typ.quote, typ.quote_id);
            return res.status(200).send('Saved');
        });
    }
    static quoteNoteTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('REQ BODY' + req.body);
            const user_id = req.body.user_id;
            const quote_id = req.body.quote_id;
            yield service_1.default.quoteNote(user_id, quote_id);
            return res.status(200).send('Saved');
        });
    }
    static getSingleQuote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('REQ BODY' + req.body.user_id);
            console.log('REQ BODY NOTE ' + req.body.note_id);
            const user_id = req.body.user_id;
            const note_id = req.params.note_id;
            const quote = yield service_1.default.singleQuote(note_id);
            console.log('NOTEEEEE' + quote);
            return res.status(200).send(quote);
        });
    }
}
exports.default = QuoteCtrl;
