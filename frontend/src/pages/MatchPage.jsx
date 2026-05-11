import { useEffect, useState } from "react";
import MatchCard from "../component/matchCard";
import {SkeletonCard} from "../component/skeleton";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const MatchesPage = () => {
  const { loading, activeProfileId: profileId } = useAuth();

  const [data, setData] = useState({
    perfect: [],
    strong: [],
    explore: [],
  });

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await api.get(`/matches/${profileId}`);
      setData(res.data);
    };

    fetchMatches();
  }, []);

  const renderSection = (title, matches) => (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {title}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {matches.length} profiles found
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(6)
              .fill()
              .map((_, i) => <SkeletonCard key={i} />)
          : matches.map((p) => (
              <MatchCard key={p._id} data={p} />
            ))}
      </div>

      {/* Empty State */}
      {!loading && matches.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No matches found
        </div>
      )}
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      
      <div className="max-w-7xl mx-auto space-y-8">

        {renderSection("Perfect Matches", data.perfect)}

        {renderSection("Strong Matches", data.strong)}

        {renderSection("Explore More", data.explore)}

      </div>
    </div>
  );
};

export default MatchesPage;