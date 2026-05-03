function FullScreenLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100">
      
      <div className="flex flex-col items-center gap-4">

        <div className="h-12 w-12 border-4 border-pink-300 border-t-pink-600 rounded-full animate-spin" />

        <p className="text-gray-600 text-sm">
        Loading content...
        </p>

      </div>
    </div>
  );
}
export default FullScreenLoader;