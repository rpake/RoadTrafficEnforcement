import { View, Text } from "react-native";
import { useViolationStore } from "@/store/violationStore";
import { formatKina } from "@/utils/formatCurrency";
export default function Reports() {
  const items = useViolationStore((s) => s.violations);
  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Local Enforcement Demo Report
      </Text>
      <Text>Draft records: {items.length}</Text>
      <Text>
        Demonstration fine total:{" "}
        {formatKina(items.reduce((sum, v) => sum + v.totalPGK, 0))}
      </Text>
      <Text>These are not official government enforcement statistics.</Text>
    </View>
  );
}
