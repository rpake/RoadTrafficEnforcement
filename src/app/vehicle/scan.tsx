import { View, Text } from "react-native";
import { router } from "expo-router";
import QRScanner from "@/components/scanner/QRScanner";
export default function ScanVehicle() {
  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Text>
        Scan an encoded registration QR / barcode. This is not optical number
        plate recognition.
      </Text>
      <QRScanner
        onScan={(data) =>
          router.replace({
            pathname: "/vehicle/[plate]",
            params: { plate: data },
          })
        }
      />
    </View>
  );
}
