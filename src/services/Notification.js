import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export async function registerForPushNotificationsAsync() {
  // Push notifications require a real/development Android device
  if (!Device.isDevice) {
    console.log("Push notifications require a physical device.");
    return null;
  }

  // Check existing permission
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  // Ask permission if not already granted
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();

    finalStatus = status;
  }

  // Permission denied
  if (finalStatus !== "granted") {
    console.log("Notification permission denied.");
    return null;
  }

  try {
    // Get native FCM token
    const token = (await Notifications.getDevicePushTokenAsync()).data;

    console.log("FCM Token:", token);

    return token;
  } catch (error) {
    console.error("Failed to get FCM token:", error);
    return null;
  }
}
export function setupNotificationNavigation(navigationRef) {
  const subscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      const data = response.notification.request.content.data;

      console.log("Notification data:", data);

      if (data?.type === "assignment" && data?.assignmentId) {
        navigationRef.current?.navigate("AssignmentDetails", {
          id: data.assignmentId,
        });
      }
    },
  );

  return subscription;
}
