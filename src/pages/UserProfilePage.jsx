import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  FiGithub,
  FiBookmark,
  FiArrowLeft,
  FiExternalLink,
  FiAlertCircle,
  FiLoader
} from "../assets/icons";
import { getUserName } from "../service/api/userService";
import { useAppContext } from "../context/AppContext";

export default function UserProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user, setUser, loading, setLoading, error, setError } = useAppContext();

  useEffect(() => {
    fetchUserData();
  }, [username]);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getUserName(username);
      setUser(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("User not found. Please check the username.");
      } else {
        setError("Failed to fetch user data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-app-gradient flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-16 h-16 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-app-gradient flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
          <FiAlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-button-gradient text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-app-gradient">
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
        >
          <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Search
        </button>

        <div className="card-glass rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="h-32 bg-button-gradient"></div>

          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-32 h-32 rounded-2xl border-4 border-slate-900 shadow-xl"
                />

                <div className="mb-2">
                  <h1 className="text-3xl font-bold text-white mb-1">
                    {user.name || user.login}
                  </h1>
                  <p className="text-purple-300 text-lg mb-2">@{user.login}</p>
                  <p className="text-gray-300 max-w-2xl">{user.bio}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                <FiBookmark className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">
                  {user.public_repos}
                </p>
                <p className="text-gray-400 text-sm">Public Repositories</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-center">
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-all hover:scale-105"
                >
                  <FiGithub className="w-5 h-5" />
                  View on GitHub
                  <FiExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {user.created_at && (
              <div className="mt-4 text-sm text-gray-400">
                Joined: {moment(user.created_at).format("MMMM D, YYYY")}
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate(`/repos/${username}`)}
            className=" px-8 py-4 bg-button-gradient text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-2"
          >
            View All Repositories
            <FiBookmark className="w-5 h-5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}