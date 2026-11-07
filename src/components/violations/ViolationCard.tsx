import { Text } from "react-native";
import { router } from "expo-router";
import AppCard from "@/components/ui/AppCard";
import AppButton from "@/components/ui/AppButton";
import type { Violation } from "@/types/violation";
import { formatKina } from "@/utils/formatCurrency";
export default function ViolationCard({ item }: { item: Violation }) {
  return (
    <AppCard>
      <Text style={{ fontWeight: "700" }}>
        {item.plate} — {formatKina(item.totalPGK)}
      </Text>
      <Text>
        {item.driverName || "Driver not recorded"} ·{" "}
        {item.createdAt.slice(0, 10)}
      </Text>
      <Text>
        Status: {item.status} / {item.paymentStatus}
      </Text>
      <AppButton
        title="View Ticket"
        onPress={() =>
          router.push({ pathname: "/ticket/[id]", params: { id: item.id } })
        }
      />
    </AppCard>
  );
}
