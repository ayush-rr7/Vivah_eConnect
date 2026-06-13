import { useEffect, useState, useCallback } from "react";
import MatchCard from "../component/matchCard";
import { SkeletonCard } from "../component/skeleton";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const MatchesPage = () => {
  const { loading: authLoading, activeProfileId: profileId } = useAuth();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    perfect: [],
    strong: [],
    explore: [],
  });

  // stable API call
  const fetchMatches = useCallback(async (id) => {
    if (!id) return;

    setLoading(true);

    try {
      const res = await api.get(`/matches/${id}`);
      setData(res.data);
    } catch (err) {
      console.error("Failed to load matches:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches(profileId);
  }, [profileId, fetchMatches]);

  // reusable section renderer
  const renderSection = (title, matches) => {
    const isLoading = loading || authLoading;

    return (
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">

        {/* HEADER */}
        <div className="mb-4 sm:mb-5">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
            {title}
          </h2>

          {!isLoading && (
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {matches.length} profiles found
            </p>
          )}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

          {isLoading
            ? Array(6).fill(0).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : matches.map((p) => (
                <MatchCard key={p._id} data={p} />
              ))
          }

        </div>

        {/* EMPTY STATE */}
        {!isLoading && matches.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            No matches found
          </div>
        )}

      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-4">

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

        {renderSection("Perfect Matches", data.perfect)}
        {renderSection("Strong Matches", data.strong)}
        {renderSection("Explore More", data.explore)}

      </div>

    </div>
  );
};

export default MatchesPage;