import { useLocalSearchParams, router } from "expo-router";
import { View, Text } from "react-native";
import { useViolationStore } from "@/store/violationStore";
import AppButton from "@/components/ui/AppButton";
export default function ViolationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = useViolationStore((s) => s.violations.find((v) => v.id === id));
  return (
    <View style={{ padding: 20, gap: 12 }}>
      {item ? (
        <>
          <Text>
            {item.plate} — {item.location}
          </Text>
          <Text>{item.notes}</Text>
          <AppButton
            title="View Ticket"
            onPress={() =>
              router.push({ pathname: "/ticket/[id]", params: { id } })
            }
          />
        </>
      ) : (
        <Text>Record not found</Text>
      )}
    </View>
  );
}
