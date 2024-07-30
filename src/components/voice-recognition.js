'use client';

import { useEffect, useRef, useState } from "react";

export default function VoiceRecognition() {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

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
        // Handle commands here...
        if (lowerText.includes("home") || lowerText.includes("menu utama")) {
            window.location.href = '/'; // Navigasi ke halaman utama
        } else if (lowerText.includes("animals") || lowerText.includes("about animals") || lowerText.includes("satwa") || lowerText.includes("tentang satwa") || lowerText.includes("hewan") || lowerText.includes("tentang hewan")) {
            window.location.href = '/animals'; // Navigasi ke /animals
        } else if (lowerText.includes("facilities") || lowerText.includes("public facilities") || lowerText.includes("fasilitas") || lowerText.includes("fasilitas publik") || lowerText.includes("hewan") || lowerText.includes("tentang hewan")) {
            window.location.href = '/public-facilities'; // Navigasi ke /public-facilities
        } else if (lowerText.includes("peta") || lowerText.includes("map")) {
            window.location.href = '/maps'; // Navigasi ke /map
        } else if (lowerText.includes("food") || lowerText.includes("food store") || lowerText.includes("makan") || lowerText.includes("tempat makan") || lowerText.includes("hewan") || lowerText.includes("tentang hewan")) {
            window.location.href = '/food-store'; // Navigasi ke /food-store
        } else if (lowerText.includes("nearest animal") || lowerText.includes("hewan terdekat") || lowerText.includes("satwa terdekat")) {
            window.location.href = '/animals/nearest'; // Navigasi ke /animals-nearest
        } else if (lowerText.includes("nearest facilities") || lowerText.includes("nearest public facilities") || lowerText.includes("fasilitas terdekat") || lowerText.includes("fasilitas publik terdekat") || lowerText.includes("hewan") || lowerText.includes("tentang hewan")) {
            window.location.href = '/public-facilities/nearest'; // Navigasi ke /public-facilities
        } else if (lowerText.includes("burung")) {
            window.location.href = '/animals/category/zona-burung'; // Navigasi ke /animals/category/zona-burung
        } else if (lowerText.includes("cakar")) {
            window.location.href = '/animals/category/zona-cakar'; // Navigasi ke /animals/category/zona-cakar
        } else if (lowerText.includes("mamalia")) {
            window.location.href = '/animals/category/zona-mamalia'; // Navigasi ke /animals/category/zona-mamalia
        } else if (lowerText.includes("petting")) {
            window.location.href = '/animals/category/zona-petting-zoo'; // Navigasi ke /animals/category/zona-petting-zoo
        } else if (lowerText.includes("/animals/category/zona-primata")) {
            window.location.href = '/animals/categories'; // Navigasi ke /animals/category/zona-primata
        } else if (lowerText.includes("reptil")) {
            window.location.href = '/animals/category/zona-reptil'; // Navigasi ke /animals/category/zona-reptil
        } else {
            console.log("Kata kunci tidak dikenali");
            alert("Kata kunci tidak dikenali");
        }
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