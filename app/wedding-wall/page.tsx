"use client";

import { useEffect, useState } from "react";

type Photo = {
  id: number;
  url: string;
};

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const res = await fetch("/api/photos");
        const data = await res.json();

        setPhotos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load photos:", error);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();

    const interval = setInterval(() => {
      loadPhotos();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-pink-500 mb-4">
          💍 婚禮照片牆
        </h1>

        <p className="text-center text-gray-600 mb-12 text-lg">
          即時婚禮回憶牆 ❤️
        </p>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">載入中...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className={`
                  relative
                  bg-white
                  p-4
                  pb-0
                  rounded-sm
                  shadow-2xl
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:-translate-y-2
                  overflow-hidden
                  ${
                    index % 3 === 0
                      ? "rotate-[-3deg]"
                      : index % 3 === 1
                      ? "rotate-[2deg]"
                      : "rotate-[-1deg]"
                  }
                `}
              >
                {/* 膠帶效果 */}
                <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-100/70 rotate-[-3deg] shadow-md z-20" />

                {/* 堆疊陰影 */}
                <div className="absolute inset-0 bg-white rotate-[-2deg] -z-10 shadow-xl" />

                {/* 上方真實照片 */}
                <div className="w-full h-80 overflow-hidden bg-gray-100">
                  <img
                    src={photo.url}
                    alt={`Photo ${photo.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 下方拍立得白邊裝飾區 */}
                <div className="relative h-36 bg-white overflow-hidden">
                  {/* 左下角：你的新人插畫照片 */}
                  <img
                    src="/decor/couple.png"
                    alt="Couple Illustration"
                    className="
                      absolute
                      left-[-8px]
                      bottom-[-6px]
                      w-32
                      sm:w-36
                      object-contain
                      z-10
                    "
                  />

                  {/* 中間文字 */}
                  <div
                    className="
                      absolute
                      left-[130px]
                      top-6
                      text-left
                      z-10
                    "
                  >
                    <p
                      className="
                        text-pink-500
                        text-xl
                        font-bold
                        tracking-widest
                        leading-relaxed
                      "
                      style={{
                        fontFamily:
                          "'Comic Sans MS', 'Microsoft JhengHei', cursive",
                      }}
                    >
                      易鑫 & 湘渝
                    </p>

                    <p
                      className="
                        text-pink-400
                        text-lg
                        font-bold
                        tracking-widest
                        leading-relaxed
                      "
                      style={{
                        fontFamily:
                          "'Comic Sans MS', 'Microsoft JhengHei', cursive",
                      }}
                    >
                      Thank You
                    </p>

                    <p
                      className="
                        text-pink-400
                        text-lg
                        font-bold
                        tracking-widest
                      "
                      style={{
                        fontFamily:
                          "'Comic Sans MS', 'Microsoft JhengHei', cursive",
                      }}
                    >
                      2025.01.12
                    </p>
                  </div>

                  {/* 右下角花朵 */}
                  <div className="absolute right-3 bottom-3 w-16 h-20 opacity-90">
                    <svg
                      viewBox="0 0 120 160"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M62 72 C70 62 86 64 88 77 C90 90 73 96 62 88 C51 96 34 90 36 77 C38 64 54 62 62 72Z"
                        stroke="#333"
                        strokeWidth="4"
                      />
                      <path
                        d="M62 72 C58 58 66 48 78 51 C90 54 91 70 78 77"
                        stroke="#333"
                        strokeWidth="4"
                      />
                      <path
                        d="M62 72 C52 60 38 62 34 73 C30 84 42 96 57 88"
                        stroke="#333"
                        strokeWidth="4"
                      />
                      <path
                        d="M62 88 C62 105 62 124 62 150"
                        stroke="#333"
                        strokeWidth="4"
                      />
                      <path
                        d="M62 120 C45 110 32 112 18 126"
                        stroke="#333"
                        strokeWidth="4"
                      />
                      <path
                        d="M62 132 C78 120 94 122 108 136"
                        stroke="#333"
                        strokeWidth="4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
