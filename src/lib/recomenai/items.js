// src/lib/recomenai/items.js
export const ITEMS = [
    {
      id: "teriyaki",
      title: "Ayam Teriyaki Bowl",
      sub: "Menu ini sangat cocok untuk kebutuhanmu",
      meal: "Lunch",
      desc: "Ayam teriyaki dengan nasi dan tumis sayur. Seimbang protein & karbo.",
      img: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80",
      macro: { p: 28, c: 62, f: 10 },
    },
    {
      id: "salad",
      title: "Salad Buah Yogurt",
      sub: "Menu ini sangat cocok untuk kebutuhanmu",
      meal: "Breakfast",
      desc: "Buah segar + yogurt rendah lemak. Rendah kalori, tinggi serat.",
      img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
      macro: { p: 11, c: 36, f: 6 },
    },
    {
      id: "sate",
      title: "Sate Ayam + Lontong",
      sub: "Menu ini sangat cocok untuk kebutuhanmu",
      meal: "Dinner",
      desc: "10 tusuk sate ayam, bumbu kacang, 1 potong lontong.",
      img: "https://images.unsplash.com/photo-1645696301019-35adcc18fc21?auto=format&fit=crop&w=1200&q=80",
      macro: { p: 27, c: 42, f: 19 },
    },
    {
      id: "mie",
      title: "Mie Goreng Telur",
      sub: "Menu ini sangat cocok untuk kebutuhanmu",
      meal: "Lunch",
      desc: "Mi goreng rumahan dengan telur orak-arik. Porsi sedang.",
      img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1200&q=80",
      macro: { p: 16, c: 58, f: 18 },
    },
    {
      id: "gudeg",
      title: "Gudeg + Telur",
      sub: "Menu ini sangat cocok untuk kebutuhanmu",
      meal: "Lunch",
      desc: "Gudeg manis, telur, krecek. Karbo & lemak moderat.",
      img: "https://images.unsplash.com/photo-1707529332935-bfa3925f15ac?auto=format&fit=crop&w=1200&q=80",
      macro: { p: 15, c: 52, f: 14 },
    },
  ];
  
  export const kcal = (p, c, f) => Math.round(4 * p + 4 * c + 9 * f);
  
  export const pick = (arr, seed) => {
    if (!arr || arr.length === 0) return null;
    if (typeof seed === "number") {
      // simple deterministic pick
      return arr[seed % arr.length];
    }
    return arr[Math.floor(Math.random() * arr.length)];
  };
  