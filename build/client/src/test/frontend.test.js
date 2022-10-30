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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("@testing-library/react");
const WelcomePage_1 = __importDefault(require("../components/WelcomePage"));
const LoginPage_1 = __importDefault(require("../components/LoginPage"));
const Dashboard_1 = __importDefault(require("../components/Dashboard"));
const SignUp_1 = __importDefault(require("../components/SignUp"));
const AllNotes_1 = __importDefault(require("../components/AllNotes"));
const _404_1 = __importDefault(require("../components/404"));
describe("frontend snapshot test", () => {
    it("login page test", () => __awaiter(void 0, void 0, void 0, function* () {
        const Test = () => {
            (0, react_1.render)((0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: (0, jsx_runtime_1.jsx)(LoginPage_1.default, {}) }));
        };
        expect(Test).toMatchSnapshot();
    }));
    it("Welcome page test", () => __awaiter(void 0, void 0, void 0, function* () {
        const Test = () => {
            (0, react_1.render)((0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: (0, jsx_runtime_1.jsx)(WelcomePage_1.default, {}) }));
        };
        expect(Test).toMatchSnapshot();
    }));
    it("Dashboard test", () => __awaiter(void 0, void 0, void 0, function* () {
        const Test = () => {
            (0, react_1.render)((0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: (0, jsx_runtime_1.jsx)(Dashboard_1.default, {}) }));
        };
        expect(Test).toMatchSnapshot();
    }));
    it("Sign up Page test", () => __awaiter(void 0, void 0, void 0, function* () {
        const Test = () => {
            (0, react_1.render)((0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: (0, jsx_runtime_1.jsx)(SignUp_1.default, {}) }));
        };
        expect(Test).toMatchSnapshot();
    }));
    it("All notes page test", () => __awaiter(void 0, void 0, void 0, function* () {
        const Test = () => {
            (0, react_1.render)((0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: (0, jsx_runtime_1.jsx)(AllNotes_1.default, {}) }));
        };
        expect(Test).toMatchSnapshot();
    }));
    it("404 page test", () => __awaiter(void 0, void 0, void 0, function* () {
        const Test = () => {
            (0, react_1.render)((0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: (0, jsx_runtime_1.jsx)(_404_1.default, {}) }));
        };
        expect(Test).toMatchSnapshot();
    }));
});
