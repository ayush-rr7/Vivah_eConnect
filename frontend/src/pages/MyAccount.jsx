import { Link, useNavigate } from "react-router-dom";
import profile2 from "../assets/profile2.png";
import { useAuth } from "../context/AuthContext.jsx";
import { SkeletonCard, SkeletonUser } from "../component/skeleton.jsx";

function MyAccount() {
  const {
    user,
    loading,
    profiles,
    activeProfileId,
    setActiveProfileId,
  } = useAuth();

  const navigate = useNavigate();

  const handleActiveProfile = (profileId, e) => {
    e.preventDefault();
    setActiveProfileId(profileId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            My Account
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your profiles and partner preferences
          </p>
        </div>

        {/* User Card */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">

          {loading ? (
            <SkeletonUser />
          ) : (
            user && (
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

                {/* Image */}
                <div className="relative">
                  <img
                    src={profile2}
                    alt="profile"
                    className="h-28 w-28 object-cover rounded-full border-4 border-pink-100 shadow-sm"
                  />

                  <div className="absolute bottom-1 right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full" />
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">

                  <h2 className="text-2xl font-semibold text-gray-800">
                    {user.name}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {user.email}
                  </p>

                  <p className="text-gray-500">
                    {user.city}
                  </p>

                  <div className="mt-5">
                    <Link
                      to="/PartnerPreferences"
                      className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl transition duration-300 shadow-sm"
                    >
                      Edit Partner Preferences
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}
        </section>

        {/* Profiles Section */}
        <section>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Your Profiles
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {profiles?.length || 0} profiles available
              </p>
            </div>
          </div>

          {/* Profiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

            {loading
              ? Array(6)
                  .fill()
                  .map((_, i) => <SkeletonCard key={i} />)
              : profiles?.map((u) => (
                <div
  key={u._id}
  onClick={() => setActiveProfileId(u._id)}
  className={`
    relative cursor-pointer bg-white rounded-3xl overflow-hidden
    border transition-all duration-300
    hover:shadow-xl hover:-translate-y-1
    ${
  activeProfileId === u._id
    ? "border-green-500 ring-4 ring-green-100 shadow-lg"
    : "border-gray-100 shadow-sm hover:border-green-200"
}
  `}
>
  
  {/* Active Badge */}
  {activeProfileId === u._id && (
    <div className="absolute top-4 right-4 z-10">
    <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
  Active
</span>
    </div>
  )}

  <div className="p-4">

    <div className="flex gap-4">

      {/* Image */}
      <div className="h-44 w-32 overflow-hidden rounded-2xl flex-shrink-0">
        <img
          src={u.Images[0]}
          alt="profile"
          className="w-full h-full object-cover object-[center_25%]"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1">

        <div className="space-y-2">

          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {u.Name}
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              {u.Age} yrs • {u.Gender}
            </p>
          </div>

          <p className="text-gray-600 text-sm">
            {u.Caste}
          </p>

          <p className="text-green-600 font-semibold">
            ₹ {u.Income}
          </p>

          <span className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-medium">
            {u.Martial_Status}
          </span>
        </div>

        {/* Active text */}
        <div className="mt-4">
          {activeProfileId === u._id ? (
            <p className="text-sm text-green-600 font-medium">
  Currently Active Profile
</p>
          ) : (
            <p className="text-sm text-gray-400">
              Click card to activate
            </p>
          )}
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/profile/edit/${u._id}`);
        }}
        className="
          px-5 py-2 rounded-xl
          bg-gray-100 hover:bg-gray-200
          text-gray-700 font-medium text-sm
          transition
        "
      >
        Edit Profile
      </button>

    </div>
  </div>
</div>
                ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyAccount;