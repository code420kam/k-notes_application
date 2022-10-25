"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
require("./diffStyles.css");
const react_collapsible_1 = __importDefault(require("react-collapsible"));
const NotesBoard = () => {
    const [loading, setLoading] = (0, react_1.useState)(true);
    const location = (0, react_router_dom_1.useLocation)();
    const [notes, setNotes] = (0, react_1.useState)(Array);
    const decode = (0, jwt_decode_1.default)(location.state);
    const userId = Object.values(decode);
    const options = {
        method: "GET",
        headers: {
            "authorization": location.state,
            "Content-Type": "application/json"
        }
    };
    (0, react_1.useEffect)(() => {
        fetch(`http://localhost:8000/note/${userId[0]}`, options).then(res => {
            if (res.ok) {
                return res.json();
            }
        })
            .then(res => {
            setNotes(res);
            setLoading(false);
            if (notes.length === 0) {
                setLoading(true);
            }
        });
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Notes" }), (0, jsx_runtime_1.jsx)("div", { children: notes.map((note) => {
                    console.log(note);
                    return ((0, jsx_runtime_1.jsx)("li", Object.assign({ style: { fontWeight: "bolder", color: "#0dcaf0" } }, { children: (0, jsx_runtime_1.jsx)(react_collapsible_1.default, Object.assign({ trigger: note.subject }, { children: (0, jsx_runtime_1.jsx)("p", { children: note.note }) })) }), note.note_id));
                }) })] }));
};
exports.default = NotesBoard;
