import { useEffect, useRef, useState } from "react";




// import { useEffect, useRef, useState } from "react";

// function useSpeechToText(options = {}) {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     const SpeechGrammarList =
//       window.SpeechGrammarList || window.webkitSpeechGrammarList;

//     if (!SpeechRecognition) {
//       console.error("SpeechRecognition is not supported.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognitionRef.current = recognition;

//     recognition.interimResults = options.interimResults ?? true;
//     recognition.lang = options.lang || "en-US";
//     recognition.continuous = options.continuous ?? false;

//     if (SpeechGrammarList) {
//       const grammar =
//         "#JSGF V1.0; grammar colors; public <color> = red | green | blue ;";
//       const speechRecognitionList = new SpeechGrammarList();
//       speechRecognitionList.addFromString(grammar, 1);
//       recognition.grammars = speechRecognitionList;
//     }

//     recognition.onresult = (event) => {
//       let text = "";
//       for (let i = event.resultIndex; i < event.results.length; ++i) {
//         text += event.results[i][0].transcript;
//       }
//       setTranscript(text);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     return () => {
//       recognition.stop();
//     };
//   }, [options]);

//   const startListening = () => {
//     if (recognitionRef.current && !isListening) {
//       recognitionRef.current.start();
//       setIsListening(true);
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   return {
//     isListening,
//     transcript,
//     startListening,
//     stopListening,
//   };
// }

// export default useSpeechToText;



function useSpeechToText(options = {}) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const recognitionRef = useRef(null);
  
    useEffect(() => {
      if (!("webkitSpeechRecognition" in window)) {
        console.error("Speech Recognition not supported");
        return;
      }
  
      recognitionRef.current = new window.webkitSpeechRecognition();
      const recognition = recognitionRef.current;
  
      recognition.interimResults = options.interimResults ?? true;
      recognition.lang = options.lang || "en-US";
      recognition.continuous = options.continuous ?? false;
  
      recognition.onresult = (event) => {
        let text = "";
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        setTranscript(text);
      };
  
      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };
  
      recognition.onend = () => {
        setIsListening(false);
      };
  
      return () => {
        recognition.stop();
      };
    }, [options.lang, options.continuous, options.interimResults]);
  
    const startListening = () => {
      if (recognitionRef.current && !isListening) {
        recognitionRef.current.start();
        setIsListening(true);
      }
    };
  
    const stopListening = () => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    };
  
    return { isListening, transcript, startListening, stopListening };
  }
  
  export default useSpeechToText;
  