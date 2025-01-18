import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [sound, setSound] = useState(false);

  useEffect(() => {
    let text = "🚀 ";
    if (sound) text += "Đã bật âm thanh";
    else text += "Đã tắt âm thanh";

    toast.dismiss();
    if (!location.pathname.includes("/login")) {
      toast(text, {
        position: "top-right",
        pauseOnFocusLoss: false,
        closeOnClick: true,
        autoClose: 1500,
      });
    }
  }, [sound]);

  return (
    <StoreContext.Provider value={{ sound, setSound }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
