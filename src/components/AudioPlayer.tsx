"use client";

import { useRef, useState, useEffect } from "react";

interface AudioPlayerProps {
  src: string;
  duration: string;
}

export function AudioPlayer({ src, duration }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrent] = useState("0:00");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      const pct = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(pct) ? 0 : pct);
      const m = Math.floor(audio.currentTime / 60);
      const s = Math.floor(audio.currentTime % 60)
        .toString()
        .padStart(2, "0");
      setCurrent(`${m}:${s}`);
    };

    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      setCurrent("0:00");
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  };

  return (
    <div className="bg-surface-container-low rounded-2xl p-4 flex items-center gap-4 relative z-10">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        type="button"
        onClick={toggle}
        className="shrink-0 w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-primary/20 cursor-pointer relative z-20"
        aria-label={playing ? "Pause" : "Abspielen"}
      >
        <span className="material-symbols-outlined text-2xl pointer-events-none">
          {playing ? "pause" : "play_arrow"}
        </span>
      </button>
      <div className="flex-1">
        <div
          className="h-2 bg-surface-container-highest rounded-full w-full cursor-pointer"
          onClick={seek}
        >
          <div
            className="h-full bg-primary rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-on-surface-variant">{currentTime}</span>
          <span className="text-xs text-on-surface-variant">{duration}</span>
        </div>
      </div>
    </div>
  );
}
