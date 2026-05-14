"use client";

import { useEffect, useRef, useState } from "react";

const photos = [
  "/photos/1.TS-TIN-20260110.jpg",
  "/photos/2.TS-TIN-20260110.jpg",
  "/photos/3.TS-TIN-20260110.jpg",
  "/photos/4.TS-TIN-20260110.jpg",
  "/photos/5.TS-TIN-20260110.jpg",
  "/photos/6.TS-TIN-20260110.jpg",
  "/photos/7.TS-TIN-20260110.jpg",
  "/photos/8.TS-TIN-20260110.jpg",
  "/photos/9.TS-TIN-20260110.jpg",
  "/photos/10.TS-TIN-20260110.jpg",
  "/photos/11.TS-TIN-20260110.jpg",
  "/photos/12.TS-TIN-20260110.jpg",
  "/photos/13.TS-TIN-20260110.jpg",
  "/photos/14.TS-TIN-20260110.jpg",
  "/photos/15.TS-TIN-20260110.jpg",
  "/photos/16.TS-TIN-20260110.jpg",
  "/photos/17.TS-TIN-20260110.jpg",
  "/photos/18.TS-TIN-20260110.jpg",
  "/photos/19.TS-TIN-20260110.jpg",
  "/photos/20.TS-TIN-20260110.jpg",
  "/photos/21.TS-TIN-20260110.jpg",
  "/photos/22.TS-TIN-20260110.jpg",
  "/photos/23.TS-TIN-20260110.jpg",
  "/photos/24.TS-TIN-20260110.jpg",
  "/photos/25.TS-TIN-20260110.jpg",
  "/photos/26.TS-TIN-20260110.jpg",
  "/photos/27.TS-TIN-20260110.jpg",
  "/photos/28.TS-TIN-20260110.jpg",
  "/photos/29.TS-TIN-20260110.jpg",
  "/photos/30.TS-TIN-20260110.jpg",
];

export default function LoveStory() {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 自動播放
  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 5000); // 每5秒切換

    return () => clearInterval(interval);
  }, [started]);

  const start = () => {
    setStarted(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">

      {/* 音樂 */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* 當前照片 */}
      <img
  key={index}
  src={photos[index]}
  className="absolute max-w-full max-h-full object-contain opacity-0 animate-fade mx-auto inset-0 drop-shadow-2xl"
/>

      {/* 遮罩 */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 標題 */}
      <div className="absolute top-10 w-full text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold">
          易見傾心❤️渝生相守
        </h1>
      </div>

      {/* 開始按鈕 */}
      {!started && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={start}
            className="bg-white text-black px-8 py-4 rounded-full text-xl shadow-xl"
          >
            ▶ 開始播放
          </button>
        </div>
      )}
    </div>
  );
}
