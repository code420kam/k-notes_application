"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const react_router_dom_1 = require("react-router-dom");
require("./index.css");
const LoginPage_1 = __importDefault(require("./components/LoginPage"));
require("bootstrap/dist/css/bootstrap.min.css");
const Dashboard_1 = __importDefault(require("./components/Dashboard"));
const SignUp_1 = __importDefault(require("./components/SignUp"));
const WelcomePage_1 = __importDefault(require("./components/WelcomePage"));
const NewNote_1 = __importDefault(require("./components/NewNote"));
const AllNotes_1 = __importDefault(require("./components/AllNotes"));
const _404_1 = __importDefault(require("./components/404"));
// import {loginState } from "./components/LoginPage"
const root = client_1.default.createRoot(document.getElementById('root'));
root.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { index: true, element: (0, jsx_runtime_1.jsx)(WelcomePage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(LoginPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/dashboard", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/signup", element: (0, jsx_runtime_1.jsx)(SignUp_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/allnotes", element: (0, jsx_runtime_1.jsx)(AllNotes_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/newnote", element: (0, jsx_runtime_1.jsx)(NewNote_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '*', element: (0, jsx_runtime_1.jsx)(_404_1.default, {}) })] }) }) }));
