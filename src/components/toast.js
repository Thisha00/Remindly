import { View, Text, StyleSheet } from "react-native";
import { useToast } from "../context/ToastContext";

export default function Toast() {
  const { toast } = useToast();

  if (!toast.visible) return null;

  return (
    <View
      style={[
        styles.container,
        toast.type === "success" && styles.success,
        toast.type === "error" && styles.error,
        toast.type === "warning" && styles.warning,
        toast.type === "info" && styles.info,
      ]}
    >
      <Text style={styles.text}>{toast.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    zIndex: 999,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
  success: {
    backgroundColor: "#22c55e",
  },
  error: {
    backgroundColor: "#ef4444",
  },
  warning: {
    backgroundColor: "#f59e0b",
  },
  info: {
    backgroundColor: "#3b82f6",
  },
});
