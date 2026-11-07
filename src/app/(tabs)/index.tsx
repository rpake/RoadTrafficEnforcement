import { ScrollView, Text } from "react-native";
import { router } from "expo-router";
import AppButton from "@/components/ui/AppButton";
import { useSession } from "@/context/AuthProvider";
export default function Dashboard() {
  const { session } = useSession();
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Road Traffic Dashboard
      </Text>
      <Text>Signed in: {session?.user.email}</Text>
      <Text>STUDENT DEMONSTRATION — sample fines, not official charges</Text>
      <AppButton
        title="Remote Violation Records (CRUD)"
        onPress={() => router.push("/(tabs)/violations")}
      />
      <AppButton
        title="Record New Violation"
        onPress={() => router.push("/remote/create")}
      />
      <AppButton
        title="Scan Driver Licence"
        onPress={() => router.push("/driver/scan")}
      />
      <AppButton
        title="Scan Vehicle"
        onPress={() => router.push("/vehicle/scan")}
      />
      <AppButton
        title="Offence Locations Map"
        onPress={() => router.push("/map")}
      />
      <AppButton title="Fine Schedule" onPress={() => router.push("/fine")} />
      <AppButton title="Reports" onPress={() => router.push("/reports")} />
    </ScrollView>
  );
}
