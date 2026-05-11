
   export  function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">

      {/* Image */}
      <div className="h-64 bg-gray-300"></div>

      <div className="p-4 space-y-3">

        {/* Name */}
        <div className="h-5 w-32 bg-gray-300 rounded"></div>

        {/* Tags */}
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
        </div>

        {/* Text */}
        <div className="h-4 w-24 bg-gray-300 rounded"></div>

        {/* Button */}
        <div className="h-10 w-full bg-gray-300 rounded-lg"></div>

      </div>
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

