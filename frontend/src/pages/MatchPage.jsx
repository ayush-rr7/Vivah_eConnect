import { useEffect, useState } from "react";
import MatchCard from "../component/matchCard";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";


const MatchesPage = () => {

  
    const { loading,activeProfileId: profileId } = useAuth();
  const [data, setData] = useState({
    perfect: [],
    strong: [],
    explore: []
  });

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await api.get(`/matches/${profileId}`);
    setData(res.data); 
    };

    fetchMatches();
  }, []);

  return (
    <div className="p-4 space-y-10">

      {/* PERFECT */}
      <div>
        <h2 className="text-xl font-bold mb-3"> Perfect Matches</h2>

     <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
          { loading
                  ? Array(6).fill().map((_, i) => <SkeletonCard key={i} />)
                  : 
          data.perfect.map(p => (
            <div key={p._id} className="min-w-[200px]">
              <MatchCard data={p} />
            </div>
          ))}
        </div>
      </div>

      {/* STRONG */}
      <div>
        <h2 className="text-xl font-bold mb-3"> Strong Matches</h2>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
           {loading
                  ? Array(6).fill().map((_, i) => <SkeletonCard key={i} />)
                  : data.strong.map(p => (
            <MatchCard key={p._id} data={p} />
          ))}
        </div>
      </div>

      {/* EXPLORE */}
      <div>
        <h2 className="text-xl font-bold mb-3">Explore More</h2>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
           {loading
                  ? Array(6).fill().map((_, i) => <SkeletonCard key={i} />)
                  : data.explore.map(p => (
            <MatchCard key={p._id} data={p} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default MatchesPage;