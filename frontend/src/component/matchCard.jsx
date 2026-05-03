const MatchCard = ({ data }) => {
  return (
   
<a
  href={`/profile/${data._id}`}
  className="block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
>
  {/* Image Section */}
  <div className="relative overflow-hidden">
    <img
      src={data.images?.[0]}
      alt="profile"
      className="h-64 w-full object-cover object-[center_25%] transition-transform duration-500 hover:scale-105"
    />

    {/* Stronger Gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>

    {/* Name + Age */}
    <div className="absolute bottom-3 left-4 text-white">
      <h2 className="text-xl font-semibold tracking-wide">
        {data.name}
      </h2>
      <p className="text-sm opacity-90">Age {data.age}</p>
    </div>
  </div>

  {/* Info Section */}
  <div className="p-4 space-y-3">

    {/* Badges */}
    <div className="flex flex-wrap gap-2 text-xs font-medium">

      <span className="bg-pink-100 text-pink-600 text-sm px-3 py-1 rounded-full">
        ❤️ {data.compatibility}%
      </span>

      <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
        📍 {data.location}
      </span>

      <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full">
        ₹ {data.income}
      </span>
      <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
         {data.age}y
      </span>
    </div>

    {/* Status */}
    <p className="text-gray-500 text-sm">
      {data.maritalStatus}
    </p>

    {/* Divider */}
    <div className="border-t"></div>

    {/* CTA */}
    <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2.5 rounded-xl font-medium tracking-wide hover:opacity-90 transition">
      View Profile
    </button>
  </div>
</a>
  );   
};

export default MatchCard;