// services/toastService.js

let toastHandler = null;

export const registerToast = (handler) => {
  toastHandler = handler;
};

export const showGlobalToast = (message, type = "success") => {
  toastHandler?.(message, type);
};
