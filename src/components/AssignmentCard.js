import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../context/ThemeContext";
import { globalStyles } from "../styles/globalStyles";

export default function AssignmentCard({ assignment, onPress }) {
  const { colors } = useTheme();
  const danger = assignment.priority === "Urgent";

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={[
        styles.card,
        globalStyles.shadow,
        { backgroundColor: colors.card, borderColor: danger ? colors.danger : colors.border }
      ]}
    >
      <View style={[styles.icon, { backgroundColor: danger ? "#FEE2E2" : colors.softPrimary }]}>
        <Icon name="document-text-outline" size={20} color={danger ? colors.danger : colors.primary} />
      </View>
      <View style={styles.content}>
        <View style={globalStyles.between}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {assignment.title}
          </Text>
          <Text style={[styles.badge, { color: danger ? colors.danger : colors.primary }]}>
            {assignment.priority}
          </Text>
        </View>
        <Text style={[styles.subject, { color: colors.muted }]} numberOfLines={1}>
          {assignment.subject}
        </Text>
        <Text style={[styles.deadline, { color: colors.muted }]}>Due {assignment.deadline}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  content: {
    flex: 1
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "800"
  },
  badge: {
    fontSize: 10,
    fontWeight: "800",
    marginLeft: 8
  },
  subject: {
    fontSize: 12,
    marginTop: 3
  },
  deadline: {
    fontSize: 11,
    marginTop: 5
  }
});
