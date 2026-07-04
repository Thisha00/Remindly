import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { useTheme } from "../context/ThemeContext";
import { globalStyles } from "../styles/globalStyles";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/authContex";
import { userLogin } from "../api/userlogin";

export default function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showToast } = useToast();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      showToast("Please fill all fields", "error");
      return;
    }
    const result = await userLogin({ email, password });
    login(result.data.user, result.data.accessToken, result.data.refreshToken);
    navigation.navigate("MainTabs");
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <View
          style={[
            styles.card,
            globalStyles.shadow,
            { backgroundColor: colors.card },
          ]}
        >
          <View style={styles.brand}>
            <View style={[styles.logo, { backgroundColor: colors.primary }]}>
              <Icon name="sparkles" size={18} color="#FFFFFF" />
            </View>
            <Text style={[styles.brandText, { color: colors.primary }]}>
              Remindly
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            Welcome back
          </Text>
          <Text style={[styles.sub, { color: colors.muted }]}>
            Please enter your details to access your dashboard.
          </Text>

          <InputField
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
          />
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgot}>
            <Text style={[styles.link, { color: colors.primary }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <CustomButton title="Sign in to Dashboard" onPress={handleLogin} />

          <Text style={[styles.footer, { color: colors.muted }]}>
            Don't have an account?{" "}
            <Text
              style={{ color: colors.primary }}
              onPress={() => navigation.navigate("Register")}
            >
              Create an account
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 22,
  },
  card: {
    borderRadius: 24,
    padding: 22,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  brandText: {
    fontSize: 15,
    fontWeight: "900",
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },
  sub: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 22,
  },
  forgot: {
    alignSelf: "flex-end",
    marginBottom: 14,
  },
  link: {
    fontSize: 12,
    fontWeight: "800",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 18,
  },
});
