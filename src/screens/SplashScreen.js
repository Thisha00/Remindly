import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";

export default function SplashScreen({ navigation }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1800 });
    const timer = setTimeout(() => navigation.replace("Login"), 2200);
    return () => clearTimeout(timer);
  }, []);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`
  }));

  return (
    <LinearGradient colors={["#7C3AED", "#2836B8"]} style={styles.container}>
      <View style={styles.logoBox}>
        <Icon name="book" size={36} color="#FFFFFF" />
      </View>
      <Text style={styles.title}>Remindly</Text>
      <Text style={styles.subtitle}>Smart Assignment Management for Students</Text>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, progressStyle]} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 34
  },
  logoBox: {
    width: 82,
    height: 82,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    color: "#DDD6FE",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8
  },
  track: {
    width: 150,
    height: 4,
    borderRadius: 2,
    marginTop: 28,
    backgroundColor: "rgba(255,255,255,0.28)",
    overflow: "hidden"
  },
  fill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF"
  }
});
