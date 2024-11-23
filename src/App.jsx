import AppRoutes from "./routes/AppRoutes";
import { StoreProvider } from "./utils/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <StoreProvider>
      <AppRoutes />
      <ToastContainer />
    </StoreProvider>
  );
}

export default App;
