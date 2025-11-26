import Image from "next/image";

export default function RecommendationCard({ image, title, details }) {
  return (
    <div className="shrink-0 w-40 bg-white rounded-xl shadow-[0_2px_5px_rgba(0,0,0,0.05)] p-3">
      <div className="w-full pb-[100%] relative rounded-md overflow-hidden mb-3 bg-gray-100">
  <Image
    src={image}
    alt={title}
    fill
    className="object-cover"
    sizes="100%"
  />
</div>
      <p className="text-sm font-semibold text-gray-800 mb-1">{title}</p>
      <p className="text-xs text-gray-500">{details}</p>
    </div>
  );
}
