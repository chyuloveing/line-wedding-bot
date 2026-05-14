"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {

    fetch("/api/photos")
      .then(res => res.json())
      .then(data => {
        setPhotos(data);
      });

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {photos.map((photo, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >

              <img
                src={photo.url}
                alt="Wedding"
                className="w-full h-80 object-cover"
              />

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}