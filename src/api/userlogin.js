import api from "./axios";
import { showGlobalToast } from "../services/toastService";

export async function userLogin({ email, password }) {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    if (!response.data.success) {
      showGlobalToast("Login failed.", "error");
      return;
    }

    showGlobalToast("Login successful!", "success");

    return response.data;
  } catch (error) {
    console.error("Error during user login:", error);

    if (error.response && error.response.data && error.response.data.message) {
      showGlobalToast(error.response.data.message, "error");
    } else {
      showGlobalToast("An unexpected error occurred during login.", "error");
    }
  }
}
