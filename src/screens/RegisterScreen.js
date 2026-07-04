import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { useTheme } from "../context/ThemeContext";
import { globalStyles } from "../styles/globalStyles";
import { useToast } from "../context/ToastContext";
import { userRegister } from "../api/userRegister";
import { useAuth } from "../context/authContex";

export default function RegisterScreen({ navigation }) {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [year, setYear] = useState(1);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const { showToast } = useToast();
  const { login } = useAuth();
  const handleRegister = async () => {
    if (!name || !email || !university || !year || !password || !confirm) {
      showToast("Please fill all fields", "error");
      return;
    }
    if (password !== confirm) {
      showToast("Passwords do not match", "error");
      return;
    }
    const result = await userRegister({
      name,
      university,
      year,
      email,
      password,
    });
    console.log("Registration result:", result);
    login(result.data.user, result.data.accessToken, result.data.refreshToken);
    navigation.navigate("MainTabs");
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={[
            styles.card,
            globalStyles.shadow,
            { backgroundColor: colors.card },
          ]}
        >
          <Text style={[styles.title, { color: colors.primary }]}>
            Join Remindly
          </Text>
          <Text style={[styles.sub, { color: colors.muted }]}>
            Elevate your academic journey with intelligent clarity.
          </Text>
          <InputField
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Alex Rivera"
          />
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="abc@example.com"
          />
          <InputField
            label="University"
            value={university}
            onChangeText={setUniversity}
            placeholder="USJP"
          />
          <InputField
            label="Year"
            value={year}
            onChangeText={setYear}
            placeholder="1"
          />
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <InputField
            label="Confirm Password"
            value={confirm}
            onChangeText={setConfirm}
            placeholder="Confirm password"
            secureTextEntry
          />
          <CustomButton title="Sign Up" onPress={handleRegister} />
          <Text style={[styles.footer, { color: colors.muted }]}>
            Already have an account?{" "}
            <Text
              style={{ color: colors.primary }}
              onPress={() => navigation.navigate("Login")}
            >
              Log In
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 22,
  },
  card: {
    borderRadius: 24,
    padding: 22,
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
  },
  sub: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 22,
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 18,
  },
});
