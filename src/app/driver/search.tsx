import { useState } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";
export default function DriverSearch() {
  const [id, setId] = useState("");
  return (
    <View style={{ padding: 20 }}>
      <Text>Authorized driver registry not connected.</Text>
      <AppInput label="Licence number" value={id} onChangeText={setId} />
      <AppButton
        title="View Unverified Licence"
        disabled={!id.trim()}
        onPress={() =>
          router.push({ pathname: "/driver/[id]", params: { id: id.trim() } })
        }
      />
    </View>
  );
}
