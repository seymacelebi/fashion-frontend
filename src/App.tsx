import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CombinationsPage from "./pages/CombinationsPage";
import WardrobePage from "./pages/WardrobePage";
import LoginPage from "./pages/LoginPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route
        path="/wardrobe"
        element={
          <ProtectedRoute>
            <WardrobePage />
          </ProtectedRoute>
        }
      />
      <Route path="/combinations" element={<CombinationsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* Gelecekte 404 sayfası için: <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default App;
