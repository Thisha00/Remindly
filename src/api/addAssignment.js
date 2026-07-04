import api from "./axios";
import { showGlobalToast } from "../services/toastService";

export async function uploadAssignment({
  title,
  module,
  showadditionalInfo,
  file,
}) {
  try {
    const formData = new FormData();
    console.log("Uploading assignment with data:", file);
    formData.append("title", title);
    formData.append("module", module);
    formData.append("showadditionalInfo", showadditionalInfo);

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
      showGlobalToast("Assignment upload failed.", "error");
      return;
    }

    showGlobalToast("Assignment uploaded successfully!", "success");
    console.log("Upload response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during assignment upload:", error);

    if (error.response && error.response.data && error.response.data.message) {
      showGlobalToast(error.response.data.message, "error");
    } else {
      showGlobalToast("An unexpected error occurred during upload.", "error");
    }
  }
}
