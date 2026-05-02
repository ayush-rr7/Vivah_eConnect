const MatchCard = ({ data }) => {
  return (
   

              <a href={`/profile/${data._id}`}>

                {/* Image Section */}
                <div className="relative">
                  <img
                    src={data.images?.[0]}
                    alt="profile"
                    className="h-56 w-full object-cover object-top"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Name + Age on image */}
                  <div className="absolute bottom-2 left-3 text-white">
                    <h2 className="text-lg font-semibold">{data.name}</h2>
                    <p className="text-sm opacity-90">Age {data.age}</p>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-4 space-y-2">

                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                       ❤️ {data.compatibility}%
                    </span>

                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      {data.location}
                    </span>

                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      ₹ {data.income}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm">
                    {data.Martial_Status}
                  </p>

                  {/* CTA */}
                  <div className="pt-2">
                    <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition">
                      View Profile
                    </button>
                  </div>

                </div>

              </a>
          
  );
};

export default MatchCard;