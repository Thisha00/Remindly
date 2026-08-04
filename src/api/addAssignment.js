import api from "./axios";
import { showGlobalToast } from "../services/toastService";

export async function uploadAssignment({
  title,
  module,
  additionalInfo,
  manualFields = {},
  file,
}) {
  try {
    const formData = new FormData();
    console.log("Uploading assignment with data:", file);
    if (title) formData.append("title", title);
    if (module) formData.append("module", module);
    if (additionalInfo) formData.append("additionalInfo", additionalInfo);

    Object.entries(manualFields).forEach(([key, value]) => {
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        const backendKey = key === "shortSummary" ? "additionalInfo" : key;
        formData.append(backendKey, String(value).trim());
      }
    });

    formData.append("pdf", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || "application/pdf",
    });

    const response = await api.post("/upload/assignment-pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data.success) {
      throw new Error("Assignment upload failed");
    }

    if (response.data.code === "ASSIGNMENT_REVIEW_REQUIRED") {
      showGlobalToast(
        response.data.data.missingFields.length
          ? "PDF analyzed. Review all details and complete the red fields."
          : "PDF analyzed. Review the details before saving.",
        response.data.data.missingFields.length ? "warning" : "info",
      );
      return response.data;
    }

    showGlobalToast("PDF analyzed successfully.", "success");
    console.log("Upload response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during assignment upload:", error);
    console.log("Error response:", error.response);
    console.log("Error message:", error.message);
    console.log("Error config:", error.config);
    if (error.response?.data?.code === "MISSING_ASSIGNMENT_FIELDS") {
      showGlobalToast(
        "The PDF is missing some details. Please complete the requested fields.",
        "warning",
      );
      return error.response.data;
    }
    if (error.response && error.response.data && error.response.data.message) {
      showGlobalToast(error.response.data.message, "error");
    } else {
      showGlobalToast(
        "Could not upload or analyze the PDF. Check your connection and try again.",
        "error",
      );
    }
    throw error;
  }
}

export async function completePendingAssignment(pendingId, fields) {
  try {
    const response = await api.post(
      `/upload/assignment-pending/${pendingId}/complete`,
      fields,
    );
    showGlobalToast("Missing details added and assignment saved.", "success");
    return response.data;
  } catch (error) {
    if (error.response?.data?.code === "MISSING_ASSIGNMENT_FIELDS") {
      showGlobalToast(
        "Some values are still missing or invalid. Please check the highlighted form.",
        "warning",
      );
      return error.response.data;
    }
    showGlobalToast(
      error.response?.data?.message || "Unable to save the assignment.",
      "error",
    );
    throw error;
  }
}
