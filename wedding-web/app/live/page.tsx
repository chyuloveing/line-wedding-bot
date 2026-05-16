"use client";

import { useEffect, useState } from "react";

type Photo = {
  id: number;
  url: string;
};

export default function LivePage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [current, setCurrent] = useState(0);

  // 每 5 秒重新抓最新照片
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const res = await fetch("/api/photos", { cache: "no-store" });
        const data = await res.json();
        setPhotos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("載入照片失敗", error);
      }
    };

    loadPhotos();
    const interval = setInterval(loadPhotos, 5000);

    return () => clearInterval(interval);
  }, []);

  // 每 4 秒換下一張
  useEffect(() => {
    if (photos.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [photos]);

  if (photos.length === 0) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-5xl font-serif mb-6">Tain & Shih Wedding</h1>
          <p className="text-xl opacity-80">等待賓客上傳照片中...</p>
        </div>
      </main>
    );
  }

  const photo = photos[current];

  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* 背景模糊圖 */}
      <img
        src={photo.url}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover blur-3xl scale-125 opacity-40"
      />

      {/* 漸層遮罩 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 漂浮愛心 */}
      <div className="absolute inset-0 pointer-events-none">
        {["♡", "♡", "♡", "♡", "♡", "♡"].map((heart, i) => (
          <span
            key={i}
            className="absolute text-white/30 text-5xl animate-bounce"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {heart}
          </span>
        ))}
      </div>

      {/* 主照片 */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-8">
        <h1 className="absolute top-10 text-white text-4xl md:text-6xl font-serif tracking-widest drop-shadow-lg">
          Tain & Shih Wedding
        </h1>

        <div className="max-w-5xl max-h-[75vh] rounded-[2rem] overflow-hidden shadow-2xl bg-white/10 p-3 animate-pulse">
          <img
            src={photo.url}
            alt="wedding live"
            className="max-w-full max-h-[72vh] object-contain rounded-[1.5rem]"
          />
        </div>

        <p className="absolute bottom-10 text-white/80 text-xl tracking-widest">
          即時婚禮回顧 · Live Photo Wall
        </p>
      </div>
    </main>
  );
}