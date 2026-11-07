import { Pressable, Text, View } from "react-native";
import { FINE_SCHEDULE } from "@/constants/fineSchedule";
import { calculateFine } from "@/services/fineService";
import { formatKina } from "@/utils/formatCurrency";
export default function FineCalculator({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  return (
    <View>
      {FINE_SCHEDULE.map((f) => {
        const checked = selected.includes(f.id);
        return (
          <Pressable
            key={f.id}
            accessibilityRole="checkbox"
            accessibilityState={{ checked }}
            onPress={() =>
              onChange(
                checked
                  ? selected.filter((id) => id !== f.id)
                  : [...selected, f.id],
              )
            }
            style={{
              padding: 12,
              backgroundColor: checked ? "#DCECF7" : "white",
              borderRadius: 8,
              marginVertical: 3,
            }}
          >
            <Text>
              {checked ? "☑" : "☐"} {f.violationType} —{" "}
              {formatKina(f.amountPGK)}
            </Text>
          </Pressable>
        );
      })}
      <Text style={{ fontSize: 22, fontWeight: "bold", marginVertical: 12 }}>
        Total: {formatKina(calculateFine(selected).totalAmount)}
      </Text>
    </View>
  );
}
