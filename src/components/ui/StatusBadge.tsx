import { Text } from "react-native";
export default function StatusBadge({ status }: { status: string }) {
  return (
    <Text style={{ fontWeight: "700", color: "#163C65" }}>
      {status.toUpperCase()}
    </Text>
  );
}
