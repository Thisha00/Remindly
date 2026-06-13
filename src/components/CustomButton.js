import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function CustomButton({ title, onPress, danger, outline, icon }) {
  const { colors } = useTheme();
  const backgroundColor = outline ? "transparent" : danger ? "#FEE2E2" : colors.primary;
  const borderColor = danger ? colors.danger : colors.primary;
  const textColor = outline || danger ? borderColor : "#FFFFFF";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.button, { backgroundColor, borderColor }]}
    >
      {icon}
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
  },
  text: {
    fontSize: 14,
    fontWeight: "700"
  }
});
