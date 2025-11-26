export default function LoginPage() {
  return (
    <div className="w-full flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="flex flex-col gap-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          {"Don't have an account?"}{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>

      </div>
    </div>
  );
}
