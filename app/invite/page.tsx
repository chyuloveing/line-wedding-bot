"use client";

import { useState } from "react";

export default function RSVP() {
  const [loading, setLoading] = useState(false);
  const [attend, setAttend] = useState("yes");
  const [child, setChild] = useState(0);
  const [veg, setVeg] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const data = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      relation: (document.getElementById("relation") as HTMLSelectElement).value,
      attend,
      adult: (document.getElementById("adult") as HTMLInputElement).value,
      child,
      kidSeat: (document.getElementById("kidSeat") as HTMLInputElement)?.value || 0,
      vegetarian: veg
        ? (document.getElementById("vegCount") as HTMLInputElement)?.value || 0
        : 0,
      message: (document.getElementById("message") as HTMLTextAreaElement).value,
    };

    await fetch("/api/rsvp", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setLoading(false);
    alert("💌 已送出祝福，謝謝您 ❤️");
  };

  return (
    <div className="min-h-screen bg-pink-50 px-6 py-12">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-5">

        <h1 className="text-2xl font-bold text-center text-pink-500">
          💌 婚禮出席回覆
        </h1>

        {/* 姓名 */}
        <input id="name" placeholder="您的大名" className="w-full border p-3 rounded-lg" />

        {/* 關係 */}
        <select id="relation" className="w-full border p-3 rounded-lg">
          <option>新娘親戚</option>
          <option>新娘國小朋友</option>
          <option>新娘國中朋友</option>
          <option>新娘高中朋友</option>
          <option>新娘大學朋友</option>
          <option>新娘同事</option>
          <option>新娘其他朋友</option>
        </select>

        {/* 是否出席 */}
        <select
          className="w-full border p-3 rounded-lg"
          onChange={(e) =>
            setAttend(e.target.value === "yes" ? "yes" : "no")
          }
        >
          <option value="yes">我要參加！一起見證幸福時刻</option>
          <option value="no">好傷心我無法出席，獻上真誠的祝福</option>
        </select>

        {/* 👇 只有出席才顯示 */}
        {attend === "yes" && (
          <>
            {/* 人數 */}
            <div className="grid grid-cols-2 gap-3">
              <input id="adult" type="number" placeholder="成人人數" className="border p-3 rounded-lg" />
              <input
                type="number"
                placeholder="兒童人數"
                className="border p-3 rounded-lg"
                onChange={(e) => setChild(Number(e.target.value))}
              />
            </div>

            {/* 👶 有兒童才顯示 */}
            {child > 0 && (
              <input
                id="kidSeat"
                type="number"
                placeholder="兒童座椅數量"
                className="w-full border p-3 rounded-lg"
              />
            )}

            {/* 🥬 素食 */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                onChange={(e) => setVeg(e.target.checked)}
              />
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

        {/* 留言 */}
        <textarea
          id="message"
          placeholder="祝福留言 ❤️"
          className="w-full border p-3 rounded-lg h-24"
        />

        {/* 送出 */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-pink-500 text-white py-3 rounded-full text-lg shadow"
        >
          {loading ? "送出中..." : "送出回覆 💌"}
        </button>

      </div>
    </div>
  );
}
