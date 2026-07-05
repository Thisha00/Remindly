import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ReminderCard from "../components/ReminderCard";
import { useAssignments } from "../context/AssignmentContext";
import { useTheme } from "../context/ThemeContext";

export default function ReminderScreen() {
  const { assignments } = useAssignments();
  const { colors } = useTheme();
  const sorted = assignments;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <View>
            <Text style={[styles.title, { color: colors.text }]}>
              Reminders
            </Text>
            <Text style={[styles.sub, { color: colors.muted }]}>
              Stay ahead with smart upcoming deadline alerts.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>
            No upcoming reminders
          </Text>
        }
        renderItem={({ item }) => <ReminderCard assignment={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    padding: 20,
    paddingBottom: 95,
  },
  title: {
    fontSize: 25,
    paddingTop: 30,
    fontWeight: "900",
  },
  sub: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 20,
  },
  empty: {
    textAlign: "center",
    marginTop: 60,
  },
});
