import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AddAssignmentScreen from "../screens/AddAssignmentScreen";
import AssignmentDetailsScreen from "../screens/AssignmentDetailsScreen";
import BottomTabs from "./BottomTabs";
import { useToast } from "../context/ToastContext";
import { useEffect } from "react";
import { registerToast } from "../services/toastService";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { showToast } = useToast();

  useEffect(() => {
    registerToast(showToast);
  }, [showToast]);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen name="AddAssignment" component={AddAssignmentScreen} />
      <Stack.Screen
        name="AssignmentDetails"
        component={AssignmentDetailsScreen}
      />
    </Stack.Navigator>
  );
}
