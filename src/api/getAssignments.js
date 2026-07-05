import api from "./axios";
import { showGlobalToast } from "../services/toastService";
export async function getAssignments(page = 1, limit = 10) {
  try {
    const response = await api.get(
      `/assignment/getAssignments?page=${page}&limit=${limit}`,
    );
    if (response.data.success) {
      showGlobalToast("Assignments fetched successfully!", "success");
      return response.data.data;
    } else {
      showGlobalToast("Failed to fetch assignments.", "error");
      throw new Error("Failed to fetch assignments");
    }
  } catch (error) {
    showGlobalToast("An error occurred while fetching assignments.", "error");
    console.error("Error fetching assignments:", error);
  }
}
