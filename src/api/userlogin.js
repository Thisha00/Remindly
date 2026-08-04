import api from "./axios";
import { showGlobalToast } from "../services/toastService";

export async function userLogin({ email, password }) {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    if (!response.data.success) {
      throw new Error("Login failed");
    }

    showGlobalToast("Login successful!", "success");

    return response.data;
  } catch (error) {
    console.error("Error during user login:", error);

    showGlobalToast(
      error.response?.data?.message ||
        "Unable to sign in. Check your connection and try again.",
      "error",
    );
    throw error;
  }
}
