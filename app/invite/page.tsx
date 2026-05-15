"use client";

import { useEffect, useRef, useState } from "react";

export default function Invite() {
  const [show, setShow] = useState(false);
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 進場動畫
  useEffect(() => {
    setTimeout(() => setShow(true), 300);
  }, []);

  // 播音樂
  const startMusic = () => {
    setStarted(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white text-gray-800 overflow-hidden">

      {/* 🎵 音樂 */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* 🌸 內容 */}
      <div
        className={`transition-all duration-1000 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* 標題 */}
        <div className="text-center pt-16 mb-10">
          <h1 className="text-4xl font-bold text-pink-500 mb-4">
            💍 婚禮邀請
          </h1>
          <p className="text-lg">誠摯邀請您見證我們的重要時刻 ❤️</p>
        </div>

        {/* 新人 */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold">
            易見 ❤️ 渝生
          </h2>
        </div>

        {/* 卡片區 */}
        <div className="space-y-6 px-6">

          {/* 時間 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-bold mb-2">📅 婚禮時間</h3>
            <p>2026 年 01 月 10 日（六）</p>
            <p>午宴 11:30 入席</p>
          </div>

          {/* 地點 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-bold mb-2">📍 婚禮地點</h3>
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

        {/* 按鈕 */}
        <div className="space-y-4 px-6 mt-10">

          <a
            href="/love-story"
            className="block text-center bg-pink-500 text-white py-4 rounded-full text-lg shadow"
          >
            💍 我們的故事
          </a>

          <a
            href="/"
            className="block text-center bg-white border py-4 rounded-full text-lg shadow"
          >
            📸 婚禮照片牆
          </a>

        </div>

      </div>

      {/* ▶️ 播音樂按鈕（LINE 必要） */}
      {!started && (
        <div className="fixed bottom-6 w-full flex justify-center">
          <button
            onClick={startMusic}
            className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-lg"
          >
            ▶ 播放音樂
          </button>
        </div>
      )}

    </div>
  );
}
