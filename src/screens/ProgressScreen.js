import React from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/Ionicons";
import { useAssignments } from "../context/AssignmentContext";
import { useTheme } from "../context/ThemeContext";
import { globalStyles } from "../styles/globalStyles";

export default function ProgressScreen() {
  const { assignments, completedAssignments, complete, totalAssingments } =
    useAssignments();
  const { colors, darkMode } = useTheme();
  const total = totalAssingments;
  const percent = total === 0 ? 0 : complete / total;
  const screenWidth = Dimensions.get("window").width - 70;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <FlatList
        data={completedAssignments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <View>
            <Text style={[styles.title, { color: colors.text }]}>
              Assignment Progress
            </Text>
            <View
              style={[
                styles.card,
                globalStyles.shadow,
                { backgroundColor: colors.card },
              ]}
            >
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Assignment Completion
              </Text>
              <ProgressChart
                data={{ data: [percent] }}
                width={screenWidth}
                height={190}
                strokeWidth={16}
                radius={62}
                hideLegend
                chartConfig={{
                  backgroundGradientFrom: colors.card,
                  backgroundGradientTo: colors.card,
                  color: (opacity = 1) => `rgba(109, 40, 217, ${opacity})`,
                  labelColor: () => colors.text,
                  propsForBackgroundLines: { stroke: colors.border },
                }}
              />
              <Text style={[styles.percent, { color: colors.primary }]}>
                {Math.round(percent * 100)}%
              </Text>
              <View style={styles.stats}>
                <Stat
                  label="Complete"
                  value={complete}
                  color={colors.success}
                />
                <Stat
                  label="Remaining"
                  value={totalAssingments - complete}
                  color={darkMode ? "#FCA5A5" : colors.danger}
                />
              </View>
            </View>
            <Text style={[styles.historyTitle, { color: colors.text }]}>
              History
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>
            No completed assignments yet
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.history,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Icon name="checkmark-circle" size={22} color={colors.success} />
            <View style={styles.historyText}>
              <Text style={[styles.historyName, { color: colors.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.historyMeta, { color: colors.muted }]}>
                Completed {item.completedAt}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function Stat({ label, value, color }) {
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
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
    fontWeight: "900",
    paddingTop: 30,
    marginBottom: 14,
  },
  card: {
    borderRadius: 22,
    padding: 18,
    alignItems: "center",
  },
  cardTitle: {
    alignSelf: "flex-start",
    fontSize: 15,
    fontWeight: "900",
  },
  percent: {
    position: "absolute",
    top: 110,
    fontSize: 30,
    fontWeight: "900",
  },
  stats: {
    flexDirection: "row",
    gap: 28,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "900",
  },
  statLabel: {
    color: "#9CA3AF",
    fontSize: 11,
    marginTop: 3,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 24,
    marginBottom: 12,
  },
  history: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  historyText: {
    marginLeft: 10,
  },
  historyName: {
    fontSize: 14,
    fontWeight: "800",
  },
  historyMeta: {
    fontSize: 11,
    marginTop: 3,
  },
  empty: {
    textAlign: "center",
    marginTop: 18,
  },
});
