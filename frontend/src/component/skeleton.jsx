export function SkeletonCard() {
  return (
    <div className="bg-teal-200 p-2 rounded animate-pulse">
      <div className="h-40 w-full bg-gray-300 rounded"></div>

      <div className="h-4 bg-gray-300 mt-3 w-3/4 rounded"></div>
      <div className="h-4 bg-gray-300 mt-2 w-1/2 rounded"></div>
      <div className="h-4 bg-gray-300 mt-2 w-1/3 rounded"></div>
      <div className="h-4 bg-gray-300 mt-2 w-2/3 rounded"></div>
    </div>
  );
}
export function SkeletonUser() {
  return (
    <div className="w-md text-xl p-4 animate-pulse">
      <div className="h-6 bg-gray-300 w-1/2 mb-4 rounded"></div>
      <div className="h-4 bg-gray-300 w-3/4 mb-2 rounded"></div>
      <div className="h-4 bg-gray-300 w-2/3 rounded"></div>
    </div>
  );
}
