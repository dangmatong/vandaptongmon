import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import các trang (pages)
import HomePage from "../pages/Home";
import GanePage from "../pages/Game";
import NotFoundPage from "../pages/NotFound";
import Layout from "../components/Layout/Layout";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Định nghĩa các route */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/game"
          element={
            <Layout>
              <GanePage />
            </Layout>
          }
        />

        {/* Route không tìm thấy */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
