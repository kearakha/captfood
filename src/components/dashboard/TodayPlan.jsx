import { FireIcon } from "@heroicons/react/24/solid";

export default function TodayPlan() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h3 className="text-sm text-gray-500 mb-2">{"Today's Plan:"}</h3>

      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-5xl font-bold text-gray-900">2500</span>
          <p className="text-gray-500 text-sm mt-1">Calories left</p>
        </div>

        <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
          <FireIcon className="w-7 h-7 text-orange-500" />
        </div>
      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full w-[60%] bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
}
