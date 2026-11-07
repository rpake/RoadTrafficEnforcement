import { useState } from "react";
import { ScrollView, Text, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";
import { supabase } from "@/services/supabase";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function submit() {
    if (!email.includes("@") || password.length < 8) {
      setMessage("Use a valid email and at least 8 password characters.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      setMessage(
        "Account requested. Confirm your email if verification is enabled.",
      );
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Registration failed");
    } finally {
      setBusy(false);
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 24,
        gap: 12,
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Register Officer (Demo)
      </Text>
      <Text>
        Production officer access must be approved by an administrator.
      </Text>
      <AppInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <AppInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {message ? <Text>{message}</Text> : null}
      {busy ? (
        <ActivityIndicator />
      ) : (
        <AppButton title="Register" onPress={() => void submit()} />
      )}
      <Link href="/(auth)/login">Back to login</Link>
    </ScrollView>
  );
}
