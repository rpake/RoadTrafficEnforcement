import { useState } from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";
import { supabase } from "@/services/supabase";
export default function Forgot() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  async function reset() {
    if (!email.includes("@")) {
      setMessage("Enter a valid email");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
    setMessage(
      error
        ? error.message
        : "If the address exists, reset instructions will be emailed.",
    );
  }
  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 22 }}>Reset Password</Text>
      <AppInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <AppButton title="Send Reset Email" onPress={() => void reset()} />
      <Text>{message}</Text>
      <Link href="/(auth)/login">Back to login</Link>
    </View>
  );
}
