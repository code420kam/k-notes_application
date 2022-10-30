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
exports.generateUserToken = exports.accessHeader = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const process_1 = __importDefault(require("process"));
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.header('Authorization');
        const secret = process_1.default.env.SECRET_PW;
        if (!token) {
            return res.status(401).send('Access denied. No token provided!');
        }
        if (secret)
            try {
                const verify = jsonwebtoken_1.default.verify(token, secret);
                res.header(verify);
                next();
            }
            catch (error) {
                res.status(401).send('Token is expired please login again.');
                next();
            }
    });
}
exports.auth = auth;
function accessHeader(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        // Pass to next layer of middleware
        next();
    });
}
exports.accessHeader = accessHeader;
const generateUserToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process_1.default.env.SECRET_PW;
    if (secret) {
        const pwReq = `SELECT password FROM users WHERE (username='${user.username}')`;
        const res = yield db_1.default.query(pwReq);
        const pw = user.password + secret;
        if (bcrypt_1.default.compareSync(pw, res.rows[0].password)) {
            const sql = `SELECT * FROM users WHERE (username='${user.username}')`;
            const query = yield db_1.default.query(sql);
            const id = query.rows[0].user_id;
            return jsonwebtoken_1.default.sign({
                id: id,
                username: user.username,
            }, secret, { expiresIn: '6000000' });
        }
        else {
            return 'invalid password!';
        }
    }
    else {
        return 'invalid secret';
    }
});
exports.generateUserToken = generateUserToken;
