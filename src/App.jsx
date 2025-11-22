import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import UserProfilePage from "./pages/UserProfilePage";
import UserRepoPage from "./pages/UserRepoPage";
import UserSearchPage from "./pages/UserSearchPage";
import { FiGithub } from "react-icons/fi";
import { AppProvider } from "./context/AppContext";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen  text-white flex flex-col gap-3 items-center justify-center bg-app-gradient">
      <FiGithub className="w-12 h-12 text-white" />
      <span className="text-4xl">404 - Page Not Found</span>
       <button
            onClick={() => navigate("/")}
            className="px-6 py-3 cursor-pointer  text-white font-semibold rounded-xl bg-button-gradient transition-all"
          >
            Back to Search
          </button>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserSearchPage />} />
          <Route path="/user/:username" element={<UserProfilePage />} />
          <Route path="/repos/:username" element={<UserRepoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
