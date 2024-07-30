'use client';

import { useEffect, useRef, useState } from "react";

export default function VoiceRecognition() {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const synthRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = 'id-ID';
        recognitionRef.current.interimResults = false;
        recognitionRef.current.maxAlternatives = 1;

        recognitionRef.current.onresult = function(event) {
            const speechToText = event.results[0][0].transcript;
            console.log('Transcript:', speechToText);
            handleCommand(speechToText);
        };

        recognitionRef.current.onerror = function(event) {
            console.error('Speech recognition error', event.error);
        };

        // Initialize SpeechSynthesis
        synthRef.current = window.speechSynthesis;

        return () => {
            recognitionRef.current.stop();
        };
    }, []);

    useEffect(() => {
        if (isListening) {
            recognitionRef.current.start();
        } else {
            recognitionRef.current.stop();
        }
    }, [isListening]);

    const handleToogleRecording = () => {
        setIsListening(!isListening);
    };

    function handleCommand(text) {
        const lowerText = text.toLowerCase();
        
        const synth = synthRef.current;
        let utterThis = new SpeechSynthesisUtterance();
        utterThis.lang = 'id-ID';

        // Handle commands here...
        if (lowerText.includes("home") || lowerText.includes("menu utama") || lowerText.includes("halaman utama")) {
            window.location.href = '/'; // Navigasi ke halaman utama
        } else if (lowerText.includes("animals") || lowerText.includes("about animals") || lowerText.includes("satwa") || lowerText.includes("tentang satwa") || lowerText.includes("hewan") || lowerText.includes("tentang hewan")) {
            window.location.href = '/animals'; // Navigasi ke /animals
            utterThis.text = "Berikut adalah satwa-satwa yang ada di Kebun Binatang Gembira Loka";
            // utterThis.text = "Here are the animals at Gembira Loka Zoo";
        } else if (lowerText.includes("facilities") || lowerText.includes("public facilities") || lowerText.includes("fasilitas") || lowerText.includes("fasilitas publik") || lowerText.includes("hewan") || lowerText.includes("tentang hewan")) {
            window.location.href = '/public-facilities'; // Navigasi ke /public-facilities
            utterThis.text = "Berikut beberapa fasilitas umum terdekat di area Kebun Binatang Gembira Loka";
        } else if (lowerText.includes("peta") || lowerText.includes("map")) {
            window.location.href = '/maps'; // Navigasi ke /map
            utterThis.text = "Berikut adalah peta Kebun Binatang Gembira Loka";
        } else if (lowerText.includes("food") || lowerText.includes("food store") || lowerText.includes("makan") || lowerText.includes("tempat makan") || lowerText.includes("eat") || lowerText.includes("eating")) {
            window.location.href = '/food-store'; // Navigasi ke /food-store
            utterThis.text = "Berikut beberapa tempat makan terdekat di sekitar Kebun Binatang Gembira Loka";
        } else if (lowerText.includes("nearest animal") || lowerText.includes("hewan terdekat") || lowerText.includes("satwa terdekat")) {
            window.location.href = '/animals/nearest'; // Navigasi ke /animals-nearest
            utterThis.text = "Berikut beberapa hewan terdekat di sekitar Anda";
        } else if (lowerText.includes("nearest facilities") || lowerText.includes("nearest public facilities") || lowerText.includes("fasilitas terdekat") || lowerText.includes("fasilitas publik terdekat") || lowerText.includes("hewan") || lowerText.includes("tentang hewan")) {
            window.location.href = '/public-facilities/nearest'; // Navigasi ke /public-facilities
            utterThis.text = "Berikut beberapa fasilitas umum terdekat di sekitar Anda";
        } else {
            console.log("Kata kunci tidak dikenali");
            alert("Kata kunci tidak dikenali");
            utterThis.text = "Kata kunci tidak dikenali";
        }

        // Speak the response
        synth.speak(utterThis);
    }
    
    return(
        <div className="fixed right-5 top-5 z-100">
            <button
                onClick={handleToogleRecording}
                className={`rounded-full w-16 h-16 flex items-center justify-center ${isListening ? 'bg-red-600' : 'bg-[#DAA520] hover:bg-[#C6951D]'}`}
            >
                {isListening ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24">
                        <rect width="8" height="8" x="8" y="8" fill="white" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2">
                            <rect width="5" height="10" x="9" y="3" rx="3" />
                            <path stroke-linecap="round" d="M5 11a7 7 0 1 0 14 0m-7 10v-2" />
                        </g>
                    </svg>
                )}
            </button>
        </div>
    );
}
