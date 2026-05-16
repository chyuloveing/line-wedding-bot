"use client";

import { useEffect, useState } from "react";

type Photo = {
  id: number;
  url: string;
};

export default function LivePage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [current, setCurrent] = useState(0);

  // 音樂播放清單
  const musicList = [
    "/music/Taylor Swift Lover.mp3",
    "/music/not today from me before you.mp3",
    "/music/Canon in Love.mp3",
    "/music/Just Want To Secretly Hide You.mp3",
  ];

  const [musicIndex, setMusicIndex] = useState(0);

  // 抓取照片
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const res = await fetch("/api/photos", {
          cache: "no-store",
        });

        const data = await res.json();

        setPhotos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("照片載入失敗:", error);
      }
    };

    loadPhotos();

    // 每 5 秒更新一次
    const interval = setInterval(loadPhotos, 5000);

    return () => clearInterval(interval);
  }, []);

  // 輪播照片
  useEffect(() => {
    if (photos.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [photos]);

  // 沒有照片時
  if (photos.length === 0) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-widest">
          Tain & Shih Wedding
        </h1>

        <p className="text-xl opacity-80">
          等待賓客上傳照片中...
        </p>

        {/* 音樂播放器 */}
        <audio
          src={musicList[musicIndex]}
          autoPlay
          controls
          onEnded={() => {
            setMusicIndex(
              (prev) => (prev + 1) % musicList.length
            );
          }}
          className="mt-10"
        />
      </main>
    );
  }

  const photo = photos[current];

  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">

      {/* 背景模糊 */}
      <img
        src={photo.url}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover blur-3xl scale-125 opacity-40"
      />

      {/* 黑色遮罩 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 漂浮愛心 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-white/20 text-5xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            ♡
          </span>
        ))}
      </div>

      {/* 主內容 */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-8">

        {/* 標題 */}
        <h1 className="absolute top-10 text-white text-4xl md:text-6xl font-serif tracking-[0.3em] drop-shadow-lg">
          Tain & Shih Wedding
        </h1>

        {/* 主照片 */}
        <div className="max-w-6xl max-h-[75vh] rounded-[2rem] overflow-hidden shadow-2xl bg-white/10 p-4 backdrop-blur-md">
          <img
            src={photo.url}
            alt="live wedding"
            className="max-w-full max-h-[72vh] object-contain rounded-[1.5rem]"
          />
        </div>

        {/* 音樂播放器 */}
        <audio
          src={musicList[musicIndex]}
          autoPlay
          controls
          onEnded={() => {
            setMusicIndex(
              (prev) => (prev + 1) % musicList.length
            );
          }}
          className="absolute bottom-24 z-20"
        />

        {/* 底部文字 */}
        <p className="absolute bottom-8 text-white/80 text-lg md:text-xl tracking-[0.2em]">
          即時婚禮回顧 · Live Photo Wall
        </p>
      </div>
    </main>
  );
}
