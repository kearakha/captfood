export default function LandingFooter() {
  return (
    <footer className="w-full bg-gray-100 py-6 mt-20 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">

        <p>© {new Date().getFullYear()} CaptFood. All rights reserved.</p>

        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-gray-800">Privacy Policy</a>
          <a href="#" className="hover:text-gray-800">Terms</a>
          <a href="#" className="hover:text-gray-800">Contact</a>
        </div>

      </div>
    </footer>
  );
}
