import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    type: "success",
    message: "",
  });

  const showToast = (message, type = "success") => {
    setToast({
      visible: true,
      type,
      message,
    });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ showToast, toast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
