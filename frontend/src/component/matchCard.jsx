import { useEffect, useState, useCallback, useMemo } from "react";
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

  // stable skeleton array (prevents re-creation every render)
  const skeletonArray = useMemo(() => Array(6).fill(0), []);

  // stable API call (prevents function recreation)
  const fetchMatches = useCallback(async (id, signal) => {
    if (!id) return;

    setLoading(true);

    try {
      const res = await api.get(`/matches/${id}`, { signal });
      setData(res.data);
    } catch (err) {
      if (err.name !== "CanceledError") {
        console.error("Failed to load matches:", err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // safe fetch with abort controller (prevents race conditions)
  useEffect(() => {
    if (!profileId) return;

    const controller = new AbortController();

    fetchMatches(profileId, controller.signal);

    return () => controller.abort();
  }, [profileId, fetchMatches]);

  const isLoading = loading || authLoading;

  // optimized section renderer
  const renderSection = useCallback((title, matches) => {
    return (
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 min-h-[420px]">

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
            ? skeletonArray.map((_, i) => (
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
  }, [isLoading, skeletonArray]);

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