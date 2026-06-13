import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AssignmentProvider } from "./src/context/AssignmentContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <ThemeProvider>
      <AssignmentProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AssignmentProvider>
    </ThemeProvider>
  );
}
