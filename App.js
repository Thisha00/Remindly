import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AssignmentProvider } from "./src/context/AssignmentContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import Toast from "./src/components/toast";
import { ToastProvider } from "./src/context/ToastContext";
import { AuthProvider } from "./src/context/authContex";
import { LoadingProvider } from "./src/context/LoadingContext";
import GlobalLoader from "./src/components/GlobalLoader";
import { RefreshProvider } from "./src/context/refreshContext";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { setupNotificationNavigation } from "./src/services/Notification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const navigationRef = useRef(null);

  useEffect(() => {
    const subscription = setupNotificationNavigation(navigationRef);

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <SafeAreaProvider>
      <LoadingProvider>
        <RefreshProvider>
          <AuthProvider>
            <ThemeProvider>
              <ToastProvider>
                <AssignmentProvider>
                  <NavigationContainer ref={navigationRef}>
                    <GlobalLoader />
                    <Toast />
                    <AppNavigator />
                  </NavigationContainer>
                </AssignmentProvider>
              </ToastProvider>
            </ThemeProvider>
          </AuthProvider>
        </RefreshProvider>
      </LoadingProvider>
    </SafeAreaProvider>
  );
}
