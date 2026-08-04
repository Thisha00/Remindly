import api from "./axios";
import { showGlobalToast } from "../services/toastService";
export async function getAssignments(page = 1, limit = 100) {
  try {
    const response = await api.get(
      `/assignment/getAssignments?page=${page}&limit=${limit}`,
    );
    if (response.data.success) {
      showGlobalToast("Assignments are up to date.", "success");
      return response.data.data;
    } else {
      throw new Error("Failed to fetch assignments");
    }
  } catch (error) {
    showGlobalToast(
      error.response?.data?.message ||
        "Could not load assignments. Check your connection and try again.",
      "error",
    );
    console.error("Error fetching assignments:", error);
    throw error;
  }
}
