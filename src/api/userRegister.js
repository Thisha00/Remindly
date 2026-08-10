import api from "./axios";
import { showGlobalToast } from "../services/toastService";
import { registerForPushNotificationsAsync } from "../services/Notification";
export async function userRegister({
  name,
  university,
  year,
  email,
  password,
}) {
  try {
    const expoPushToken = await registerForPushNotificationsAsync();
    const response = await api.post("/auth/register", {
      name,
      university,
      year,
      email,
      password,
      expoPushToken,
    });
    if (!response.data.success) {
      throw new Error("Registration failed");
    }
    showGlobalToast("Registration successful!", "success");
    return response.data;
  } catch (error) {
    console.error("Error during user registration:", error);
    showGlobalToast(
      error.response?.data?.message ||
        "Unable to create your account. Check your connection and try again.",
      "error",
    );
    throw error;
  }
}
