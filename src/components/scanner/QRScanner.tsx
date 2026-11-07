import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text } from "react-native";
import { useState } from "react";
import AppButton from "@/components/ui/AppButton";
export default function QRScanner({
  onScan,
}: {
  onScan: (data: string) => void;
}) {
  const [permission, requestPermission] = useCameraPermissions();
  const [locked, setLocked] = useState(false);
  if (!permission) return <Text>Checking camera permission...</Text>;
  if (!permission.granted)
    return (
      <View>
        <Text>Camera access is required to scan QR or barcode documents.</Text>
        <AppButton
          title="Allow Camera"
          onPress={() => {
            void requestPermission();
          }}
        />
      </View>
    );
  return (
    <View style={{ gap: 10 }}>
      <CameraView
        style={{ height: 320, width: "100%" }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "code128", "pdf417", "ean13"],
        }}
        onBarcodeScanned={
          locked
            ? undefined
            : ({ data }) => {
                setLocked(true);
                onScan(data);
              }
        }
      />
      <AppButton title="Scan Again" onPress={() => setLocked(false)} />
    </View>
  );
}
