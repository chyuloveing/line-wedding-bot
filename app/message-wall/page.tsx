"use client";

import { useEffect, useState } from "react";

type Message = {
  id: number;
  name: string;
  text: string;
  createdAt: string;
};

export default function MessageWall() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_MESSAGE_API;

  const loadMessages = async () => {
    if (!apiUrl) return;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("載入留言失敗", error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();

    const timer = setInterval(() => {
      loadMessages();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const submitMessage = async () => {
    if (!name.trim() || !text.trim() || !apiUrl) return;

    setSending(true);

    try {
      await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({
          name,
          text,
        }),
      });

      setName("");
      setText("");
      loadMessages();
    } catch (error) {
      console.error("送出留言失敗", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f6f2eb] to-[#fdfcf9] px-6 py-16 text-[#4b443f]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="tracking-[0.3em] text-[#9c8b7a] text-sm mb-4">
            WEDDING MESSAGE WALL
          </p>

          <h1 className="text-5xl font-light mb-4">
            賓客留言牆
          </h1>

          <p className="text-[#7b736c]">
            留下一句祝福，讓幸福回憶被珍藏。
          </p>
        </div>

        <div className="bg-[#fffdf9] rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6 md:p-10 mb-12">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="你的名字"
            className="w-full mb-4 rounded-2xl border border-[#e6ddd2] px-5 py-4 outline-none bg-white"
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="想對新人說的話..."
            rows={4}
            className="w-full mb-5 rounded-2xl border border-[#e6ddd2] px-5 py-4 outline-none bg-white resize-none"
          />

          <button
            onClick={submitMessage}
            disabled={sending}
            className="w-full rounded-2xl bg-[#8e7b6a] text-white py-4 hover:bg-[#7d6c5d] transition disabled:opacity-50"
          >
            {sending ? "送出中..." : "送出祝福"}
          </button>
        </div>

        {loading ? (
          <p className="text-center text-[#9c8b7a]">
            載入留言中...
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-[#fffdf9] rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-7"
              >
                <div className="flex justify-between items-center mb-4 gap-4">
                  <h3 className="text-xl font-semibold">
                    {msg.name}
                  </h3>

                  <span className="text-sm text-[#aaa098] whitespace-nowrap">
                    {msg.createdAt}
                  </span>
                </div>

                <p className="text-[#6f665f] leading-8">
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}