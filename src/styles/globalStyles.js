import { StyleSheet } from "react-native";

export const spacing = {
  page: 20,
  radius: 18
};

export const globalStyles = StyleSheet.create({
  flex: {
    flex: 1
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4
  }
});
