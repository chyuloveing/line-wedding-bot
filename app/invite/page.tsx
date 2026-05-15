"use client";

import { useEffect, useRef, useState } from "react";

const photos = [
  "/photos/2.TS-TIN-20260110.jpg",
  "/photos/9.TS-TIN-20260110.jpg",
  "/photos/23.TS-TIN-20260110.jpg",
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 輪播
  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [started]);

  // 播音樂
  const start = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="bg-white text-gray-800">

      {/* 音樂 */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* 🎬 Hero 婚紗 */}
      <div className="relative h-screen bg-black overflow-hidden">

        <img
          src={photos[index]}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            易鑫 ❤️ 湘渝
          </h1>
          <p className="text-xl">2026.01.10</p>
        </div>

        {!started && (
          <div className="absolute bottom-10 w-full flex justify-center z-20">
            <button
              onClick={start}
              className="bg-white text-black px-6 py-3 rounded-full shadow"
            >
              ▶ 開啟邀請函
            </button>
          </div>
        )}
      </div>

      {/* 💍 婚禮資訊 */}
      <div className="px-6 py-16 space-y-6 max-w-xl mx-auto">

        <div className="bg-pink-50 p-6 rounded-2xl shadow text-center">
          <h2 className="text-xl font-bold mb-2">📅 婚禮時間</h2>
          <p>2026 年 01 月 10 日</p>
          <p>11:30 入席</p>
        </div>

        <div className="bg-pink-50 p-6 rounded-2xl shadow text-center">
          <h2 className="text-xl font-bold mb-2">📍 婚禮地點</h2>
          <p>台北某某飯店</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            className="text-blue-500 underline"
          >
            點我開啟地圖
          </a>
        </div>

      </div>

      {/* 💍 按鈕區 */}
      <div className="px-6 space-y-4 max-w-xl mx-auto">

        <a
          href="/love-story"
          className="block text-center bg-pink-500 text-white py-4 rounded-full text-lg shadow"
        >
          💍 婚紗放閃
        </a>

        <a
          href="/invite"
          className="block text-center bg-white border py-4 rounded-full text-lg shadow"
        >
          💌 電子喜帖
        </a>

      </div>

      {/* 💌 RSVP */}
      <div className="px-6 py-16 max-w-xl mx-auto">

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">

          <h3 className="text-xl font-bold">💌 出席回覆</h3>

          <input id="name" placeholder="姓名" className="w-full border p-3 rounded-lg" />
          <select id="attend" className="w-full border p-3 rounded-lg">
            <option value="yes">會出席</option>
            <option value="no">無法出席</option>
          </select>
          <input id="people" placeholder="人數" className="w-full border p-3 rounded-lg" />

          <button
            onClick={async () => {
              const name = (document.getElementById("name") as HTMLInputElement).value;
              const attend = (document.getElementById("attend") as HTMLSelectElement).value;
              const people = (document.getElementById("people") as HTMLInputElement).value;

              await fetch("/api/rsvp", {
                method: "POST",
                body: JSON.stringify({ name, attend, people }),
              });

              alert("已送出 ❤️");
            }}
            className="w-full bg-pink-500 text-white py-3 rounded-lg"
          >
            送出
          </button>

        </div>

      </div>

      {/* 📸 照片牆入口 */}
      <div className="text-center pb-20">
        <a
          href="/"
          className="text-pink-500 underline"
        >
          📸 查看婚禮照片牆
        </a>
      </div>

    </div>
  );
}
