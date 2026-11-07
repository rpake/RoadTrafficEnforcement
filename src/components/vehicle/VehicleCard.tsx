import { Text } from "react-native";
import AppCard from "@/components/ui/AppCard";
import type { Vehicle } from "@/types/vehicle";
export default function VehicleCard({ item }: { item: Vehicle }) {
  return (
    <AppCard>
      <Text>
        {item.plate} — {item.make} {item.model}
      </Text>
    </AppCard>
  );
}
