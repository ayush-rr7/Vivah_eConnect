import { optimizeImage } from "../utils/ImgOptimizer";

const MatchCard = ({ data }) => {
  return (
    <a
      href={`/profile/${data._id}`}
      className="
        block w-full min-w-0 max-w-full
        rounded-2xl overflow-hidden
        bg-white shadow-md
        hover:shadow-lg
        transition-transform duration-300
        transform hover:-translate-y-1
      "
    >

      {/* IMAGE */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">

        <img
          src={optimizeImage(data?.images?.[0],400, 600)}
          alt="profile"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-[center_15%]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

        <div className="absolute bottom-3 left-4 text-white">
          <h2 className="text-lg font-semibold truncate max-w-[80%]">
            {data?.name}
          </h2>
          <p className="text-sm opacity-90">
            Age {data?.age}
          </p>
        </div>

      </div>

      {/* INFO */}
      <div className="p-4 space-y-3 min-w-0">

        {/* BADGES */}
        <div className="flex flex-wrap gap-2 text-xs font-medium">

          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
            ❤️ {data?.compatibility}%
          </span>

          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full truncate max-w-[120px]">
            📍 {data?.location}
          </span>

          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
            ₹ {data?.income}
          </span>

          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            {data?.age}y
          </span>

        </div>

        <p className="text-gray-500 text-sm">
          {data?.maritalStatus}
        </p>

        <div className="border-t" />

        <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2.5 rounded-xl font-medium">
          View Profile
        </button>

      </div>

    </a>
  );
};

export default MatchCard;