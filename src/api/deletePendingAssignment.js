import { showGlobalToast } from "../services/toastService";
import api from "./axios";
export async function deletePendingAssignment(assignmentId) {
  try {
    const response = await api.delete(
      `/assignment/${assignmentId}/deletePending`,
    );
    if (response.data.success) {
      showGlobalToast("Pending assignment deleted successfully.", "success");
      return response.data;
    }
  } catch (error) {
    showGlobalToast("Failed to delete pending assignment.", "error");
    console.log("error when delete pending assignment", error);
  }
}
