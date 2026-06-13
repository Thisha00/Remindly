import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function InputField({ label, value, onChangeText, placeholder, secureTextEntry, multiline }) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.textArea,
          { color: colors.text, backgroundColor: colors.card, borderColor: colors.border }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 14
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 7
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 14,
    fontSize: 14
  },
  textArea: {
    minHeight: 92,
    paddingTop: 14,
    textAlignVertical: "top"
  }
});
