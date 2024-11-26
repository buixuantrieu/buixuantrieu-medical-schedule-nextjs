// "use client";

import PostForm from "./post-form";

// import React, { useState, useEffect, useCallback, useRef } from "react";

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// export default function VoiceToText() {
//   const [transcript, setTranscript] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef<any | null>(null);

//   useEffect(() => {
//     if (!SpeechRecognition) {
//       console.error("SpeechRecognition is not supported by your browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.lang = "vi-VN";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onresult = (event: any) => {
//       let currentTranscript = "";
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         currentTranscript += event.results[i][0].transcript;
//       }
//       setTranscript(currentTranscript);
//     };

//     (recognition.onstart = () => {
//       setIsListening(true);

//       recognition.onend = () => {
//         setIsListening(false);
//       };

//       recognitionRef.current = recognition;
//       return () => {
//         recognition.abort();
//       };
//     }),
//       [];
//   });

//   const startListening = useCallback(() => {
//     recognitionRef.current?.start();
//   }, []);

//   return (
//     <div>
//       <h1>Chuyển Giọng Nói Thành Văn Bản</h1>
//       <div>
//         <p>
//           <strong>Văn bản nhận diện:</strong>
//         </p>
//         <textarea value={transcript} readOnly rows={6} cols={50}></textarea>
//       </div>
//       <div>
//         <button onClick={startListening} disabled={isListening}>
//           {isListening ? "Đang Lắng Nghe..." : "Bắt Đầu Lắng Nghe"}
//         </button>
//       </div>
//     </div>
//   );
// }
export default function Ol() {
  return <PostForm />;
}
