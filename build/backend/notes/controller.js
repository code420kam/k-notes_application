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
class NoteCtrl {
    static newNode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const singleNote = {
                subject: req.body.subject,
                note: req.body.note,
                user_id: req.body.user_id,
                date: Date.now(),
            };
            yield service_1.default.newNote(singleNote);
            return res.status(200).send(singleNote);
        });
    }
    static allNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.user_id);
            const notes = yield service_1.default.getAll(req.params.user_id);
            if (notes === null) {
                return res.status(404).send(`There are no Notes`);
            }
            return res.status(200).send(notes);
        });
    }
    static updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = {
                subject: req.body.subject,
                note: req.body.note,
                user_id: req.body.user_id,
                date: Date.now(),
            };
            try {
                console.log(note);
                const note_id = req.params.note_id;
                yield service_1.default.update(note, note_id);
                return res.status(201).send('Successfull updated');
            }
            catch (error) {
                console.log(error);
            }
            res.send(note);
        });
    }
    static deleteNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("request body" + req.)
            console.log(req.params);
            try {
                const user_id = req.body.user_id;
                const note_id = req.body.note_id;
                yield service_1.default.delete(user_id, note_id);
                return res.status(200).send('Successful deleted');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static topFive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params.user_id;
                const data = yield service_1.default.lastFive(user_id);
                return res.status(200).send(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = NoteCtrl;
