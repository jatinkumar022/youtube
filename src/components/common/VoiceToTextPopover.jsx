import React, { useEffect, useRef, useState } from "react";
import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { MdKeyboardVoice } from "react-icons/md";

const VoiceToTextPopover = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current?.contains(event.target)) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Check if browser supports SpeechRecognition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return (
      <div className="p-4 bg-red-100 text-red-700">
        <p>Your browser does not support speech recognition.</p>
      </div>
    );
  }

  const recognition = new SpeechRecognition();

  // Set properties for recognition
  recognition.lang = "en-US";
  recognition.interimResults = false; // Final results only
  recognition.maxAlternatives = 1;

  // Start listening
  const startListening = () => {
    setIsListening(true);
    setError(null);
    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
    };

    recognition.onerror = (event) => {
      setError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  // Stop listening
  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return (
    <div className="relative">
      {/* Button to Toggle Popover */}
      <MdKeyboardVoice size={22} onClick={() => setIsPopoverOpen(true)} />
      {/* Popover */}
      {isPopoverOpen && (
        <div
          ref={ref}
          className="absolute z-10 mt-2 top-10 right-0 bg-white shadow-lg rounded-lg w-96 dark:bg-[#212121] cursor-default max-[425px]: "
        >
          <div className="p-4 w-full ">
            <div>
              <h1 className="min-[425px]:text-xl font-bold mb-2 text-gray-900 dark:text-gray-200 max-[425px]:text-md">
                Voice to Text
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4 max-[425px]:text-sm">
                Click "Start Listening" and speak. Your speech will be converted
                to text.
              </p>
              {isListening ? (
                <div className="text-gray-600 dark:text-gray-400 mb-4 max-[425px]:text-sm">
                  Listening:
                </div>
              ) : (
                <div className="text-gray-600 dark:text-gray-400 mb-4 max-[425px]:text-sm">
                  Start Listening:
                </div>
              )}
            </div>
            <div className="w-full p-2 border rounded bg-transparent border-none  mb-4 max-[425px]:text-sm">
              {transcript}
            </div>
            <div className="flex justify-center w-full">
              <div className="text-white">
                {isListening ? (
                  <button
                    onClick={stopListening}
                    className="bg-[#717171] p-6  rounded-full max-[425px]:p-3"
                  >
                    <AiOutlineAudioMuted size={37} />
                  </button>
                ) : (
                  <button
                    onClick={startListening}
                    className="bg-[#717171] p-6  rounded-full max-[425px]:p-3"
                  >
                    <AiFillAudio size={37} />
                  </button>
                )}
              </div>
            </div>
            {error && (
              <div className="mt-4 text-red-500">
                <p>Error: {error}</p>
              </div>
            )}
          </div>

          {/* Close Popover */}
          <button
            onClick={() => setIsPopoverOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceToTextPopover;
