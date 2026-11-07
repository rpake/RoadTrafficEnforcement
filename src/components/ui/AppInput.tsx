import { Text, TextInput, View, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import type { TextInputProps } from "react-native";
export default function AppInput({
  label,
  ...props
}: TextInputProps & { label: string }) {
  return (
    <View style={{ marginVertical: 6 }}>
      <Text style={{ fontWeight: "600", marginBottom: 5, color: colors.text }}>
        {label}
      </Text>
      <TextInput
        {...props}
        placeholderTextColor={colors.muted}
        style={[styles.input, props.style]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    color: colors.text,
  },
});
