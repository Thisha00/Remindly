import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import { useAssignments } from "../context/AssignmentContext";
import { useTheme } from "../context/ThemeContext";
import { globalStyles } from "../styles/globalStyles";
import {
  completeAssignmentApi,
  deleteAssignmentApi,
} from "../api/manageAssignment";
import { useLoading } from "../context/LoadingContext";

export default function AssignmentDetailsScreen({ route, navigation }) {
  const { assignments, completeAssignment, deleteAssignment } =
    useAssignments();
  const { colors } = useTheme();
  const assignment = assignments.find((item) => item.id === route.params.id);

  console.log("complete", assignment.completeStatus);
  const { showLoading, hideLoading } = useLoading();
  if (!assignment) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: colors.background }]}
      >
        <View style={styles.center}>
          <Text style={[styles.title, { color: colors.text }]}>
            Assignment not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  async function complete() {
    try {
      showLoading();
      await completeAssignmentApi(assignment.id);
      completeAssignment(assignment.id);
      navigation.goBack();
    } catch (e) {
    } finally {
      hideLoading();
    }
  }

  async function remove() {
    try {
      showLoading();
      await deleteAssignmentApi(assignment.id);
      deleteAssignment(assignment.id);
      navigation.goBack();
    } catch (e) {
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
            Assignment Details
          </Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.text }]}>
          {assignment.title}
        </Text>
        <Text style={[styles.subject, { color: colors.muted }]}>
          {assignment.subject}
        </Text>

        <View
          style={[
            styles.infoCard,
            globalStyles.shadow,
            { backgroundColor: colors.card },
          ]}
        >
          <Info
            label="Deadline"
            value={assignment.deadline}
            icon="calendar-outline"
            colors={colors}
          />
          <Info
            label="Priority"
            value={assignment.priority}
            icon="flag-outline"
            colors={colors}
          />
          <Info
            label="Difficulty"
            value={assignment.difficulty}
            icon="stats-chart-outline"
            colors={colors}
          />
          <Info
            label="PDF"
            value={assignment.fileName || "No file attached"}
            icon="document-attach-outline"
            colors={colors}
          />
        </View>

        <Text style={[styles.heading, { color: colors.text }]}>
          Additional Notes
        </Text>
        <View
          style={[
            styles.notes,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.noteText, { color: colors.muted }]}>
            {assignment.note ||
              "No additional notes were added for this assignment"}
          </Text>
        </View>

        {!assignment.completeStatus && (
          <View style={styles.actions}>
            <CustomButton
              title="Mark as Completed"
              onPress={complete}
              icon={
                <Icon
                  name="checkmark-circle-outline"
                  size={18}
                  color="#FFFFFF"
                />
              }
            />
            <CustomButton
              title="Delete Assignment"
              onPress={remove}
              danger
              icon={
                <Icon name="trash-outline" size={18} color={colors.danger} />
              }
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Info({ label, value, icon, colors }) {
  return (
    <View style={styles.infoRow}>
      <View style={[styles.infoIcon, { backgroundColor: colors.softPrimary }]}>
        <Icon name={icon} size={18} color={colors.primary} />
      </View>
      <View>
        <Text style={[styles.infoLabel, { color: colors.muted }]}>{label}</Text>
        <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    padding: 20,
    paddingBottom: 42,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 27,
    fontWeight: "900",
  },
  subject: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 20,
  },
  infoCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 22,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: "800",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "800",
    marginTop: 3,
  },
  heading: {
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 10,
  },
  notes: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    minHeight: 130,
  },
  noteText: {
    fontSize: 13,
    lineHeight: 21,
  },
  actions: {
    gap: 12,
    marginTop: 24,
  },
});
