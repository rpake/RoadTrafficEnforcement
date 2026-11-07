import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { FINE_SCHEDULE } from "@/constants/fineSchedule";
import { formatKina } from "@/utils/formatCurrency";
export default function FineDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const f = FINE_SCHEDULE.find((x) => x.id === id);
  return (
    <View style={{ padding: 20 }}>
      <Text>
        {f
          ? `${f.violationType}: ${formatKina(f.amountPGK)} — DEMO ONLY`
          : "Fine not found"}
      </Text>
    </View>
  );
}
