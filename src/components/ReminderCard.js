import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../context/ThemeContext";
import { globalStyles } from "../styles/globalStyles";

export default function ReminderCard({ assignment }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, globalStyles.shadow, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.icon, { backgroundColor: colors.softPrimary }]}>
        <Icon name="alarm-outline" size={20} color={colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.label, { color: colors.primary }]}>Upcoming deadline</Text>
        <Text style={[styles.title, { color: colors.text }]}>{assignment.title}</Text>
        <Text style={[styles.detail, { color: colors.muted }]}>
          {assignment.subject} • Due {assignment.deadline}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row"
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
  label: {
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 5
  },
  title: {
    fontSize: 15,
    fontWeight: "800"
  },
  detail: {
    fontSize: 12,
    marginTop: 5
  }
});
