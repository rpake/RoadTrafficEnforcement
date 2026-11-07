import { ScrollView, Text } from "react-native";
import FineCard from "@/components/fines/FineCard";
import { FINE_SCHEDULE } from "@/constants/fineSchedule";
import { router } from "expo-router";
import AppButton from "@/components/ui/AppButton";
export default function Fines() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Demonstration Fine Schedule
      </Text>
      <Text>Amounts are examples, not PNG law.</Text>
      <AppButton
        title="Open Calculator"
        onPress={() => router.push("/fine/calculator")}
      />
      {FINE_SCHEDULE.map((f) => (
        <FineCard key={f.id} fine={f} />
      ))}
    </ScrollView>
  );
}
