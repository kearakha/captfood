export default function HomePage() {
  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            CaptFood
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Your Smart Nutrition Assistant — helping you track, analyze, and improve your daily food intake effortlessly.
          </p>

          <a
            href="/login"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 active:scale-95 transition"
          >
            Get Started
          </a>
        </div>

        {/* Right */}
        <div className="flex justify-center">
          <div className="bg-white w-[260px] h-[520px] rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.25)] border-10px border-black/60 overflow-hidden">
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500 text-lg">
              App Preview
            </div>
          </div>
        </div>

      </section>

      {/* FEATURES SECTION */}
<section className="max-w-6xl mx-auto px-6 py-20">
  <h2 className="text-3xl font-bold text-center mb-12">Why CaptFood?</h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-3">AI Food Scan</h3>
      <p className="text-gray-600">
        Scan makanan kamu dan dapatkan analisis nutrisi otomatis dalam hitungan detik.
      </p>
    </div>

    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-3">Smart Dashboard</h3>
      <p className="text-gray-600">
        Pantau kalori, protein, karbo, dan fat dengan tampilan dashboard yang intuitif.
      </p>
    </div>

    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-3">AI Menu Recommendation</h3>
      <p className="text-gray-600">
        Dapatkan rekomendasi makanan yang sesuai kebutuhan nutrisi harianmu.
      </p>
    </div>

  </div>
</section>

{/* HOW IT WORKS */}
<section className="w-full bg-gray-50 py-20">
  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      <div className="text-center p-6">
        <div className="text-4xl mb-4">📸</div>
        <h3 className="text-xl font-semibold mb-2">1. Scan Your Food</h3>
        <p className="text-gray-600">Ambil gambar atau scan makanan kamu.</p>
      </div>

      <div className="text-center p-6">
        <div className="text-4xl mb-4">🤖</div>
        <h3 className="text-xl font-semibold mb-2">2. AI Analyzes</h3>
        <p className="text-gray-600">
          Sistem AI mendeteksi nutrisi dan komposisi makanan.
        </p>
      </div>

      <div className="text-center p-6">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-xl font-semibold mb-2">3. Track & Improve</h3>
        <p className="text-gray-600">
          Pantau asupan harian dan capai target nutrisi kamu.
        </p>
      </div>

    </div>

  </div>
</section>


    </div>
  );
}
