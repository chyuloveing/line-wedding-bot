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

        // 防止 API 回傳錯誤格式
        setPhotos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load photos:", error);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    };

    // 第一次載入
    loadPhotos();

    // 每 5 秒更新一次
    const interval = setInterval(() => {
      loadPhotos();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 標題 */}
        <h1 className="text-5xl font-bold text-center text-pink-500 mb-4">
          💍 婚禮照片牆
        </h1>

        <p className="text-center text-gray-600 mb-12 text-lg">
          即時婚禮回憶牆 ❤️
        </p>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg">
            載入中...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className={`
                  relative
                  bg-white
                  p-4
                  pb-16
                  rounded-sm
                  shadow-2xl
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:-translate-y-2
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
                <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-100/70 rotate-[-3deg] shadow-md z-10"></div>

                {/* 堆疊陰影 */}
                <div className="absolute inset-0 bg-white rotate-[-2deg] -z-10 shadow-xl"></div>

                {/* 照片 */}
                <img
                  src={photo.url}
                  alt={`Photo ${photo.id}`}
                  className="w-full h-80 object-cover"
                />

                {/* 拍立得文字 */}
                <div className="mt-6 text-center">
                  <p className="text-2xl text-gray-700 tracking-wide">
                    Tain & Shih
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    Wedding Memories
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
