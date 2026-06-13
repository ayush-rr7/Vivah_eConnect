import { useEffect, useState } from "react";
import profile2 from  "../assets/profile2.png"
import InfiniteScroll from "react-infinite-scroll-component";
import { getProfiles } from "../api/profileService.js";
import { SkeletonCard } from "../component/skeleton.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function ProfileList() {

 
  const optimizeImage = (url) => {
  if (!url) return profile2;

  return url.replace(
    "/upload/",
    "/upload/f_auto,q_auto,w_600,h_900,c_fill/"
  );
};

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-6 px-4">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Discover Profiles
      </h1>

      {loading && users.length === 0 ? (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {Array(3)
            .fill()
            .map((_, i) => (
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
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 max-w-6xl mx-auto mt-6">
              {Array(3)
                .fill()
                .map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
            </div>
          }
          endMessage={
            <p className="text-center text-gray-500 mt-6">
              No more profiles
            </p>
          }
        >
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 max-w-6xl mx-auto auto-rows-fr">
            {users.map((u,index) => (
              <div
                key={u._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 h-full flex flex-col"
              >
                <a href={`/profile/${u._id}`}>
                  <div className="relative overflow-hidden aspect-4/3">
                    <img
                    src={optimizeImage(u.Images?.[0])}
                    alt={u.Name}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                    className="w-full h-full  object-cover object-[center_10%]"
                  />
           
                    

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                    <div className="absolute bottom-2 left-3 text-white">
                      <h2 className="text-lg font-semibold">{u.Name}</h2>
                      <p className="text-sm opacity-90">Age {u.Age}</p>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex flex-wrap gap-2 text-sm">
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

                    <p className="text-gray-600 text-sm">
                      {u.Martial_Status}
                    </p>

                    <div className="pt-2">
                      <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition">
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
  );
}

export default ProfileList;


