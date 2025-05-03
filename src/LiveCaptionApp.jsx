import React, { useEffect, useRef, useState } from 'react';

const LiveCaptionApp = () => {
  const [language, setLanguage] = useState('en-US'); // or 'fa-IR'
  const [caption, setCaption] = useState('');
  const recognitionRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const vadIntervalRef = useRef(null);

  useEffect(() => {
    const setup = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        // Setup AudioContext and analyser
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        const dataArray = new Uint8Array(analyser.fftSize);
        source.connect(analyser);

        // SpeechRecognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          alert('SpeechRecognition is not supported in this browser.');
          return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = language;
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join('');
          setCaption(transcript);
        };

        recognition.onerror = (e) => console.error('Recognition error', e);

        recognitionRef.current = recognition;

        // Simple VAD: check audio level every 200ms
        vadIntervalRef.current = setInterval(() => {
          analyser.getByteTimeDomainData(dataArray);
          const volume = dataArray.reduce((acc, val) => acc + Math.abs(val - 128), 0) / dataArray.length;

          if (volume > 10) {
            if (recognitionRef.current) recognitionRef.current.start();
          } else {
            if (recognitionRef.current) recognitionRef.current.stop();
          }
        }, 500);
      } catch (err) {
        console.error('Mic access error:', err);
      }
    };

    setup();

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      clearInterval(vadIntervalRef.current);
    };
  }, [language]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>🎤 Live Caption App</h2>
      <label>
        Choose Language:{' '}
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="en-US">English</option>
          <option value="fa-IR">Persian</option>
        </select>
      </label>
      <div style={{ marginTop: '2rem', fontSize: '1.5rem', border: '1px solid gray', padding: '1rem', borderRadius: '8px' }}>
        {caption || 'Start speaking...'}
      </div>
    </div>
  );
};

export default LiveCaptionApp;
