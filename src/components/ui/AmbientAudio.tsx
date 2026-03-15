"use client";

import { useState, useRef, useEffect } from "react";

export default function AmbientAudio() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create an audio element for the Interstellar mp3
        const audio = new Audio('/audio/interstellar.mp3');
        audio.loop = true;
        audio.volume = 0; // Start at 0 for fade in
        audioRef.current = audio;

        // Show button after a delay (Easter egg discovery)
        const timer = setTimeout(() => setIsVisible(true), 5000);

        return () => {
            clearTimeout(timer);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }
        };
    }, []);

    const handleToggle = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            // Fade out
            setIsPlaying(false);
            const fadeOut = setInterval(() => {
                if (audio.volume > 0.05) {
                    audio.volume -= 0.05;
                } else {
                    audio.pause();
                    clearInterval(fadeOut);
                }
            }, 100);
        } else {
            // Fade in
            setIsPlaying(true);
            audio.play().catch(e => console.error("Audio playback failed:", e));
            const fadeIn = setInterval(() => {
                if (audio.volume < 0.3) { // Max volume
                    audio.volume += 0.05;
                } else {
                    clearInterval(fadeIn);
                }
            }, 100);
        }
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={handleToggle}
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 cursor-none"
            style={{
                background: isPlaying ? "rgba(255, 59, 0, 0.15)" : "rgba(255, 255, 255, 0.05)",
                border: `1px solid ${isPlaying ? "rgba(255, 59, 0, 0.4)" : "rgba(255, 255, 255, 0.1)"}`,
                boxShadow: isPlaying ? "0 0 20px rgba(255, 59, 0, 0.2)" : "none",
            }}
            title={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
        >
            {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF3B00" strokeWidth="1.5">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
            ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
            )}
        </button>
    );
}
