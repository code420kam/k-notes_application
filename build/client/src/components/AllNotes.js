"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const axios_1 = __importDefault(require("axios"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const react_router_dom_1 = require("react-router-dom");
require("./diffStyles.css");
const delete_png_1 = __importDefault(require("../img/delete.png"));
const react_collapsible_1 = __importDefault(require("react-collapsible"));
const UpdatePopup_1 = __importDefault(require("./UpdatePopup"));
const AllNotes = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const [notes, setNotes] = (0, react_1.useState)([]);
    const [deleted, setDeleted] = (0, react_1.useState)(false);
    const [authenticate, setAuthenticate] = (0, react_1.useState)(location.state);
    const token = (0, jwt_decode_1.default)(location.state);
    const userData = Object.values(token);
    const user_id = userData[0];
    (0, react_1.useEffect)(() => {
        const options = {
            method: "GET",
            url: `http://localhost:8000/note/${userData[0]}`,
            headers: {
                "authorization": location.state
            }
        };
        axios_1.default.request(options).then(function (response) {
            setNotes(response.data);
        });
    }, []);
    function dateConverter(date) {
        const data = new Date(date * 1);
        return data;
    }
    const handleClickLogout = () => {
        window.history.replaceState({}, document.title);
        navigate("/");
    };
    const deleteQuote = (note_id) => {
        fetch(`http://localhost:8000/note/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": location.state
            },
            body: JSON.stringify({
                user_id: user_id,
                note_id: note_id
            })
        }).then((resp => {
            if (resp.status === 200) {
                setDeleted(true);
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        }));
    };
    if (authenticate) {
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "allNotesContainer", style: { textAlign: "center" } }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "headline" }, { children: "All Notes!" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "logoutBtn" }, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ style: { fontWeight: "bolder", padding: "-80%" }, onClick: handleClickLogout }, { children: "Logout" })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "allNotes" }, { children: (0, jsx_runtime_1.jsxs)("table", Object.assign({ className: "table" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", Object.assign({ scope: "col" }, { children: "#" })), (0, jsx_runtime_1.jsx)("th", Object.assign({ scope: "col" }, { children: "Subject" })), (0, jsx_runtime_1.jsx)("th", Object.assign({ scope: "col" }, { children: "Date" })), (0, jsx_runtime_1.jsx)("th", Object.assign({ scope: "col" }, { children: "Details" }))] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: notes.map((desNote, index) => {
                                    const { note_id, note, subject, date } = desNote;
                                    return ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", Object.assign({ scope: "row" }, { children: index + 1 })), (0, jsx_runtime_1.jsx)("td", { children: subject }), (0, jsx_runtime_1.jsx)("td", { children: dateConverter(date).toLocaleDateString("en") }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsxs)(react_collapsible_1.default, Object.assign({ trigger: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Dropdown, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Dropdown.Toggle, Object.assign({ style: { fontWeight: "bolder" }, variant: "info" }, { children: "Details" }), note_id) }) }, { children: [(0, jsx_runtime_1.jsx)("p", { children: note }), (0, jsx_runtime_1.jsx)(UpdatePopup_1.default, { note_id: note_id, index: index, note: note, subject: subject, date: date }), (0, jsx_runtime_1.jsx)("span", Object.assign({ onClick: () => deleteQuote(note.note_id) }, { children: (0, jsx_runtime_1.jsx)("img", { src: delete_png_1.default, alt: "delete logo" }) })), deleted && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "alert alert-success" }, { children: "\u2713 Successful deleted" }))] }), note_id) })] }, note_id));
                                }) })] })) })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "backBtn" }, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ type: "submit", style: { fontWeight: "bolder" }, variant: "info", onClick: () => navigate("/dashboard", { state: location.state }) }, { children: "Back to Dashboard" })) }))] })));
    }
    else
        return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { replace: true, to: "/login" });
};
exports.default = AllNotes;
