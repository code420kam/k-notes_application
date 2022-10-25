"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv/config");
const process_1 = __importDefault(require("process"));
const { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_URL, POSTGRES_USER, ENV, POSTGRES_TEST_DB } = process_1.default.env;
let Client = new pg_1.Pool();
if (ENV === 'dev') {
    Client = new pg_1.Pool({
        host: POSTGRES_URL,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
if (ENV === 'test') {
    Client = new pg_1.Pool({
        host: POSTGRES_URL,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
console.log('ENV= ' + ENV);
exports.default = Client;
