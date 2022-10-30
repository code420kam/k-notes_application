"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const speech = (quoteData) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(quoteData);
    console.log(typeof (synth.speak(utterance)));
    return synth.speak(utterance);
};
exports.default = speech;
