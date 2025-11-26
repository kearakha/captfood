import RecommendationCard from "./RecommendationCard";
import Link from "next/link";

const items = [
  {
    image: "https://images.unsplash.com/photo-1630315500315-43112e2bfd88?q=80&w=400&auto=format&fit=crop",
    title: "Ayam Bakar Pak Yanto",
    details: "1 Porsi · 350 Kalori",
  },
  {
    image: "https://images.unsplash.com/photo-1680674774705-90b4904b3a7f?q=80&w=400&auto=format&fit=crop",
    title: "Nasi Goreng Khas",
    details: "1 Porsi · 400 Kalori",
  },
  {
    image: "https://images.unsplash.com/photo-1630910104722-21fe97230ef9?q=80&w=400&auto=format&fit=crop",
    title: "Sayur Asem Segar",
    details: "1 Porsi · 150 Kalori",
  },
];

export default function Recommendations() {
  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Try AI Menu Recommendation</h3>

        <Link 
          href="/recomenai"
          className="text-sm text-blue-600 font-medium cursor-pointer"
        >
          See All →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((it, i) => (
          <RecommendationCard key={i} image={it.image} title={it.title} details={it.details} />
        ))}
      </div>
    </section>
  );
}
