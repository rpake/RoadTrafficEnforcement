import { View, StyleSheet } from "react-native";
import type { PropsWithChildren } from "react";
import { colors } from "@/constants/colors";
export default function AppCard({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}
const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 6,
    gap: 5,
  },
});
