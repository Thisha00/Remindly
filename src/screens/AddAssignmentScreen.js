import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { useAssignments } from "../context/AssignmentContext";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import {
  completePendingAssignment,
  uploadAssignment,
} from "../api/addAssignment";
import { useLoading } from "../context/LoadingContext";
import Toast from "../components/toast";
import { deletePendingAssignment } from "../api/deletePendingAssignment";

export default function AddAssignmentScreen({ navigation }) {
  const { addAssignment } = useAssignments();
  const { colors } = useTheme();
  const [pdfFile, setPdfFile] = useState(null);
  const [missingFields, setMissingFields] = useState([]);
  const [manualFields, setManualFields] = useState({});
  const [missingModalVisible, setMissingModalVisible] = useState(false);
  const [pendingId, setPendingId] = useState(null);
  const reviewFields = [
    "title",
    "shortSummary",
    "module",
    "difficulty",
    "estimatedTime",
    "deadline",
  ];

  const { showLoading, hideLoading } = useLoading();
  const { showToast } = useToast();

  async function choosePdf() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });
      console.log("DocumentPicker result:", result);
      if (result.canceled) {
        return;
      }

      const file = result.assets[0];

      setPdfFile(file);
      showToast(`${file.name} is ready to upload.`, "success");

      console.log(file);
    } catch (error) {
      console.log(error);
      showToast("Could not open the PDF picker. Please try again.", "error");
    }
  }

  const fieldConfig = {
    title: { label: "Assignment Title", placeholder: "Database project" },
    shortSummary: {
      label: "Assignment Summary",
      placeholder: "Briefly describe the assignment",
      multiline: true,
      maxLength: 500,
    },
    module: { label: "Subject / Module", placeholder: "Database Management" },
    difficulty: {
      label: "Difficulty (0-10)",
      placeholder: "5",
      keyboardType: "numeric",
    },
    estimatedTime: {
      label: "Estimated Time (minutes)",
      placeholder: "120",
      keyboardType: "numeric",
    },
    deadline: {
      label: "Deadline (YYYY-MM-DD)",
      placeholder: "2026-08-31",
    },
  };
  async function resetForm() {
    await deletePendingAssignment(pendingId);
    setPdfFile(null);
    setMissingFields([]);
    setManualFields({});
    setPendingId(null);
    setMissingModalVisible(false);
  }

  async function save(fields = manualFields) {
    try {
      if (pendingId) {
        setMissingModalVisible(true);
        return;
      }
      showLoading();
      if (!pdfFile) {
        showToast("Please upload a PDF file.", "error");
        return;
      }
      const result = await uploadAssignment({
        manualFields: fields,
        file: pdfFile,
      });
      if (result?.code === "ASSIGNMENT_REVIEW_REQUIRED") {
        setMissingFields(result.data.missingFields);
        setPendingId(result.data.pendingId);
        setManualFields(result.data.fields);
        setMissingModalVisible(true);
        return;
      }
      if (!result?.data?.assignment) return;
      console.log("Upload result:", result);
      addAssignment(result.data.assignment);
      navigation.goBack();
    } catch (error) {
      console.error("Error uploading assignment:", error);
    } finally {
      hideLoading();
    }
  }

  async function submitMissingFields() {
    const invalidFields = reviewFields.filter((field) => {
      const value = String(manualFields[field] ?? "").trim();
      if (!value) return true;
      if (field === "difficulty") {
        const number = Number(value);
        return !Number.isFinite(number) || number < 0 || number > 10;
      }
      if (field === "estimatedTime") {
        const number = Number(value);
        return !Number.isFinite(number) || number < 1;
      }
      if (field === "deadline") {
        return (
          !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
          Number.isNaN(new Date(value).getTime())
        );
      }
      return false;
    });
    if (invalidFields.length) {
      setMissingFields(invalidFields);
      showToast("Complete or correct every field outlined in red.", "warning");
      return;
    }

    const difficulty = Number(manualFields.difficulty);
    const estimatedTime = Number(manualFields.estimatedTime);
    if (
      missingFields.includes("difficulty") &&
      (!Number.isFinite(difficulty) || difficulty < 0 || difficulty > 10)
    ) {
      showToast("Difficulty must be between 0 and 10.", "error");
      return;
    }
    if (
      missingFields.includes("estimatedTime") &&
      (!Number.isFinite(estimatedTime) || estimatedTime < 1)
    ) {
      showToast("Estimated time must be at least 1 minute.", "error");
      return;
    }

    if (!pendingId) {
      showToast("The temporary assignment could not be found.", "error");
      return;
    }

    try {
      showLoading();
      const result = await completePendingAssignment(pendingId, manualFields);
      if (result?.code === "MISSING_ASSIGNMENT_FIELDS") {
        setMissingFields(result.data.missingFields);
        setPendingId(result.data.pendingId);
        return;
      }
      if (!result?.data?.assignment) return;

      setMissingModalVisible(false);
      addAssignment(result.data.assignment);
      navigation.goBack();
    } catch (error) {
      console.error("Error completing pending assignment:", error);
      if (error.response?.data?.code === "PENDING_ASSIGNMENT_NOT_FOUND") {
        setPendingId(null);
        setMissingFields([]);
        setManualFields({});
        setMissingModalVisible(false);
      }
    } finally {
      hideLoading();
    }
  }
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={22} color={colors.primary} />
          <Text style={[styles.backText, { color: colors.primary }]}>
            Remindly
          </Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          New Assignment
        </Text>
        <Text style={[styles.sub, { color: colors.muted }]}>
          Upload the assignment brief and the details will be extracted
          automatically.
        </Text>

        <TouchableOpacity
          style={[
            styles.upload,
            { borderColor: colors.border, backgroundColor: colors.card },
          ]}
          onPress={choosePdf}
        >
          <Icon name="cloud-upload-outline" size={28} color={colors.primary} />
          <Text
            style={[styles.uploadText, { color: colors.text }]}
            numberOfLines={1}
          >
            {pdfFile ? pdfFile.name : "Upload brief PDF"}
          </Text>
          <Text style={[styles.uploadSub, { color: colors.muted }]}>
            {pdfFile ? "Tap to choose a different PDF" : "Max file size 20MB"}
          </Text>
        </TouchableOpacity>

        <CustomButton
          title="Save Assignment"
          onPress={save}
          icon={<Icon name="save-outline" size={18} color="#FFFFFF" />}
        />
      </ScrollView>

      <Modal
        visible={missingModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMissingModalVisible(false)}
      >
        <Toast />
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Review assignment
            </Text>
            <Text style={[styles.modalText, { color: colors.muted }]}>
              Check every extracted value before saving. Missing or invalid
              fields are outlined in red, and all fields can be edited.
            </Text>
            <ScrollView keyboardShouldPersistTaps="handled">
              {reviewFields.map((field) => (
                <InputField
                  key={field}
                  {...fieldConfig[field]}
                  error={missingFields.includes(field)}
                  value={manualFields[field] ?? ""}
                  onChangeText={(value) =>
                    setManualFields((current) => ({
                      ...current,
                      [field]: value,
                    }))
                  }
                />
              ))}
              <CustomButton
                title="Save Assignment"
                onPress={submitMissingFields}
              />
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={async () => {
                  await resetForm();
                }}
              >
                <Text style={{ color: colors.muted }}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    padding: 20,
    paddingBottom: 42,
  },
  back: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30,
    marginBottom: 18,
  },
  backText: {
    fontWeight: "800",
    marginLeft: 4,
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
  },
  sub: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 24,
  },
  upload: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 18,
    minHeight: 135,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: "900",
    marginTop: 10,
  },
  uploadSub: {
    fontSize: 11,
    marginTop: 4,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
    padding: 20,
  },
  modalCard: {
    borderRadius: 20,
    padding: 20,
    maxHeight: "85%",
  },
  modalTitle: { fontSize: 21, fontWeight: "900" },
  modalText: { fontSize: 13, lineHeight: 19, marginTop: 6, marginBottom: 18 },
  cancelButton: { alignItems: "center", padding: 14 },
});
