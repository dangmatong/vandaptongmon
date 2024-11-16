import AppRoutes from "./routes/AppRoutes";
import { StoreProvider } from "./utils/store";

function App() {
  return (
    <StoreProvider>
      <AppRoutes />
    </StoreProvider>
  );
}

export default App;
