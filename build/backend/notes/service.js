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
class NoteSrvc {
    static newNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO notes (subject, note, user_id, date) VALUES ('${note.subject}', '${note.note}', '${note.user_id}', ${note.date})`;
                const result = yield db_1.default.query(sql);
                return result.rows;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static getAll(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM notes WHERE (user_id='${user_id}')`;
                const result = yield db_1.default.query(sql);
                return result.rows;
            }
            catch (error) {
                return null;
            }
        });
    }
    static update(note, note_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `UPDATE notes SET subject = '${note.subject}', note = '${note.note}', date= ${note.date} WHERE (user_id='${note.user_id}') AND (note_id=${note_id})`;
                const result = yield db_1.default.query(sql);
                return result.rows;
            }
            catch (error) {
                return null;
            }
        });
    }
    static lastFive(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM notes WHERE (user_id='${user_id}') ORDER BY date DESC LIMIT 5`;
                const result = yield db_1.default.query(sql);
                return result.rows;
            }
            catch (error) {
                return null;
            }
        });
    }
    static delete(user_id, note_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `DELETE FROM quote_notes WHERE(user_id='${user_id}') AND (note_id='${note_id}')`;
                const slq2 = `DELETE FROM notes WHERE(user_id='${user_id}') AND (note_id='${note_id}')`;
                const result = yield db_1.default.query(sql);
                yield db_1.default.query(slq2);
                return result.rows;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.default = NoteSrvc;
