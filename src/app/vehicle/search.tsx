import { useState } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";
import { normalizePlate, isValidPlate } from "@/utils/validation";
export default function VehicleSearch() {
  const [plate, setPlate] = useState("");
  return (
    <View style={{ padding: 20 }}>
      <Text>Manual registration lookup (unverified demo).</Text>
      <AppInput
        label="Registration plate"
        autoCapitalize="characters"
        value={plate}
        onChangeText={setPlate}
      />
      <AppButton
        title="View Vehicle"
        disabled={!isValidPlate(plate)}
        onPress={() =>
          router.push({
            pathname: "/vehicle/[plate]",
            params: { plate: normalizePlate(plate) },
          })
        }
      />
    </View>
  );
}
