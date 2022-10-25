"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const k_notes_logo_2_png_1 = __importDefault(require("../img/k_notes_logo_2.png"));
const react_bootstrap_1 = require("react-bootstrap");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const SignUp = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [username, setUsername] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [sPassword, setSPassword] = (0, react_1.useState)("");
    const [message, setMessage] = (0, react_1.useState)("");
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            password: password
        })
    };
    function checkPassword() {
        if (password === sPassword) {
            return false;
        }
        return true;
    }
    function sendForm(e) {
        e.preventDefault();
        fetch("http://localhost:8000/user/create", requestOptions)
            .then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(res => {
            navigate("/login");
            window.alert("Account successfull created. Please Login");
        });
    }
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "center" }, { children: [(0, jsx_runtime_1.jsx)("img", { src: k_notes_logo_2_png_1.default, alt: "k_notes_logo" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form, Object.assign({ id: "signup-form", onSubmit: (e) => sendForm(e) }, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Form.Group, Object.assign({ className: "mb-4 w-25", style: { fontWeight: "bolder", margin: "auto" } }, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Label, {}), "Enter a username", (0, jsx_runtime_1.jsx)("h2", { children: "Was geht ab " }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: "username", id: "username", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "min 5 char", required: true }), "Enter a password", (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "min 5 char", required: true }), "Reenter previous password", (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: "password", value: sPassword, onChange: (e) => setSPassword(e.target.value), placeholder: "min 5 char", required: true }), (0, jsx_runtime_1.jsx)("div", { children: checkPassword() && (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "alert alert-danger", role: "alert" }, { children: "Wrong Username or Password. Please try again.. " })) }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ disabled: password.length < 5 || sPassword.length < 5 || username.length < 5, type: "submit", variant: "success" }, { children: "Create Account" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "message" }, { children: message ? (0, jsx_runtime_1.jsx)("p", { children: message }) : null }))] })) }))] })));
};
exports.default = SignUp;
