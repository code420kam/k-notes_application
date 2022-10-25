"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const controller_1 = __importDefault(require("./controller"));
exports.default = (0, express_1.Router)()
    .patch('/update/:note_id', [auth_1.auth], controller_1.default.updateNote) //update notes
    .post('/create', [auth_1.auth], controller_1.default.newNode) // create new note
    .get('/:user_id', [auth_1.auth], controller_1.default.topFive) // get top five notes
    .delete('/delete', [auth_1.auth], controller_1.default.deleteNote); // delete single note
