import { View, Text } from "react-native";
import { router } from "expo-router";
import QRScanner from "@/components/scanner/QRScanner";
export default function ScanDriver() {
  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Text>
        Scan QR / barcode. Results are unverified and require officer
        confirmation.
      </Text>
      <QRScanner
        onScan={(data) =>
          router.replace({ pathname: "/driver/[id]", params: { id: data } })
        }
      />
    </View>
  );
}
