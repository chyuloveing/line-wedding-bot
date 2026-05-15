export default function Home() {
  const transportList = [
    {
      icon: "🚇",
      title: "捷運資訊",
      detail: "搭乘捷運至士林站後，可轉乘計程車約 10 分鐘抵達會館。",
    },
    {
      icon: "🚌",
      title: "公車資訊",
      detail: "可搭乘市區公車至「故宮博物院」或「外雙溪」附近站牌後步行前往。",
    },
    {
      icon: "🚗",
      title: "自行開車",
      detail: "會館設有專屬停車空間，建議提早抵達以方便停車。",
    },
    {
      icon: "🚕",
      title: "計程車 / Uber",
      detail: "建議直接搜尋「青青食尚花園會館」即可快速抵達。",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f6f2eb] to-[#fdfcf9] text-[#4b443f]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />

        <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">
          <p className="tracking-[0.35em] text-[#9c8b7a] text-sm mb-5">
            WEDDING TRANSPORT GUIDE
          </p>

          <h1 className="text-5xl md:text-7xl font-light mb-8 tracking-[0.08em]">
            婚禮交通資訊
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-[#7b736c] leading-relaxed">
            誠摯邀請您參加我們的重要時刻，以下整理了婚禮地點與交通資訊，
            希望您能輕鬆抵達，一起分享幸福與喜悅。
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        <InfoCard icon="💍" title="婚禮日期" text="2026 / 12 / 20（日）" />
        <InfoCard icon="⏰" title="婚宴時間" text="午宴 11:30 入席" />
        <InfoCard icon="👰🤵" title="婚宴場地" text="青青食尚花園會館" />
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-[#fffdf9] rounded-[36px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="h-64 bg-gradient-to-r from-[#ece4d9] to-[#f7f2ec] flex items-center justify-center text-7xl">
            📍
          </div>

          <div className="p-10 text-center">
            <p className="text-sm tracking-[0.25em] text-[#b09d8c] mb-3">
              WEDDING VENUE
            </p>

            <h2 className="text-4xl font-light mb-5 tracking-[0.05em]">
              青青食尚花園會館
            </h2>

            <p className="text-[#7b736c] mb-10 text-lg">
              台北市士林區至善路二段266巷32號
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=青青食尚花園會館"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#8e7b6a] text-white hover:scale-105 hover:bg-[#7d6c5d] transition shadow-lg"
            >
              開啟 Google Maps
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-[#b09d8c] tracking-[0.3em] text-sm mb-4">
            TRANSPORTATION
          </p>

          <h2 className="text-4xl font-light tracking-[0.05em]">
            交通方式
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {transportList.map((item, index) => (
            <div
              key={index}
              className="bg-[#fffdf9] rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition"
            >
              <div className="text-5xl mb-5">{item.icon}</div>

              <h3 className="text-2xl font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-[#7b736c] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f3eee8] py-24 px-6">
        <div className="max-w-5xl mx-auto bg-[#fffdf9] rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-10 md:p-16 text-center">
          <div className="text-5xl mb-6">🅿️</div>

          <h2 className="text-4xl font-light mb-8 tracking-[0.05em]">
            停車資訊
          </h2>

          <p className="text-[#7b736c] leading-9 max-w-3xl mx-auto text-lg">
            青青食尚花園會館備有停車空間，婚宴當日可依現場工作人員指引停車。
            因假日車流較多，建議賓客提前出發。
          </p>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#fffdf9] rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 text-center">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[#7b736c]">{text}</p>
    </div>
  );
}
