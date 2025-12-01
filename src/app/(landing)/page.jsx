import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="w-full">

      {/* HERO SECTION — Modern Premium */}
      <section className="relative overflow-hidden bg-linear-to-b from-white to-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT */}
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Eat Smarter,<br />Live Healthier.
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
              CaptFood helps you scan meals, analyze nutrients,  
              and make healthier food choices — powered by AI.
            </p>

            <div className="flex gap-4">
              <a
                href="/login"
                className="bg-blue-600 text-white px-7 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 active:scale-95 transition"
              >
                Get Started
              </a>

              <a
                href="#features"
                className="px-7 py-3 rounded-full font-semibold border border-gray-300 hover:bg-gray-100 active:scale-95 transition"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* RIGHT — image + linear */}
          <div className="relative flex justify-center items-center">
            
            {/* linear blob */}
            <div
              className="
                absolute 
                -top-40 
                right-[-120px]
                w-[800px] 
                h-[800px]
                bg-linear-to-br 
                from-blue-500/30 
                via-blue-300/25 
                to-blue-100/10
                opacity-70
                blur-[220px]
                rounded-full
              "
            />

            {/* Floating card */}
            <div className="relative bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-4 border border-white/20">
              <Image
                src="/hero/food-scan-demo.png"
                width={360}
                height={360}
                alt="Food scanning demo"
                className="rounded-3xl shadow-xl object-cover"
              />
            </div>

          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="relative py-24">
        
        {/* Background soft linear */}
        <div className="absolute inset-0 bg-linear-to-b from-white to-gray-50 -z-10" />

        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">
            Why CaptFood?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-semibold mb-3">AI Food Scan</h3>
              <p className="text-gray-600">
                Scan makanan kamu dan dapatkan analisis nutrisi otomatis dalam hitungan detik.
              </p>
            </div>

            <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Smart Dashboard</h3>
              <p className="text-gray-600">
                Pantau kalori, protein, karbo, dan fat dengan tampilan dashboard yang intuitif.
              </p>
            </div>

            <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-3">AI Menu Recommendation</h3>
              <p className="text-gray-600">
                Dapatkan rekomendasi makanan yang sesuai kebutuhan nutrisi harianmu.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
  id="how-it-works"
  className="relative py-32 overflow-hidden z-0"
>


  {/* 🔵 Soft Apple-like Background */}
  <div
  className="
    absolute inset-0
    bg-linear-to-b
    from-blue-50
    via-blue-100/40
    to-white
    z-[-1]
  "
/>


  <div className="max-w-6xl mx-auto px-6 relative z-10">

    <h2 className="text-3xl font-bold text-center mb-14">
      How It Works
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

      <div className="text-center p-8 bg-white/70 backdrop-blur-xl rounded-2xl shadow-md border border-white hover:shadow-xl transition">
        <div className="text-5xl mb-4">📸</div>
        <h3 className="text-xl font-semibold mb-2">1. Scan Your Food</h3>
        <p className="text-gray-600">
          Ambil gambar atau scan makanan kamu.
        </p>
      </div>

      <div className="text-center p-8 bg-white/70 backdrop-blur-xl rounded-2xl shadow-md border border-white hover:shadow-xl transition">
        <div className="text-5xl mb-4">🤖</div>
        <h3 className="text-xl font-semibold mb-2">2. AI Analyzes</h3>
        <p className="text-gray-600">
          Sistem AI mendeteksi nutrisi dan komposisi makanan.
        </p>
      </div>

      <div className="text-center p-8 bg-white/70 backdrop-blur-xl rounded-2xl shadow-md border border-white hover:shadow-xl transition">
        <div className="text-5xl mb-4">📊</div>
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
