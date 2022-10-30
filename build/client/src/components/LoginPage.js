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
const react_bootstrap_1 = require("react-bootstrap");
require("./diffStyles.css");
const k_notes_logo_2_png_1 = __importDefault(require("../img/k_notes_logo_2.png"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const LoginPage = () => {
    const [username, setUsername] = (0, react_1.useState)(String);
    const [password, setPassword] = (0, react_1.useState)();
    const [loginState, setLoginState] = (0, react_1.useState)(Boolean);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleChangeUser = (event) => {
        setUsername(event.target.value);
    };
    const handleChangePw = (event) => {
        setPassword(event.target.value);
    };
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            password: password
        })
    };
    const login = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            yield fetch("http://localhost:8000/user/login", requestOptions).then(res => {
                if (res.ok) {
                    const test = res.text();
                    test.then((res) => {
                        navigate("/dashboard", { replace: true, state: res });
                        return test;
                    });
                }
                else if (res.status === 401) {
                    return setLoginState(true);
                }
            });
        }
        catch (error) {
            return window.alert("Server connection failed...");
        }
    });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "center" }, { children: [(0, jsx_runtime_1.jsx)("img", { src: k_notes_logo_2_png_1.default, alt: "k_notes_logo" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form, Object.assign({ id: "loginForm" }, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Form.Group, Object.assign({ className: "mb-4 w-25", style: { fontWeight: "bolder", margin: "auto" } }, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Label, {}), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: "username", id: "username", onChange: handleChangeUser, placeholder: "Enter username" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: "password", id: "password", onChange: handleChangePw, placeholder: "Enter password", required: true }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ variant: "primary", onClick: login }, { children: "Login" })), " ", (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ variant: "secondary", onClick: () => navigate("/signup") }, { children: "Create Account" }))] })) })), (0, jsx_runtime_1.jsx)("div", { children: loginState && (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "alert alert-danger", role: "alert" }, { children: "Wrong Username or Password. Please try again.. " })) })] })));
};
exports.default = LoginPage;
