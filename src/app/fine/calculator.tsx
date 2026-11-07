import { useState } from "react";
import { ScrollView, Text } from "react-native";
import FineCalculator from "@/components/fines/FineCalculator";
export default function Calculator() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text>Illustrative fine amounts only.</Text>
      <FineCalculator selected={selected} onChange={setSelected} />
    </ScrollView>
  );
}
