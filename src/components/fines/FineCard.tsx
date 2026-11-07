import { Text } from "react-native";
import AppCard from "@/components/ui/AppCard";
import type { FineScheduleItem } from "@/constants/fineSchedule";
import { formatKina } from "@/utils/formatCurrency";
export default function FineCard({ fine }: { fine: FineScheduleItem }) {
  return (
    <AppCard>
      <Text style={{ fontWeight: "700" }}>
        {fine.violationType} — {formatKina(fine.amountPGK)}
      </Text>
      <Text>{fine.description}</Text>
      <Text>{fine.code}</Text>
    </AppCard>
  );
}
