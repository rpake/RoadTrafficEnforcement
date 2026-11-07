import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
export default function AppButton({
  title,
  onPress,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled && { opacity: 0.5 }]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  text: { color: "white", fontWeight: "700", fontSize: 15 },
});
