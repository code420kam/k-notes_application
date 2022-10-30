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
const edit_png_1 = __importDefault(require("../img/edit.png"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const react_router_dom_1 = require("react-router-dom");
const UpdatePopup = ({ note_id, note, index, subject, date }) => {
    const location = (0, react_router_dom_1.useLocation)();
    const [popup, setPopup] = (0, react_1.useState)(false);
    const [updateNote, setUpdateNote] = (0, react_1.useState)();
    const [updateSubject, setUpdateSubject] = (0, react_1.useState)();
    const [quote, setQuote] = (0, react_1.useState)();
    const token = (0, jwt_decode_1.default)(location.state);
    const userData = Object.values(token);
    let val;
    const handleChangeSbjt = (ev) => {
        setUpdateSubject(ev.target.value);
    };
    const handleChangeNote = (ev) => {
        setUpdateNote(ev.target.value);
    };
    const getQuoteID = (node_id) => __awaiter(void 0, void 0, void 0, function* () {
        yield fetch(`http://localhost:8000/quote/single/${note_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": location.state
            }
        }).then((res) => {
            return res.json();
        }).then((resSon) => {
            setQuote(resSon[0].quote);
        });
    });
    // const tt = getQuoteID(note_id)
    (0, react_1.useEffect)(() => {
        getQuoteID(note_id);
    }, [popup]);
    const updateRequest = () => {
        fetch(`http://localhost:8000/note/update/${note_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": location.state
            },
            body: JSON.stringify({
                subject: updateSubject,
                note: updateNote,
                user_id: userData[0]
            })
        })
            .then(function (response) {
            window.location.reload();
        });
    };
    const handleSubmit = (note_id) => __awaiter(void 0, void 0, void 0, function* () {
        setPopup(current => !current);
        if (updateSubject === undefined) {
            return setUpdateSubject(subject);
        }
        if (updateNote === undefined) {
            return setUpdateNote(note);
        }
        yield updateRequest();
    });
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)("img", { src: edit_png_1.default, alt: "edit logo", onClick: () => setPopup(current => !current) }) }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Modal, Object.assign({ show: popup, onHide: () => setPopup(current => !current), "aria-labelledby": "contained-modal-title-vcenter", centered: true }, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal.Header, Object.assign({ closeButton: true }, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal.Title, { children: "Update your Note" }) })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal.Body, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Form.Group, Object.assign({ className: "mp-3" }, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Label, { children: "Origin Quote" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: "text", value: quote, readOnly: true }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Label, { children: "Subject" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { defaultValue: subject, onChange: handleChangeSbjt, type: "text", placeholder: subject, autoFocus: true }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Label, { children: "Note" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { onChange: handleChangeNote, type: "text", placeholder: note })] })) }) }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Modal.Footer, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ type: "submit", variant: "primary", onClick: () => handleSubmit(note_id) }, { children: " Save Changes" })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ variant: "secondary", onClick: () => setPopup(current => !current) }, { children: "Close" }))] })] }))] }));
};
exports.default = UpdatePopup;
