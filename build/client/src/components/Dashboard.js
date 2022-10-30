"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
require("./diffStyles.css");
const audio_png_1 = __importDefault(require("../img/audio.png"));
const k_notes_logo_2_png_1 = __importDefault(require("../img/k_notes_logo_2.png"));
const react_bootstrap_1 = require("react-bootstrap");
const NotesBoard_1 = __importDefault(require("./NotesBoard"));
const Calendar_1 = __importDefault(require("./Calendar"));
const axios_1 = __importDefault(require("axios"));
const NewNote_1 = __importDefault(require("./NewNote"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const speech_1 = __importDefault(require("../actions/speech"));
const lib_1 = require("react-share/lib");
const Dashboard = () => {
    //useLocation for public token
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const [logout, setLogout] = (0, react_1.useState)(false);
    const [authenticate, setAuthenticate] = (0, react_1.useState)(location.state);
    const [quotes, setQuotes] = (0, react_1.useState)(Object);
    const [newNote, setNewNote] = (0, react_1.useState)(false);
    const token = (0, jwt_decode_1.default)(location.state);
    const userData = Object.values(token);
    const [refreshBtn, setRefreshBtn] = (0, react_1.useState)(0);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const quoteAPI = process.env.REACT_APP_QUOTEAPI;
    const handleClick = () => {
        setNewNote(current => !current);
    };
    const handleClickLogout = () => {
        window.history.replaceState({}, document.title);
        navigate("/");
    };
    (0, react_1.useEffect)(() => {
        const options = {
            method: 'GET',
            url: 'https://quotes15.p.rapidapi.com/quotes/random/',
            params: { language_code: "en" },
            headers: {
                'X-RapidAPI-Key': quoteAPI,
                'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
            }
        };
        axios_1.default.request(options).then(function (response) {
            setQuotes(response.data);
            setLoading(false);
        }).catch(function (error) {
        });
    }, [refreshBtn, logout]);
    if (authenticate) {
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "center" }, { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "head" }, { children: [(0, jsx_runtime_1.jsx)("img", { src: k_notes_logo_2_png_1.default, alt: "k-notes logo" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ className: "logout", style: { fontWeight: "bolder" }, onClick: handleClickLogout }, { children: "Logout" })), (0, jsx_runtime_1.jsx)("br", {}), loading ? ((0, jsx_runtime_1.jsx)("p", { children: "Loading..." })) : ((0, jsx_runtime_1.jsx)("p", Object.assign({ style: { fontSize: "2.6vh", width: "80%", margin: "auto" } }, { children: quotes.content }))), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ type: "button", onClick: () => setRefreshBtn(refreshBtn + 1) }, { children: "Refresh" })), (0, jsx_runtime_1.jsx)("img", { src: audio_png_1.default, alt: "voice output", onClick: () => (0, speech_1.default)(quotes.content) }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ onClick: handleClick }, { children: "Create Note" })), newNote && ((0, jsx_runtime_1.jsx)(NewNote_1.default, { quotes: quotes }))] })), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)(lib_1.TwitterShareButton, Object.assign({ title: quotes.content, url: "http://localhost:3000" }, { children: (0, jsx_runtime_1.jsx)(lib_1.TwitterIcon, { round: true, size: 36 }) })), (0, jsx_runtime_1.jsx)(lib_1.WhatsappShareButton, Object.assign({ title: quotes.content, url: "http://localhost:3000" }, { children: (0, jsx_runtime_1.jsx)(lib_1.WhatsappIcon, { round: true, size: 36 }) })), (0, jsx_runtime_1.jsx)(lib_1.FacebookShareButton, Object.assign({ quote: quotes.content, url: "http://www.localhost:3000" }, { children: (0, jsx_runtime_1.jsx)(lib_1.FacebookIcon, { round: true, size: 36 }) })), (0, jsx_runtime_1.jsx)(lib_1.RedditShareButton, Object.assign({ title: quotes.content, url: "http://www.localhost:3000" }, { children: (0, jsx_runtime_1.jsx)(lib_1.RedditIcon, { round: true, size: 36 }) })), (0, jsx_runtime_1.jsx)(lib_1.TelegramShareButton, Object.assign({ title: quotes.content, url: "http://www.localhost:3000" }, { children: (0, jsx_runtime_1.jsx)(lib_1.TelegramIcon, { round: true, size: 36 }) }))] }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "parent" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "quotesArea" }, { children: [(0, jsx_runtime_1.jsx)(NotesBoard_1.default, {}), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ className: "btn-info", style: { fontWeight: "bolder" }, onClick: () => navigate("/allnotes", { state: location.state }) }, { children: "All Notes" }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "calendarArea" }, { children: (0, jsx_runtime_1.jsx)(Calendar_1.default, {}) }))] }))] })));
    }
    else
        return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { replace: true, to: "/login" });
};
exports.default = Dashboard;
