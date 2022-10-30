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
const process_1 = __importDefault(require("process"));
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserSrvc {
    static getPassword(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT password FROM users WHERE(username='${user.username}')`;
            const result = yield db_1.default.query(sql);
            const pw = user.password + process_1.default.env.SECRET_PW;
            try {
                if (bcrypt_1.default.compareSync(pw, result.rows[0].password)) {
                    return user;
                }
            }
            catch (error) {
                return null;
            }
            return null;
        });
    }
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(user.username);
                const salt = yield bcrypt_1.default.genSalt(10);
                const hash = yield bcrypt_1.default.hashSync(user.password + process_1.default.env.SECRET_PW, salt);
                const sql = `INSERT INTO users(username, password) VALUES('${user.username}', '${hash}')`;
                const result = yield db_1.default.query(sql);
                console.log(hash);
                return result.rows;
            }
            catch (error) {
                return `Username already exists. Please choose another`;
            }
        });
    }
}
exports.default = UserSrvc;
