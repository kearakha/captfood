import Link from "next/link";

export default function LandingHeader() {
  return (
    <header className="w-full py-4 border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          CaptFood
        </Link>
        
        {/* Right buttons */}
        <div className="flex items-center gap-5">
          <a
            href="/register"
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Register
          </a>
          <a
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 active:scale-95 transition"
          >
            Login
          </a>
        </div>

      </div>
    </header>
  );
}
