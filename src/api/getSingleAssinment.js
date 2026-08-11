import api from "./axios";
import { showGlobalToast } from "../services/toastService";
export async function getSingleAssignmentApi(assignmentId) {
  try {
    const response = await api.get(`/assignment/${assignmentId}/get`);
    if (response.data.success) {
      showGlobalToast("Assignment retrieved successfully.", "success");
      return response.data.data;
    } else {
      throw new Error("Failed to fetch assignment");
    }
  } catch (error) {
    showGlobalToast(
      error.response?.data?.message ||
        "Could not load assignment. Check your connection and try again.",
      "error",
    );
    console.error("Error fetching assignment:", error);
    throw error;
  }
}
