import { createContext, useState, useContext } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [sound, setSound] = useState(false);

  return (
    <StoreContext.Provider value={{ sound, setSound }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
