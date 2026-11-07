import * as ImagePicker from "expo-image-picker";
export async function captureEvidence() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) throw new Error("Camera permission denied");
  const result = await ImagePicker.launchCameraAsync({
    quality: 0.6,
    allowsEditing: false,
  });
  return result.canceled ? undefined : result.assets[0]?.uri;
}
