"use client";

import { useEffect, useState } from "react";

export default function Page() {

  const weddingDate = new Date("2025-11-09T12:30:00");

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {

    const updateCountdown = () => {

      const now = new Date();

      const diff = weddingDate.getTime() - now.getTime();

      if (diff <= 0) return;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });

    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);

  }, []);

  return (

    <main className="bg-[#efe7da] text-[#3d3026] overflow-x-hidden">

      {/* =========================
          NAVBAR
      ========================== */}

      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 py-5">

          <h1 className="text-white text-2xl lg:text-4xl tracking-[4px] font-serif">
            Yin & Lin
          </h1>

          <a
            href="#rsvp"
            className="border border-white text-white px-5 py-3 rounded-full hover:bg-white hover:text-[#b4662d] duration-300 text-sm lg:text-base"
          >
            出席回覆
          </a>

        </div>

      </header>

      {/* =========================
          HERO
      ========================== */}

      <section className="relative h-screen">

        <img
          src="/images/main.jpg"
          className="absolute inset-0 w-full h-full object-cover brightness-[55%]"
        />

        <div className="absolute inset-0 flex items-center justify-center text-center px-6">

          <div>

            <p className="text-white text-lg lg:text-2xl tracking-[3px] mb-8">
              Date & Time : 2025/11/09(日) 12:30
            </p>

            {/* COUNTDOWN */}

            <div className="flex justify-center gap-5 lg:gap-10 mb-10">

              <div>
                <h2 className="text-white text-5xl lg:text-7xl font-serif">
                  {timeLeft.days}
                </h2>
                <p className="text-white tracking-[5px] mt-2">
                  DAYS
                </p>
              </div>

              <div>
                <h2 className="text-white text-5xl lg:text-7xl font-serif">
                  {timeLeft.hours}
                </h2>
                <p className="text-white tracking-[5px] mt-2">
                  HOURS
                </p>
              </div>

              <div>
                <h2 className="text-white text-5xl lg:text-7xl font-serif">
                  {timeLeft.minutes}
                </h2>
                <p className="text-white tracking-[5px] mt-2">
                  MIN
                </p>
              </div>

              <div>
                <h2 className="text-white text-5xl lg:text-7xl font-serif">
                  {timeLeft.seconds}
                </h2>
                <p className="text-white tracking-[5px] mt-2">
                  SEC
                </p>
              </div>

            </div>

            <h1 className="text-white text-6xl lg:text-[140px] font-serif font-light leading-none">
              Yin & Lin
            </h1>

          </div>

        </div>

      </section>

      {/* =========================
          STORY
      ========================== */}

      <section className="grid lg:grid-cols-2 min-h-screen">

        <div>
          <img
            src="/images/story.jpg"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center justify-center px-8 py-20 lg:px-24">

          <div className="max-w-xl text-center">

            <h2 className="text-[#b4662d] text-5xl lg:text-7xl font-serif mb-10">
              Our Story
            </h2>

            <p className="leading-[2.5] text-base lg:text-lg">

              結婚是我們人生很重要的決定。<br /><br />

              希望這場婚禮不只是儀式，<br />
              而是讓彼此生命中重要的人們再次相聚。<br /><br />

              謝謝你們一路陪伴我們走到現在。<br />
              誠摯邀請你一起見證這份幸福。

            </p>

          </div>

        </div>

      </section>

      {/* =========================
          GALLERY
      ========================== */}

      <section className="bg-[#b4662d] text-white py-28 px-6 lg:px-20">

        <div className="text-center mb-16">

          <h2 className="text-6xl lg:text-8xl font-serif mb-6">
            Wedding Gallery
          </h2>

          <p className="tracking-[4px]">
            OUR LOVE STORY
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <img
            src="/images/gallery1.jpg"
            className="rounded-[30px] h-[500px] object-cover hover:-translate-y-2 duration-500"
          />

          <img
            src="/images/gallery2.jpg"
            className="rounded-[30px] h-[500px] object-cover hover:-translate-y-2 duration-500"
          />

          <img
            src="/images/gallery3.jpg"
            className="rounded-[30px] h-[500px] object-cover hover:-translate-y-2 duration-500"
          />

        </div>

      </section>

      {/* =========================
          VIDEO
      ========================== */}

      <section className="py-28 px-6 lg:px-20">

        <div className="text-center mb-16">

          <h2 className="text-[#b4662d] text-6xl lg:text-8xl font-serif">
            Wedding Films
          </h2>

        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-6">

          <video
            controls
            poster="/images/video-cover.jpg"
            className="rounded-[30px] w-full"
          >
            <source src="/videos/main.mp4" />
          </video>

          <div className="flex flex-col gap-6">

            <video
              controls
              className="rounded-[30px] w-full"
            >
              <source src="/videos/video2.mp4" />
            </video>

            <video
              controls
              className="rounded-[30px] w-full"
            >
              <source src="/videos/video3.mp4" />
            </video>

          </div>

        </div>

      </section>

      {/* =========================
          RSVP
      ========================== */}

      <section
        id="rsvp"
        className="bg-[#b4662d] text-white text-center py-36 px-6"
      >

        <h2 className="text-6xl lg:text-8xl font-serif mb-10">
          Yin & Lin
        </h2>

        <a
          href="https://forms.gle/你的Google表單"
          target="_blank"
          className="inline-block border-[3px] border-white px-10 lg:px-20 py-5 rounded-full text-2xl lg:text-4xl hover:bg-white hover:text-[#b4662d] duration-300"
        >
          點這邊 回覆出席表單
        </a>

      </section>

      {/* =========================
          INFO
      ========================== */}

      <section className="py-28 px-6 lg:px-20 grid lg:grid-cols-2 gap-10">

        {/* Wedding Info */}

        <div className="bg-white rounded-[35px] p-10 shadow-xl">

          <h2 className="text-[#b4662d] text-5xl font-serif mb-8">
            Wedding Info
          </h2>

          <div className="space-y-6 text-lg leading-9">

            <p>
              青青食尚花園會館<br />
              CHING CHING WEDDING
            </p>

            <p>
              台北市士林區至善路二段266巷32號
            </p>

            <p>
              TEL：(02)2841-1996
            </p>

          </div>

          <a
            href="https://maps.google.com/?q=青青食尚花園會館"
            target="_blank"
            className="inline-block mt-10 bg-[#b4662d] text-white px-8 py-4 rounded-full"
          >
            開啟 Google Map
          </a>

        </div>

        {/* Traffic */}

        <div className="bg-white rounded-[35px] p-10 shadow-xl">

          <h2 className="text-[#b4662d] text-5xl font-serif mb-8">
            Traffic Guide
          </h2>

          <div className="space-y-8 text-lg leading-9">

            <div>
              <p className="font-bold mb-2">
                【自行開車】
              </p>

              <p>
                國道一號 → 內湖交流道 → 至善路即可抵達。
              </p>
            </div>

            <div>
              <p className="font-bold mb-2">
                【捷運】
              </p>

              <p>
                捷運士林站轉乘公車即可抵達。
              </p>
            </div>

            <div>
              <p className="font-bold mb-2">
                【停車資訊】
              </p>

              <p>
                現場附設免費停車場。
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =========================
          FOOTER
      ========================== */}

      <footer className="bg-[#b4662d] text-white text-center py-20">

        <h2 className="text-5xl lg:text-7xl font-serif mb-6">
          Yin & Lin
        </h2>

        <p className="tracking-[4px] text-lg">
          HAPPY TOGETHER FOREVER
        </p>

      </footer>

    </main>

  );

}
