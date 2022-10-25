"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_bootstrap_1 = require("react-bootstrap");
const img_gif_1 = __importDefault(require("../img/img.gif"));
require("./diffStyles.css");
const react_router_dom_1 = require("react-router-dom");
const WelcomePage = () => {
    const location = (0, react_router_dom_1.useLocation)();
    const navigation = (0, react_router_dom_1.useNavigate)();
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "center", style: { backgroundColor: "#4BB0FE" } }, { children: [(0, jsx_runtime_1.jsx)("img", { src: img_gif_1.default, alt: "K-Notes Logo" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("h1", { children: "a simple way to store all of your thoughts, notes and more" }), (0, jsx_runtime_1.jsx)("h2", { children: "Stay motivated with K-Notes, and keep up with the daily quotes!" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ onClick: () => navigation("/login") }, { children: "Login" })), " ", (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ onClick: () => navigation("/signup") }, { children: "Sign up for free" }))] })));
};
exports.default = WelcomePage;
