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
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const react_router_dom_1 = require("react-router-dom");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const NewNote = (quotes) => {
    const location = (0, react_router_dom_1.useLocation)();
    const [noteSubject, setNoteSubject] = (0, react_1.useState)("");
    const [note, setNote] = (0, react_1.useState)("");
    const [success, setSuccess] = (0, react_1.useState)(false);
    const token = (0, jwt_decode_1.default)(location.state);
    const userData = Object.values(token);
    const quotePost = () => __awaiter(void 0, void 0, void 0, function* () {
        yield fetch(`http://localhost:8000/quote/quote_post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": location.state
            },
            body: JSON.stringify({
                quote: quotes.quotes.content,
                quote_id: quotes.quotes.id,
                user_id: userData[0]
            })
        });
    });
    const quoteReq = () => __awaiter(void 0, void 0, void 0, function* () {
        yield fetch(`http://localhost:8000/quote/note_quote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": location.state
            },
            body: JSON.stringify({
                user_id: userData[0],
                quote_id: quotes.quotes.id
            })
        });
    });
    const notePost = () => __awaiter(void 0, void 0, void 0, function* () {
        yield fetch("http://localhost:8000/note/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": location.state
            },
            body: JSON.stringify({
                subject: noteSubject,
                note: note,
                user_id: userData[0]
            })
        });
    });
    const handleChangeNote = (event) => {
        event.preventDefault();
        setNote(event.target.value);
    };
    const handleChangeSubject = (event) => {
        event.preventDefault();
        setNoteSubject(event.target.value);
    };
    const handleClick = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        yield quotePost();
        yield notePost();
        yield quoteReq();
        setTimeout(() => {
            setSuccess(true);
            window.location.reload();
        }, 300);
    });
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.FormLabel, { children: [" New Note", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { onChange: handleChangeSubject, value: noteSubject, placeholder: "Enter a subject..." }), (0, jsx_runtime_1.jsx)("textarea", { onChange: handleChangeNote, value: note, placeholder: "Enter your thoughts..." }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ type: "submit", disabled: !note || !noteSubject, onClick: handleClick }, { children: "Submit" })), success && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "alert alert-success" }, { children: "\u2713 Note added successful" }))] }) }) }));
};
exports.default = NewNote;
