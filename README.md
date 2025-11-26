📘 CaptFood — Smart Nutrition Assistant

<p align="center"> <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" /> <img src="https://img.shields.io/badge/React-18-blue?logo=react" /> <img src="https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css" /> <img src="https://img.shields.io/badge/Status-Development-yellow" /> </p>

CaptFood adalah aplikasi berbasis Next.js yang membantu pengguna melakukan:
🍱 Scan makanan → 📊 Analisis nutrisi → ⚡ Rekomendasi menu AI → 🔥 Tracking nutrisi harian.

Dibangun dengan arsitektur modular berbasis App Router.

📂 Struktur Proyek
src/
├── app/
│ ├── layout.jsx # Root layout (global)
│ ├── page.jsx # Landing homepage
│ │
│ ├── (landing)/ # Group untuk halaman publik
│ │ ├── layout.jsx # Landing layout (Header + Footer)
│ │ ├── login/
│ │ │ └── page.jsx # Login page
│ │ └── register/
│ │ └── page.jsx # Register page
│ │
│ ├── (app)/ # Group halaman setelah login
│ │ ├── dashboard/
│ │ ├── progress/
│ │ ├── recomenai/
│ │ ├── shop/
│ │ ├── scan/
│ │ │ ├── page.jsx
│ │ │ └── hasil/
│ │ │ ├── layout.jsx
│ │ │ └── page.jsx
│ │ └── ...
│
├── components/
│ ├── layout/
│ │ ├── Header.jsx
│ │ ├── LandingHeader.jsx
│ │ ├── LandingFooter.jsx
│ │ ├── ProfileDropdown.jsx
│ │ └── SideDrawer.jsx
│ ├── scan/
│ │ ├── ScanCamera.jsx
│ │ └── ScanLayout.jsx
│ └── ...
│
├── lib/
│ ├── recomenai/
│ ├── storage/
│ └── shop/
│
└── styles/
└── globals.css

🚀 Fitur Utama
✔️ Food Scanning

Menggunakan kamera langsung dari browser

Foto disimpan via sessionStorage

Menampilkan hasil analisis nutrisi

✔️ AI Menu Recommendation

Rekomendasi makanan berdasarkan makro & meal time

✔️ Dashboard Nutrisi

Tracking protein, karbo, lemak, dan kalori

✔️ User Authentication (static UI)

Login / Register halaman khusus (layout berbeda)

✔️ Responsive UI

Menggunakan Tailwind, mobile-first design.

🛠️ Cara Menjalankan Project
1️⃣ Clone Repo
git clone <repo-url>
cd captfood

2️⃣ Install Dependencies
npm install

3️⃣ Jalankan Development Server
npm run dev

Akses di:
👉 http://localhost:3000

4️⃣ Build untuk Production
npm run build
npm start
