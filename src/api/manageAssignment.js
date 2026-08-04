import api from "./axios";
import { showGlobalToast } from "../services/toastService";

export async function completeAssignmentApi(assignmentId) {
  try {
    console.log("id is", assignmentId);
    const response = await api.patch(`/assignment/${assignmentId}/complete`);

    if (response.data.success) {
      showGlobalToast("Assignment marked as completed.", "success");
      return response.data.data;
    }
    throw new Error("Failed to complete assignment");
  } catch (error) {
    showGlobalToast(
      error.response?.data?.message ||
        "Could not mark this assignment as completed. Please try again.",
      "error",
    );
    console.error("Error completing assignment:", error);
    throw error;
  }
}

export async function deleteAssignmentApi(assignmentId) {
  try {
    const response = await api.delete(`/assignment/${assignmentId}/delete`);

    if (response.data.success) {
      showGlobalToast("Assignment deleted successfully.", "success");
      return response.data.data;
    }
    throw new Error("Failed to delete assignment");
  } catch (error) {
    showGlobalToast(
      error.response?.data?.message ||
        "Could not delete this assignment. Please try again.",
      "error",
    );
    console.error("Error deleting assignment:", error);
    throw error;
  }
}
