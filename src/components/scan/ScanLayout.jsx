export default function ScanLayout({ children }) {
    return (
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-center text-2xl font-extrabold mb-4">Scan Here</h1>
        <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-lg">
          {children}
        </div>
      </div>
    );
  }
  