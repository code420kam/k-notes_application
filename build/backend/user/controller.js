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
const auth_1 = require("../middleware/auth");
const service_1 = __importDefault(require("./service"));
class UserCtrl {
    static userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                username: req.body.username,
                password: req.body.password,
            };
            if ((yield service_1.default.getPassword(user)) === null) {
                return res.status(401).send('Wrong Username or Password. Please try again..');
            }
            const publicToken = yield (0, auth_1.generateUserToken)(user);
            res.header('authorization', publicToken);
            console.log('SUCCESSFULL LOGIN');
            return res.send(publicToken);
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('REQ BODY' + req.body);
            const user = {
                username: req.body.username,
                password: req.body.password,
            };
            console.log(user.password);
            console.log(user.username);
            yield service_1.default.createUser(user);
            return res.send(user);
        });
    }
}
exports.default = UserCtrl;
