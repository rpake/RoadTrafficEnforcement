import { Text } from "react-native";
import AppCard from "@/components/ui/AppCard";
import type { Driver } from "@/types/driver";
export default function DriverCard({ item }: { item: Driver }) {
  return (
    <AppCard>
      <Text>
        {item.name} — {item.licenceNumber}
      </Text>
    </AppCard>
  );
}
