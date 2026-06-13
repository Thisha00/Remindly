import React, { useMemo, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import AssignmentCard from "../components/AssignmentCard";
import { useAssignments } from "../context/AssignmentContext";
import { useTheme } from "../context/ThemeContext";

export default function CalendarScreen({ navigation }) {
  const { assignments } = useAssignments();
  const { colors, darkMode } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const markedDates = useMemo(() => {
    const marks = {};
    assignments.forEach((item) => {
      marks[item.deadline] = {
        marked: true,
        dotColor: colors.primary
      };
    });
    marks[selectedDate] = {
      ...(marks[selectedDate] || {}),
      selected: true,
      selectedColor: colors.primary
    };
    return marks;
  }, [assignments, selectedDate, colors.primary]);

  const dayAssignments = assignments.filter((item) => item.deadline === selectedDate);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <FlatList
        data={dayAssignments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <View>
            <Text style={[styles.title, { color: colors.text }]}>Calendar</Text>
            <Calendar
              markedDates={markedDates}
              onDayPress={(day) => setSelectedDate(day.dateString)}
              theme={{
                calendarBackground: colors.card,
                dayTextColor: colors.text,
                monthTextColor: colors.text,
                textDisabledColor: colors.border,
                arrowColor: colors.primary,
                todayTextColor: colors.primary,
                selectedDayBackgroundColor: colors.primary,
                textSectionTitleColor: colors.muted,
                backgroundColor: colors.background,
                textDayFontWeight: "600",
                textMonthFontWeight: "900"
              }}
              style={[styles.calendar, { borderColor: colors.border }]}
            />
            <Text style={[styles.today, { color: colors.text }]}>Assignments on {selectedDate}</Text>
          </View>
        }
        ListEmptyComponent={<Text style={[styles.empty, { color: colors.muted }]}>No assignments on this date</Text>}
        renderItem={({ item }) => (
          <AssignmentCard assignment={item} onPress={() => navigation.navigate("AssignmentDetails", { id: item.id })} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    padding: 20,
    paddingBottom: 95
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
    paddingTop: 30,
    marginBottom: 14
  },
  calendar: {
    borderWidth: 1,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 22
  },
  today: {
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 12
  },
  empty: {
    textAlign: "center",
    marginTop: 20
  }
});
