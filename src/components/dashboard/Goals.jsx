import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDrumstickBite, faBreadSlice, faCheese } from "@fortawesome/free-solid-svg-icons";

export default function Goals() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Goals:</h3>

      <div className="grid grid-cols-3 gap-3">

        {/* Protein */}
        <div className="bg-white p-4 rounded-xl shadow-sm text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2
                          bg-purple-100 text-purple-600 shadow-inner">
            <FontAwesomeIcon icon={faDrumstickBite} className="w-5 h-5" />
          </div>
          <p className="font-semibold text-sm text-gray-800">Protein</p>
          <p className="text-xs text-red-500 font-medium">45g Over</p>
        </div>

        {/* Carbs */}
        <div className="bg-white p-4 rounded-xl shadow-sm text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2
                          bg-yellow-100 text-yellow-600 shadow-inner">
            <FontAwesomeIcon icon={faBreadSlice} className="w-5 h-5" />
          </div>
          <p className="font-semibold text-sm text-gray-800">Carbs</p>
          <p className="text-xs text-green-500 font-medium">20g Left</p>
        </div>

        {/* Fat */}
        <div className="bg-white p-4 rounded-xl shadow-sm text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2
                          bg-blue-100 text-blue-600 shadow-inner">
            <FontAwesomeIcon icon={faCheese} className="w-5 h-5" />
          </div>
          <p className="font-semibold text-sm text-gray-800">Fat</p>
          <p className="text-xs text-green-500 font-medium">9g Left</p>
        </div>

      </div>
    </div>
  );
}
