"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_bootstrap_1 = require("react-bootstrap");
const react_router_dom_1 = require("react-router-dom");
const k_notes_logo_2_png_1 = __importDefault(require("../img/k_notes_logo_2.png"));
const NotFound = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { textAlign: "center" } }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Error 404:" }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h1", { children: "Page not found" }) }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ onClick: () => navigate("/") }, { children: " Back to home " })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("img", { src: k_notes_logo_2_png_1.default, alt: "k-notes logo" })] })));
};
exports.default = NotFound;
