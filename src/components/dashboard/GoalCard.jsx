export default function GoalCard({ icon, title, status, color = "bg-white", id }) {
  // status example: "45g Over" or "20g Left"
  // color can be a Tailwind class or a hex wrapper; we'll use accent color for icon
  return (
    <div className="flex-1 bg-white p-3 rounded-xl text-center shadow-[0_2px_5px_rgba(0,0,0,0.05)]">
      <div
        id={id}
        className="mx-auto mb-3 w-12 h-12 rounded-full flex items-center justify-center text-xl"
        style={{
          // subtle background using currentColor with opacity look
          background: "rgba(0,0,0,0.03)"
        }}
      >
        {/* icon should be passed as element or string */}
        <div className="text-[22px]">{icon}</div>
      </div>

      <p className="text-sm font-semibold text-gray-800">{title}</p>
      <p className={`text-xs mt-1 ${status?.includes("Over") ? "text-red-500" : "text-emerald-500"}`}>{status}</p>
    </div>
  );
}
