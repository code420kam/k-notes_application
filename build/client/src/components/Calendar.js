"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_multi_date_picker_1 = require("react-multi-date-picker");
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
require("./calendar.css");
const Calendary = () => {
    const location = (0, react_router_dom_1.useLocation)();
    const decode = (0, jwt_decode_1.default)(location.state);
    const userId = Object.values(decode);
    const [date, setDate] = (0, react_1.useState)([]);
    const options = {
        method: "GET",
        url: `http://localhost:8000/note/${userId[0]}`,
        headers: {
            "authorization": location.state,
            "Content-Type": "application/json"
        }
    };
    (0, react_1.useEffect)(() => {
        axios_1.default.request(options).then(function (response) {
            setDate(response.data);
        });
    }, []);
    const dateRange = date.map((data, index) => {
        console.log(typeof (date));
        return new Date(data.date * 1);
    });
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Calendar" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { marginLeft: "30%" } }, { children: (0, jsx_runtime_1.jsx)(react_multi_date_picker_1.Calendar, { className: 'customCalendar', multiple: true, value: dateRange, readOnly: true }) }))] }));
};
exports.default = Calendary;
