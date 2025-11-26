# 📘 CaptFood — Smart Nutrition Assistant

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css)
![Status](https://img.shields.io/badge/Status-Development-yellow)

CaptFood adalah aplikasi berbasis **Next.js** yang membantu pengguna melakukan:

🍱 Scan makanan →  
📊 Analisis nutrisi →  
⚡ Rekomendasi menu AI →  
🔥 Tracking nutrisi harian.

Dibangun dengan arsitektur modular berbasis **Next.js App Router**.

---

## 📂 Struktur Proyek

src/
├── app/
│ ├── layout.jsx # Root layout (global)
│ ├── page.jsx # Landing homepage
│ │
│ ├── (landing)/ # Group halaman publik
│ │ ├── layout.jsx # Landing layout (header + footer)
│ │ ├── login/
│ │ │ └── page.jsx # Login page
│ │ └── register/
│ └── page.jsx # Register page
│
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

yaml
Copy code

---

## 🚀 Fitur Utama

### ✔️ Food Scanning

- Menggunakan kamera langsung dari browser
- Foto disimpan via `sessionStorage`
- Menampilkan hasil analisis nutrisi

### ✔️ AI Menu Recommendation

- Rekomendasi makanan berdasarkan makro & meal time

### ✔️ Dashboard Nutrisi

- Tracking protein, karbo, lemak, dan kalori harian

### ✔️ User Authentication (UI Static)

- Halaman Login dan Register dengan layout khusus

### ✔️ Responsive UI

- Menggunakan TailwindCSS, mobile-first design

---

## 🛠 Cara Menjalankan Project

### 1️⃣ Clone Repo

```bash
git clone <repo-url>
cd captfood
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Jalankan Development Server
bash
Copy code
npm run dev
Akses di:
👉 http://localhost:3000

4️⃣ Build untuk Production
bash
Copy code
npm run build
npm start
```
