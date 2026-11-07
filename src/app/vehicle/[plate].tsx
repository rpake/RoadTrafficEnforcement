import { useLocalSearchParams, router } from "expo-router";
import { View, Text } from "react-native";
import AppButton from "@/components/ui/AppButton";
export default function VehicleDetails() {
  const { plate } = useLocalSearchParams<{ plate: string }>();
  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 22 }}>Vehicle: {plate}</Text>
      <Text>
        Vehicle registry unavailable. Registration status cannot be confirmed.
      </Text>
      <AppButton
        title="Record Violation"
        onPress={() =>
          router.push({
            pathname: "/violation/create",
            params: { plate: plate || "" },
          })
        }
      />
    </View>
  );
}
