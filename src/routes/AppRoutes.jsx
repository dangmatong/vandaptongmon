import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

// Import các trang (pages)
import HomePage from "../pages/Home";
import GamePage from "../pages/Game";
import EventPage from "../pages/Event";
import NotFoundPage from "../pages/NotFound";
import ContributeComments from "../pages/ContributeComments";
import Layout from "../components/Layout/Layout";
import Login from "../pages/Login";

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
              <ProtectedRoute>
                <GamePage />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/game/:id"
          element={
            <Layout>
              <ProtectedRoute>
                <EventPage />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/contribute-comments"
          element={
            <Layout>
              <ContributeComments />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute pageLogin={true}>
              <Login></Login>
            </ProtectedRoute>
          }
        />

        {/* Route không tìm thấy */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
