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

  const [attend, setAttend] = useState("yes");
  const [child, setChild] = useState(0);
  const [veg, setVeg] = useState(false);
  const [loading, setLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 輪播
  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [started]);

  // 音樂
  const start = () => {
    setStarted(true);
    audioRef.current?.play().catch(() => {});
  };

  // RSVP 送出
  const handleSubmit = async () => {
    setLoading(true);

    const data = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      relation: (document.getElementById("relation") as HTMLSelectElement).value,
      attend,
      adult: (document.getElementById("adult") as HTMLInputElement)?.value,
      child,
      kidSeat: (document.getElementById("kidSeat") as HTMLInputElement)?.value,
      vegetarian: veg
        ? (document.getElementById("vegCount") as HTMLInputElement)?.value
        : 0,
      message: (document.getElementById("message") as HTMLTextAreaElement).value,
    };

    await fetch("/api/rsvp", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setLoading(false);
    alert("💌 已送出祝福 ❤️");
  };

  return (
    <div className="bg-white text-gray-800">

      {/* 音樂 */}
      <audio ref={audioRef} src="/music/Lover.mp3" loop />

      {/* Hero */}
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

      {/* 婚禮資訊 */}
      <div className="px-6 py-16 space-y-6 max-w-xl mx-auto">
        <div className="bg-pink-50 p-6 rounded-2xl shadow text-center">
          <h2 className="text-xl font-bold mb-2">📅 婚禮時間</h2>
          <p>2026 年 01 月 10 日</p>
          <p>11:30 入席</p>
        </div>

        <div className="bg-pink-50 p-6 rounded-2xl shadow text-center">
          <h2 className="text-xl font-bold mb-2">📍 婚禮地點</h2>
          <p>台北某某飯店</p>
        </div>
      </div>

      {/* RSVP */}
      <div className="bg-pink-50 py-16 px-6">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-5">

          <h2 className="text-2xl font-bold text-center text-pink-500">
            💌 婚禮出席回覆
          </h2>

          <input id="name" placeholder="您的大名" className="w-full border p-3 rounded-lg" />

          <select id="relation" className="w-full border p-3 rounded-lg">
            <option>新娘親戚</option>
            <option>新娘國小朋友</option>
            <option>新娘國中朋友</option>
            <option>新娘高中朋友</option>
            <option>新娘大學朋友</option>
            <option>新娘同事</option>
            <option>新娘其他朋友</option>
          </select>

          <select
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setAttend(e.target.value)}
          >
            <option value="yes">我要參加！一起見證幸福時刻</option>
            <option value="no">好傷心我無法出席</option>
          </select>

          {attend === "yes" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <input id="adult" type="number" placeholder="成人人數" className="border p-3 rounded-lg" />
                <input
                  type="number"
                  placeholder="兒童人數"
                  className="border p-3 rounded-lg"
                  onChange={(e) => setChild(Number(e.target.value))}
                />
              </div>

              {child > 0 && (
                <input
                  id="kidSeat"
                  type="number"
                  placeholder="兒童座椅數量"
                  className="w-full border p-3 rounded-lg"
                />
              )}

              <div className="flex items-center gap-3">
                <input type="checkbox" onChange={(e) => setVeg(e.target.checked)} />
                <span>需要素食</span>
              </div>

              {veg && (
                <input
                  id="vegCount"
                  type="number"
                  placeholder="素食份數"
                  className="w-full border p-3 rounded-lg"
                />
              )}
            </>
          )}

          <textarea
            id="message"
            placeholder="祝福留言 ❤️"
            className="w-full border p-3 rounded-lg h-24"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-pink-500 text-white py-3 rounded-full text-lg shadow"
          >
            {loading ? "送出中..." : "送出回覆 💌"}
          </button>

        </div>
      </div>

    </div>
  );
}
