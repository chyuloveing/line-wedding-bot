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
        <h1 className="text-5xl font-bold text-center text-pink-500 mb-4">
          💍 婚禮照片牆
        </h1>

        <p className="text-center text-gray-600 mb-10">
          即時婚禮回憶牆 ❤️
        </p>

        {loading ? (
          <p className="text-center text-gray-500">
            載入中...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >
                <img
                  src={photo.url}
                  alt={`Photo ${photo.id}`}
                  className="w-full h-80 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}