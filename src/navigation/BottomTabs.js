import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import DashboardScreen from "../screens/DashboardScreen";
import ProgressScreen from "../screens/ProgressScreen";
import CalendarScreen from "../screens/CalendarScreen";
import ReminderScreen from "../screens/ReminderScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useTheme } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();

function tabIcon(name, focused, color) {
  const icons = {
    Home: focused ? "home" : "home-outline",
    Progress: focused ? "analytics" : "analytics-outline",
    Calendar: focused ? "calendar" : "calendar-outline",
    Reminder: focused ? "notifications" : "notifications-outline",
    Profile: focused ? "person" : "person-outline"
  };
  return <Icon name={icons[name]} size={21} color={color} />;
}

export default function BottomTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          height: 66,
          marginBottom: 10,
          paddingBottom: 8,
          paddingTop: 10,
          backgroundColor: colors.card,
          borderTopColor: colors.border
        },
        tabBarIcon: ({ focused, color }) => tabIcon(route.name, focused, color)
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Reminder" component={ReminderScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
