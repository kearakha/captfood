// src/lib/shop/generateDummy.js

const IMAGES = [
    // 5 variasi gambar makanan (Unsplash - ukuran di-query agar ringan)
    "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=60",
  ];
  
  export default function generateDummy(baseTitle, baseImg) {
    const vendorNames = [
      "Pak Yanto","Mbak Nia","Pak Darto","Bu Darti","Cak Broto","Bu Sri",
      "Madu Lestari","Rica Pedas","Lombok Ijo","Bumbu Rujak","Sambal Matah",
      "Mak Joss","Ndeso Roso","Kang Mas","Bu Narti","Pojok Rasa",
    ];
  
    const items = [];
  
    for (let i = 0; i < 18; i++) {
      const name = vendorNames[i % vendorNames.length];
      const distM = 80 + (i * 35) % 620;
      const priceLow = 9 + (i * 2) % 12;
      const priceHigh = priceLow + 12 + (i % 6);
      const etaMin = 22 + (i * 3) % 15;
      const rating = +( (45 + (i % 5)) / 10 ).toFixed(1);
  
      // pilih gambar dari IMAGES secara deterministik berdasarkan index
      const img = IMAGES[i % IMAGES.length] || baseImg;
  
      items.push({
        id: `r${i + 1}`,
        name: `${baseTitle} ${name}`,
        img,
        dist: `${distM} m`,
        price: `${priceLow}–${priceHigh} ribu`,
        eta: `${etaMin} menit`,
        rating,
      });
    }
  
    return items;
  }
  