const speech = (quoteData: string):void => {

    const synth = window.speechSynthesis;

    const utterance = new SpeechSynthesisUtterance(quoteData);
    console.log(typeof(synth.speak(utterance)))
    return synth.speak(utterance)
}

export default speech;