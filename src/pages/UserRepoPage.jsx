import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiGithub,
  FiStar,
  FiCode,
  FiExternalLink,
  FiArrowLeft,
  FiAlertCircle,
  FiLoader,
  FiSearch,
  FiFilter,
} from "../assets/icons";
import { getUserRepos } from "../service/api/userService";
import { useAppContext } from "../context/AppContext";

export default function UserRepoPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { repos, setRepos, loading, setLoading, error, setError } =
    useAppContext();
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("stars");

  useEffect(() => {
    fetchRepositories();
  }, [username]);

  useEffect(() => {
    filterAndSortRepos();
  }, [repos, searchTerm, sortBy]);

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserRepos(username);
      setRepos(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("User not found.");
      } else {
        setError("Failed to fetch repositories.");
      }
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortRepos = () => {
    let filtered = repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description &&
          repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    filtered.sort((a, b) => {
      if (sortBy === "stars") {
        return b.stargazers_count - a.stargazers_count;
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    setFilteredRepos(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-app-gradient flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-16 h-16 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Loading repositories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-app-gradient flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8 text-center">
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

  return (
    <div className="min-h-screen bg-app-gradient">
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <button
          onClick={() => navigate(`/user/${username}`)}
          className="mb-4 flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer"
        >
          <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Profile
        </button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {username}'s Repositories
          </h1>
          <p className="text-gray-400">
            {repos.length} public{" "}
            {repos.length === 1 ? "repository" : "repositories"}
          </p>
        </div>

        <div className="card-glass rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search repositories..."
                className="w-full pl-12 pr-4 py-3 card-glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="relative">
              <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-12 pr-8 py-3 card-glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer option-black"
              >
                <option value="stars">Sort by Stars</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>

          <p className="text-gray-400 text-sm">
            Showing {filteredRepos.length} of {repos.length} repositories
          </p>
        </div>

        {repos.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No public repositories found.
          </div>
        )}

        {repos.length > 0 && filteredRepos.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No repositories match your search.
          </div>
        )}

        <div className="grid gap-4">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="card-glass rounded-2xl p-6 hover:bg-white/15 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    className="text-xl font-semibold text-white hover:text-purple-400 transition-colors flex items-center gap-2 group"
                  >
                    <FiGithub className="flex-shrink-0" />
                    {repo.name}
                    <FiExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  {repo.description && (
                    <p className="text-gray-300 mt-2 line-clamp-2">
                      {repo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <FiCode className="w-4 h-4" />
                        {repo.language}
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <FiStar className="w-4 h-4 text-yellow-400" />
                      {repo.stargazers_count.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
