// import React, { useState } from "react";
// import useSpeachToText from "../../hooks/useSpeachToText";

// function VoiceInput() {
//   const [textInput, setTextInput] = useState("");
//   const {isListening, transcript, startListening, stopListening} =
//     useSpeachToText({ continuous: true });

//   const startStopListening = () => {
//     isListening ? stopListening() : startListening();
//   };

//   const stopVoiceInput = () => {
//     setTextInput(
//       (prevVal) =>
//         prevVal +
//         (transcript.length ? (prevVal.length ? "" : "") + transcript : "")
//     );
//     stopListening();
//   };

//   return (
//     <div
//       style={{
//         display: "block",
//         margin: "0 auto",
//         width: "400px",
//         textAlign: "center",
//         marginTop: "200px",
//       }}
//     >
//       <button
//         onClick={startStopListening}
//         style={{
//           backgroundColor: isListening ? "#d62d20" : "#008744",
//           color: "white",
//           padding: "10px,20px",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//           transition: "bacckground-color 0.3s ease",
//         }}
//       >
//         {isListening ? " Stop Listening" : "Speak"}
//       </button>
//       <textarea
//         style={{
//           marginTop: "20px",
//           width: "100%",
//           height: "150px",
//           padding: "10px",
//           border: "1px solid #ccc",
//           borderRadius: "5px",
//           transition: "all 0.3s ease",
//           resize: "none",
//           backgroundColor: "#f8f8f8",
//           color: "#333",
//         }}
//         disabled={isListening}
//         value={
//           isListening
//             ? textInput +
//               (transcript.length
//                 ? (textInput.length ? " " : "") + transcript
//                 : "")
//             : textInput
//         }
//         onChange={(e) => setTextInput(e.target.value)}
//       />
//     </div>
//   );
// }

// export default VoiceInput;

import React, { useState } from "react";
import useSpeechToText from "../../hooks/useSpeachToText";

function VoiceInput() {
  const [textInput, setTextInput] = useState("");
  const [lang, setLang] = useState("en-US");

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
  } = useSpeechToText({ continuous: true, lang });

  const startStopListening = () => {
    isListening ? stopListening() : startListening();
  };

  const stopVoiceInput = () => {
    setTextInput((prevVal) =>
      prevVal + (transcript ? (prevVal ? " " : "") + transcript : "")
    );
    stopListening();
  };

  return (
    <div
      style={{
        display: "block",
        margin: "0 auto",
        width: "400px",
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      {/* Language Selector */}
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
        disabled={isListening} // disable switching during speech
      >
        <option value="en-US">English</option>
        <option value="fa-IR">Persian (فارسی)</option>
      </select>

      {/* Start/Stop Button */}
      <button
        onClick={startStopListening}
        style={{
          backgroundColor: isListening ? "#d62d20" : "#008744",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          marginLeft: "10px",
        }}
      >
        {isListening ? "Stop Listening" : "Speak"}
      </button>

      {/* Text Area */}
      <textarea
        style={{
          marginTop: "20px",
          width: "100%",
          height: "150px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          resize: "none",
          backgroundColor: "#f8f8f8",
          color: "#333",
          direction: lang === "fa-IR" ? "rtl" : "ltr",
          textAlign: lang === "fa-IR" ? "right" : "left",
        }}
        disabled={isListening}
        value={
          isListening
            ? textInput +
              (transcript.length ? (textInput.length ? " " : "") + transcript : "")
            : textInput
        }
        onChange={(e) => setTextInput(e.target.value)}
      />
    </div>
  );
}

export default VoiceInput;

