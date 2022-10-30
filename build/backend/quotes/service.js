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
const db_1 = __importDefault(require("../db"));
class QuoteSrvc {
    static quote(user_id, quote, quote_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO quotes (quote_id, quote, user_id) VALUES('${quote_id}', '${quote}', '${user_id}')`;
                const result = yield db_1.default.query(sql);
                return result.rows;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static quoteNote(user_id, quote_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('QUOTE NOTE ' + user_id);
                console.log('QUOTE ID' + quote_id);
                const note_Req = `SELECT * FROM notes WHERE ( user_id= ${user_id}) ORDER BY note_id DESC LIMIT 1`;
                const quote_Req = `SELECT * FROM quotes WHERE (user_id= ${user_id}) ORDER BY quote_id DESC LIMIT 1`;
                const note = yield db_1.default.query(note_Req);
                const quote = yield db_1.default.query(quote_Req);
                const sql = `INSERT INTO quote_notes (quote_id, note_id, user_id) VALUES ('${quote_id}','${note.rows[0].note_id}', '${user_id}')`;
                const result = yield db_1.default.query(sql);
                return result.rows;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static singleQuote(note_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quoteReq = `SELECT quote_id FROM quote_notes WHERE (note_id=${note_id})`;
                const result = yield db_1.default.query(quoteReq);
                const sql = `SELECT quote FROM quotes WHERE (quote_id=${result.rows[0].quote_id})`;
                const newRes = yield db_1.default.query(sql);
                return newRes.rows;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = QuoteSrvc;
