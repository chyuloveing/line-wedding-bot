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

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 輪播
  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [started]);

  // 開始
  const start = () => {
    setStarted(true);
    audioRef.current?.play().catch(() => {});
  };

  // 送出 RSVP
  const submitRSVP = async () => {
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

    alert("💌 已送出 ❤️");
  };

  return (
    <div className="bg-white text-gray-800">

      {/* 音樂 */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* 🎬 Hero */}
      <div className="relative h-screen bg-black overflow-hidden">

        <img
          src={photos[index]}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold">易見 ❤️ 渝生</h1>
          <p className="mt-3 text-xl">2026.01.10</p>
        </div>

        {!started && (
          <div className="absolute bottom-10 w-full flex justify-center">
            <button
              onClick={start}
              className="bg-white text-black px-6 py-3 rounded-full"
            >
              ▶ 開啟邀請函
            </button>
          </div>
        )}
      </div>

      {/* 💍 婚禮資訊 */}
      <div className="p-6 space-y-6 max-w-xl mx-auto">
        <div className="bg-pink-50 p-6 rounded-xl text-center">
          <h2 className="font-bold">📅 婚禮時間</h2>
          <p>2026/01/10 11:30</p>
        </div>
      </div>

      {/* 💌 RSVP */}
      <div className="bg-pink-50 py-12 px-6">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-3xl shadow space-y-4">

          <h2 className="text-xl font-bold text-center text-pink-500">
            💌 出席回覆
          </h2>

          <input id="name" placeholder="您的大名" className="w-full border p-3 rounded-lg" />

          <select id="relation" className="w-full border p-3 rounded-lg">
            <option>新娘親戚</option>
            <option>新娘朋友</option>
          </select>

          <select onChange={(e) => setAttend(e.target.value)}>
            <option value="yes">我要參加</option>
            <option value="no">無法出席</option>
          </select>

          {attend === "yes" && (
            <>
              <input id="adult" type="number" placeholder="成人人數" />
              <input
                type="number"
                placeholder="兒童人數"
                onChange={(e) => setChild(Number(e.target.value))}
              />

              {child > 0 && (
                <input id="kidSeat" placeholder="兒童座椅數量" />
              )}

              <label>
                <input type="checkbox" onChange={(e) => setVeg(e.target.checked)} />
                素食
              </label>

              {veg && <input id="vegCount" placeholder="素食數量" />}
            </>
          )}

          <textarea id="message" placeholder="祝福留言 ❤️" />

          <button
            onClick={submitRSVP}
            className="w-full bg-pink-500 text-white py-3 rounded-full"
          >
            送出 💌
          </button>

        </div>
      </div>

    </div>
  );
}
