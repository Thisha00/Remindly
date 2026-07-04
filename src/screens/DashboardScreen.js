import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AssignmentCard from "../components/AssignmentCard";
import { useAssignments } from "../context/AssignmentContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/authContex";

export default function DashboardScreen({ navigation }) {
  const { assignments } = useAssignments();
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.hello, { color: colors.text }]}>
            {user ? `Hello, ${user.name}` : "Hello!"}
          </Text>
          <Text style={[styles.sub, { color: colors.muted }]}>
            Focus on your upcoming assignment deadlines.
          </Text>
        </View>
        <View style={[styles.avatar, { backgroundColor: colors.softPrimary }]}>
          <Icon name="school-outline" size={22} color={colors.primary} />
        </View>
      </View>

      <Text style={[styles.section, { color: colors.text }]}>
        Assignment Deadlines
      </Text>
      <FlatList
        data={assignments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>
            No assignments added yet
          </Text>
        }
        renderItem={({ item }) => (
          <AssignmentCard
            assignment={item}
            onPress={() =>
              navigation.navigate("AssignmentDetails", { id: item.id })
            }
          />
        )}
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate("AddAssignment")}
      >
        <Icon name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hello: {
    fontSize: 26,
    fontWeight: "900",
  },
  sub: {
    fontSize: 13,
    marginTop: 5,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    fontSize: 17,
    fontWeight: "900",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  empty: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 15,
  },
  fab: {
    position: "absolute",
    right: 22,
    bottom: 88,
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
  },
});
