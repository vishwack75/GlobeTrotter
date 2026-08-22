export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="p-10 rounded-2xl bg-blue-600 text-white shadow-xl">
        <h1 className="text-4xl font-bold">Tailwind is Working ✅</h1>
        <p className="mt-4 text-blue-100">
          If you can see these colors, Tailwind CSS is installed correctly.
        </p>
        <button className="mt-6 px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold">
          Test Button
        </button>
      </div>
    </main>
  );
}