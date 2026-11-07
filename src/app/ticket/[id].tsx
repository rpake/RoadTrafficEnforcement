import { Alert, ScrollView, Text, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useViolationStore } from "@/store/violationStore";
import TicketPreview from "@/components/tickets/TicketPreview";
import AppButton from "@/components/ui/AppButton";
import { shareDemoTicket } from "@/services/ticketService";
export default function Ticket() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = useViolationStore((s) => s.violations.find((v) => v.id === id));
  if (!item) return <Text>Ticket not found. Return to Violations.</Text>;
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
      <TicketPreview item={item} />
      {item.evidenceUri ? (
        <Image source={{ uri: item.evidenceUri }} style={{ height: 200 }} />
      ) : null}
      <AppButton
        title="Generate / Share Demo PDF"
        onPress={() =>
          void shareDemoTicket(item).catch((e) => Alert.alert("PDF", String(e)))
        }
      />
    </ScrollView>
  );
}
