import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiGithub,
  FiSearch,
  FiUsers,
} from "react-icons/fi";
import { featureCards } from "../config/data";

export default function UserSearchPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const icons = { FiUsers, FiGithub };

  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/user/${username.trim()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <div className="min-h-screen bg-app-gradient">
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Header */}
        <div className="text-center mb-12 ">
          <div className="flex items-center justify-center mb-6">
            <FiGithub className="w-20 h-20 text-white animate-bounce" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">
            GitHub Explorer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover developers, explore repositories, and dive into the world
            of open source
          </p>
        </div>

        {/* Search Box */}
        <div className="w-full max-w-3xl mb-12 px-4 sm:px-0">
          <div className="relative bg-white rounded-2xl shadow-2xl p-4 sm:p-2">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-button-gradient rounded-xl">
                <FiSearch className="w-6 h-6 text-white" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter GitHub username..."
                className="flex-1 w-full px-4 py-3 text-base sm:text-lg bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
              />
              <button
                onClick={handleSearch}
                disabled={!username.trim()}
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 
                    bg-button-gradient text-white 
                     font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700
                     disabled:cursor-not-allowed 
                     transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Search
              </button>
            </div>
          </div>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Press{" "}
            <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300 font-mono text-xs">
              Enter
            </kbd>{" "}
            or click Search
          </p>
        </div>

        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-6">
          {featureCards.map((card, i) => {
            const Icon = icons[card.icon];
            return (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200"
              >
                <div
                  className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm">{card.description}</p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            Powered by GitHub API • Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
