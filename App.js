import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AssignmentProvider } from "./src/context/AssignmentContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import Toast from "./src/components/toast";
import { ToastProvider } from "./src/context/ToastContext";
import { AuthProvider } from "./src/context/authContex";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          <AssignmentProvider>
            <NavigationContainer>
              <Toast />
              <AppNavigator />
            </NavigationContainer>
          </AssignmentProvider>
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
