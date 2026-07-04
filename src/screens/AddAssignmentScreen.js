import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { useAssignments } from "../context/AssignmentContext";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import { uploadAssignment } from "../api/addAssignment";

export default function AddAssignmentScreen({ navigation }) {
  const { addAssignment } = useAssignments();
  const { colors } = useTheme();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [note, setNote] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

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

      console.log(file);
    } catch (error) {
      console.log(error);
    }
  }

  async function save() {
    if (!title || !subject || !pdfFile) {
      showToast("Please fill in all fields and upload a PDF file.", "error");
      return;
    }
    const result = await uploadAssignment({
      title,
      module: subject,
      showadditionalInfo: note,
      file: pdfFile,
    });
    console.log("Upload result:", result);
    addAssignment(result.data.assignment);
    navigation.goBack();
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
          Let's map out your next milestone.
        </Text>

        <InputField
          label="Assignment Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Database project"
        />
        <InputField
          label="Subject / Module"
          value={subject}
          onChangeText={setSubject}
          placeholder="Database Management"
        />
        <InputField
          label="Additional Note"
          value={note}
          onChangeText={setNote}
          placeholder="Write useful details"
          multiline
        />

        <TouchableOpacity
          style={[
            styles.upload,
            { borderColor: colors.border, backgroundColor: colors.card },
          ]}
          onPress={choosePdf}
        >
          <Icon name="cloud-upload-outline" size={28} color={colors.primary} />
          <Text style={[styles.uploadText, { color: colors.text }]}>
            Upload brief PDF
          </Text>
          <Text style={[styles.uploadSub, { color: colors.muted }]}>
            Max file size 10MB
          </Text>
        </TouchableOpacity>

        <CustomButton
          title="Save Assignment"
          onPress={save}
          icon={<Icon name="save-outline" size={18} color="#FFFFFF" />}
        />
      </ScrollView>
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
});
