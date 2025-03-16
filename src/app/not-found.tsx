export default function NotFound() {
  return (
    <main className="min-h-screen p-8">
      <div className="w-full max-w-2xl mx-auto text-lg font-['Courier_New']">
        <h1 className="text-center mb-4 text-[1.75rem] font-bold">
          Bummer, you bonked out!
        </h1>
        <p className="text-center">
          <a href="/" className="text-red-500 hover:text-red-600 rotate-hover">
            Head back home
          </a>
        </p>
      </div>
    </main>
  );
} 