"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const server_1 = __importStar(require("../../../backend/server"));
const supertest_1 = __importDefault(require("supertest"));
const auth_1 = require("../../../backend/middleware/auth");
const request = (0, supertest_1.default)(server_1.default);
let token;
const user = {
    username: "admin",
    password: "admin123"
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const userToken = jest.fn(auth_1.generateUserToken);
    token = yield userToken(user);
}));
describe("endpoint testing", () => {
    test("successfull user login", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.post("/user/login");
        req.send({
            username: user.username,
            password: user.password
        });
        expect((yield req).status).toBe(200);
    }));
    test("user login fail", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.post("/user/login");
        req.send({
            username: user.username,
            password: "wrongpassword"
        });
        expect((yield req).status).toBe(401);
    }));
    test("create new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.post("/user/create");
        req.send({
            username: "test-user",
            password: "testpassword"
        });
        expect((yield req).status).toBe(200);
    }));
    test("wrong enpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.get("/wrongenpoint");
        expect((yield req).status).toBe(404);
    }));
    test("notes endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.get("/note/:1");
        req.set("authorization", token);
        expect((yield req).status).toBe(200);
    }));
    test("note endpoint without authorization", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.get("/note/:1");
        expect((yield req).status).toBe(401);
    }));
    test("quotes endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.post("/quote/quote_post");
        req.set("authorization", token);
        req.send({
            qote: "testquote",
            quote_id: "011",
            user_id: 1
        });
        expect((yield req).status).toBe(200);
    }));
    test("get single quote", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.get("/quote/single/:1");
        req.set("authorization", token);
        expect((yield req).status).toBe(200);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, server_1.closeServer)();
}));
