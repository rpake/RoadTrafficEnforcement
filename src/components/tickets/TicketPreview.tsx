import { Text, View } from "react-native";
import type { Violation } from "@/types/violation";
import { FINE_SCHEDULE } from "@/constants/fineSchedule";
import { formatKina } from "@/utils/formatCurrency";
export default function TicketPreview({ item }: { item: Violation }) {
  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        DEMONSTRATION NOTICE — NOT VALID FOR PAYMENT
      </Text>
      <Text>Reference: {item.id}</Text>
      <Text>Plate: {item.plate}</Text>
      <Text>Driver: {item.driverName || "Not recorded"}</Text>
      <Text>Licence: {item.licenceNumber || "Not recorded"}</Text>
      <Text>Location: {item.location}</Text>
      <Text>Date: {item.createdAt}</Text>
      {item.fineIds.map((id) => (
        <Text key={id}>
          {FINE_SCHEDULE.find((f) => f.id === id)?.violationType}
        </Text>
      ))}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Total: {formatKina(item.totalPGK)}
      </Text>
      <Text>Payment: {item.paymentStatus}</Text>
    </View>
  );
}
