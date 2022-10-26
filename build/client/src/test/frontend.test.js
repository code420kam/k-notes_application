"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const history_1 = require("history");
const react_1 = require("@testing-library/react");
const LoginPage_1 = __importDefault(require("../components/LoginPage"));
describe("frontend test", () => {
    const history = (0, history_1.createMemoryHistory)({ initialEntries: ["/"] });
    const Test = () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: (0, jsx_runtime_1.jsx)(LoginPage_1.default, {}) }));
    };
    console.log(Test);
});
