import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import các trang (pages)
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
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
          path="/about"
          element={
            <Layout>
              <AboutPage />
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
