import AppRoutes from "./routes/AppRoutes";
import { StoreProvider } from "./utils/store";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <AppRoutes />
        <ToastContainer />
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
