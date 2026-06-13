import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getProfiles } from "../api/profileService.js";
import { SkeletonCard } from "../component/skeleton.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { optimizeImage } from "../utils/ImgOptimizer.js";

function ProfileList() {


  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const { activeProfileId: profileId } = useAuth();

  const fetchUser = async () => {
    if (!profileId) return;

    try {
      const res = await getProfiles(profileId, page);

      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setUsers((prev) => [...prev, ...res.data]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [page, profileId]);

  
  return (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-4 sm:py-6 px-3 sm:px-4">
    
    {/* HEADER */}
    <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-5 sm:mb-6 text-gray-800">
      Discover Profiles
    </h1>

    <div className="max-w-6xl mx-auto">

      {/* INITIAL LOADING */}
      {loading && users.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[380px] sm:auto-rows-[420px]">
          {Array(12).fill().map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={users.length}
          next={() => setPage((prev) => prev + 1)}
          hasMore={hasMore}
          scrollThreshold="95%"

          loader={
            <div className="col-span-full h-[380px] sm:h-[420px] bg-gray-100 animate-pulse rounded-2xl" />
          }

          endMessage={
            <p className="text-center text-gray-500 mt-6 text-sm sm:text-base">
              No more profiles
            </p>
          }
        >

          {/* STABLE GRID (NEVER CHANGES) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[380px] sm:auto-rows-[420px]">

            {users.map((u, index) => (
              <div
                key={u._id}
                className="h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 active:scale-[0.98] flex flex-col"
              >

                <a href={`/profile/${u._id}`} className="flex flex-col h-full">

                  {/* IMAGE */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={optimizeImage(u.Images?.[0])}
                      alt={u.Name}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                      className="w-full h-full object-cover object-[center_15%]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    <div className="absolute bottom-2 left-3 text-white">
                      <h2 className="text-base sm:text-lg font-semibold">
                        {u.Name}
                      </h2>
                      <p className="text-xs sm:text-sm opacity-90">
                        Age {u.Age}
                      </p>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-3 sm:p-4 space-y-2 flex-1">

                    <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                      <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                        {u.Gender}
                      </span>

                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        {u.Caste}
                      </span>

                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        ₹ {u.Income}
                      </span>
                    </div>

                    <p className="text-gray-600 text-xs sm:text-sm">
                      {u.Martial_Status}
                    </p>

                    <div className="pt-2 mt-auto">
                      <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 active:scale-[0.98] transition text-sm sm:text-base">
                        View Profile
                      </button>
                    </div>

                  </div>

                </a>
              </div>
            ))}

          </div>

        </InfiniteScroll>
      )}

    </div>
  </div>
);
}

export default ProfileList;


