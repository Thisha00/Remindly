import React from "react";
import {
  Image,
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
import { useAuth } from "../context/authContex";
import { useLoading } from "../context/LoadingContext";
import { getInitials } from "../utils/getInitials";

export default function ProfileScreen({ navigation }) {
  const { assignments, completedAssignments, complete, totalAssingments } =
    useAssignments();
  const { colors, darkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        <View
          style={[
            styles.card,
            globalStyles.shadow,
            { backgroundColor: colors.card },
          ]}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getInitials(user?.name ?? "ab")}
            </Text>
          </View>
          <Text style={[styles.name, { color: colors.text }]}>
            {user.name ?? ""}
          </Text>
          <Text style={[styles.email, { color: colors.muted }]}>
            {user.email ?? ""}/{user.university || ""}
          </Text>
          <View style={styles.stats}>
            <Metric
              label="To-do"
              value={totalAssingments - complete}
              colors={colors}
            />
            <Metric label="Completed" value={complete} colors={colors} />
          </View>
        </View>

        <View
          style={[
            styles.menu,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <TouchableOpacity style={styles.row} onPress={toggleDarkMode}>
            <View style={styles.rowLeft}>
              <Icon
                name={darkMode ? "moon" : "moon-outline"}
                size={20}
                color={colors.primary}
              />
              <Text style={[styles.rowText, { color: colors.text }]}>
                Dark Mode
              </Text>
            </View>
            <View
              style={[
                styles.toggle,
                { backgroundColor: darkMode ? colors.primary : colors.border },
              ]}
            >
              <View style={[styles.knob, darkMode && styles.knobOn]} />
            </View>
          </TouchableOpacity>
          <MenuRow
            icon="notifications-outline"
            label="Notification Settings"
            colors={colors}
          />
          <MenuRow icon="help-circle-outline" label="Help" colors={colors} />
          <MenuRow
            icon="information-circle-outline"
            label="About Us"
            colors={colors}
          />
        </View>

        <CustomButton
          title="Log Out"
          danger
          onPress={() => {
            logout();
            navigation.replace("Login");
          }}
          icon={<Icon name="log-out-outline" size={18} color={colors.danger} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function Metric({ label, value, colors }) {
  return (
    <View style={[styles.metric, { backgroundColor: colors.softPrimary }]}>
      <Text style={[styles.metricValue, { color: colors.primary }]}>
        {value}
      </Text>
      <Text style={[styles.metricLabel, { color: colors.muted }]}>{label}</Text>
    </View>
  );
}

function MenuRow({ icon, label, colors }) {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.rowLeft}>
        <Icon name={icon} size={20} color={colors.primary} />
        <Text style={[styles.rowText, { color: colors.text }]}>{label}</Text>
      </View>
      <Icon name="chevron-forward" size={18} color={colors.muted} />
    </TouchableOpacity>
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
    marginBottom: 18,
  },
  card: {
    alignItems: "center",
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  name: {
    fontSize: 21,
    fontWeight: "900",
  },
  email: {
    fontSize: 12,
    marginTop: 5,
  },
  stats: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },
  metric: {
    width: 104,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "900",
  },
  metricLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  menu: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    marginBottom: 18,
  },
  row: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowText: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 12,
  },
  toggle: {
    width: 46,
    height: 26,
    borderRadius: 13,
    padding: 3,
  },
  knob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  knobOn: {
    marginLeft: 20,
  },
});
