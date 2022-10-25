"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const controller_1 = __importDefault(require("./controller"));
exports.default = (0, express_1.Router)()
    .post('/quote_post', [auth_1.auth], controller_1.default.saveQuote)
    .post('/note_quote', [auth_1.auth], controller_1.default.quoteNoteTable)
    .get('/single/:note_id', [auth_1.auth, controller_1.default.getSingleQuote]);
