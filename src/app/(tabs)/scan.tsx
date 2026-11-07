import { ScrollView, Text } from "react-native";
import { router } from "expo-router";
import AppButton from "@/components/ui/AppButton";
export default function ScanTab() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Scan or Search</Text>
      <AppButton
        title="Scan Driver Licence QR / Barcode"
        onPress={() => router.push("/driver/scan")}
      />
      <AppButton
        title="Scan Vehicle QR / Barcode"
        onPress={() => router.push("/vehicle/scan")}
      />
      <AppButton
        title="Manual Driver Search"
        onPress={() => router.push("/driver/search")}
      />
      <AppButton
        title="Manual Plate Search"
        onPress={() => router.push("/vehicle/search")}
      />
      <Text>
        Scanned codes are not verified government records. Plate OCR is not
        configured.
      </Text>
    </ScrollView>
  );
}
