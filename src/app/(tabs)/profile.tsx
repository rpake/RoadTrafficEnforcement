import { ScrollView, Text } from "react-native";
import { router } from "expo-router";
import AppButton from "@/components/ui/AppButton";
import { useSession } from "@/context/AuthProvider";
import { supabase } from "@/services/supabase";
export default function Profile() {
  const { session } = useSession();
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Officer Profile</Text>
      <Text>Account: {session?.user.email}</Text>
      <Text>Student demo: accounts are not verified traffic officers.</Text>
      <AppButton
        title="Sign Out"
        onPress={() =>
          void supabase.auth
            .signOut()
            .then(() => router.replace("/(auth)/login"))
        }
      />
    </ScrollView>
  );
}
