export default function Home() {
  const transportList = [
    {
      icon: '🚇',
      title: '捷運資訊',
      detail:
        '搭乘捷運至士林站後，可轉乘計程車約 10 分鐘抵達會館。',
    },
    {
      icon: '🚌',
      title: '公車資訊',
      detail:
        '可搭乘市區公車至「故宮博物院」或「外雙溪」附近站牌後步行前往。',
    },
    {
      icon: '🚗',
      title: '自行開車',
      detail:
        '會館設有專屬停車空間，建議提早抵達以方便停車。',
    },
    {
      icon: '🚕',
      title: '計程車 / Uber',
      detail:
        '建議直接搜尋「青青食尚花園會館」即可快速抵達。',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <p className="tracking-[0.3em] text-rose-500 text-sm mb-4">
            WEDDING TRANSPORT GUIDE
          </p>

          <h1 className="text-5xl md:text-7xl font-light mb-6">
            婚禮交通資訊
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            誠摯邀請您參加我們的重要時刻，
            以下整理了婚禮地點與交通資訊，
            希望您能輕鬆抵達，一起分享幸福與喜悅。
          </p>
        </div>
      </section>

      {/* Wedding Info */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl shadow-md p-8 text-center">
          <div className="text-3xl mb-4">💍</div>
          <h3 className="text-xl font-semibold mb-2">婚禮日期</h3>
          <p className="text-gray-600">2026 / 12 / 20（日）</p>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-8 text-center">
          <div className="text-3xl mb-4">⏰</div>
          <h3 className="text-xl font-semibold mb-2">婚宴時間</h3>
          <p className="text-gray-600">午宴 11:30 入席</p>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-8 text-center">
          <div className="text-3xl mb-4">👰🤵</div>
          <h3 className="text-xl font-semibold mb-2">婚宴場地</h3>
          <p className="text-gray-600">青青食尚花園會館</p>
        </div>
      </section>

      {/* Venue */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-[32px] shadow-lg overflow-hidden">
          <div className="h-64 bg-gradient-to-r from-rose-100 to-pink-50 flex items-center justify-center text-7xl">
            📍
          </div>

          <div className="p-10 text-center">
            <p className="text-sm tracking-[0.2em] text-rose-400 mb-2">
              WEDDING VENUE
            </p>

            <h2 className="text-4xl font-light mb-4">
              青青食尚花園會館
            </h2>

            <p className="text-gray-600 mb-8 text-lg">
              台北市士林區至善路二段266巷32號
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=%E9%9D%92%E9%9D%92%E9%A3%9F%E5%B0%9A%E8%8A%B1%E5%9C%92%E6%9C%83%E9%A4%A8"
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-rose-500 text-white hover:scale-105 transition"
            >
              開啟 Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Transport */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-rose-400 tracking-[0.25em] text-sm mb-3">
            TRANSPORTATION
          </p>

          <h2 className="text-4xl font-light">
            交通方式
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {transportList.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition"
            >
              <div className="text-5xl mb-5">
                {item.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Parking */}
      <section className="bg-rose-50 py-20 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-xl p-10 md:p-16 text-center">
          <div className="text-5xl mb-6">🅿️</div>

          <h2 className="text-4xl font-light mb-6">
            停車資訊
          </h2>

          <p className="text-gray-600 leading-8 max-w-3xl mx-auto">
            青青食尚花園會館備有停車空間，
            婚宴當日可依現場工作人員指引停車。
            因假日車流較多，建議賓客提前出發。
          </p>
        </div>
      </section>
    </main>
  )
}