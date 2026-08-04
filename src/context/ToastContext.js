import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    type: "success",
    message: "",
  });
  const timerRef = useRef(null);

  const hideToast = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setToast((previous) => ({ ...previous, visible: false }));
  }, []);

  const showToast = useCallback((message, type = "success", duration = 4000) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({
      visible: true,
      type,
      message,
    });

    timerRef.current = setTimeout(hideToast, duration);
  }, [hideToast]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast, toast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
