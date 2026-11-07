import { useLocalSearchParams, router } from "expo-router";
import { View, Text } from "react-native";
import AppButton from "@/components/ui/AppButton";
export default function DriverDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 20 }}>Scanned / entered licence: {id}</Text>
      <Text>UNVERIFIED. No live licensing database connected.</Text>
      <AppButton
        title="Record Violation"
        onPress={() =>
          router.push({
            pathname: "/violation/create",
            params: { licence: id || "" },
          })
        }
      />
    </View>
  );
}
