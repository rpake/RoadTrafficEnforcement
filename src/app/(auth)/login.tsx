import { useState } from "react";
import { ScrollView, Text, ActivityIndicator } from "react-native";
import { Link, router } from "expo-router";
import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";
import { supabase, configured } from "@/services/supabase";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function login() {
    setError("");
    if (!email.includes("@") || password.length < 6) {
      setError("Enter a valid email and password (at least 6 characters).");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      router.replace("/(tabs)");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 24,
        flexGrow: 1,
        justifyContent: "center",
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>
        Road Traffic Enforcement
      </Text>
      <Text>Student demonstration — not an official enforcement service.</Text>
      {!configured ? (
        <Text style={{ color: "#B42318" }}>
          Set Supabase environment variables in .env before signing in.
        </Text>
      ) : null}
      <AppInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <AppInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={{ color: "#B42318" }}>{error}</Text> : null}
      {busy ? (
        <ActivityIndicator />
      ) : (
        <AppButton title="Sign In" onPress={() => void login()} />
      )}
      <Link href="/(auth)/register">Create account</Link>
      <Link href="/(auth)/forgot-password">Reset password</Link>
    </ScrollView>
  );
}
