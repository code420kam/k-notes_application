"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const payload = (payloadData) => {
    const newData = (0, jwt_decode_1.default)(payloadData);
    return newData;
};
exports.default = payload;
