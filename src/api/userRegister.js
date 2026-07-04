import api from "./axios";
import { showGlobalToast } from "../services/toastService";
export async function userRegister({
  name,
  university,
  year,
  email,
  password,
}) {
  try {
    const response = await api.post("/auth/register", {
      name,
      university,
      year,
      email,
      password,
    });
    if (!response.success) {
      showGlobalToast("Registration failed.", "error");
    }
    showGlobalToast("Registration successful!", "success");
    return response.data;
  } catch (error) {
    console.error("Error during user registration:", error);
    if (error.response && error.response.data && error.response.data.message) {
      showGlobalToast(error.response.data.message, "error");
    } else {
      showGlobalToast(
        "An unexpected error occurred during registration.",
        "error",
      );
    }
  }
}
