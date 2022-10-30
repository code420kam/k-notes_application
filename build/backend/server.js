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
exports.closeServer = exports.server = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const process_1 = __importDefault(require("process"));
const router_1 = __importDefault(require("./user/router"));
const router_2 = __importDefault(require("./notes/router"));
const router_3 = __importDefault(require("./quotes/router"));
const auth_1 = require("./middleware/auth");
const app = (0, express_1.default)();
const port = process_1.default.env.SERVER_PORT;
app.use(body_parser_1.default.json());
app.use('/user', [auth_1.accessHeader], router_1.default);
app.use('/note', [auth_1.accessHeader], router_2.default);
app.use('/quote', [auth_1.accessHeader], router_3.default);
exports.server = app.listen(port, () => {
    console.log(`Listen to port ${port}`);
});
const closeServer = () => __awaiter(void 0, void 0, void 0, function* () { return yield exports.server.close(); });
exports.closeServer = closeServer;
exports.default = app;
