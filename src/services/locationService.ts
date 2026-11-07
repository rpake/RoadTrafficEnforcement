import * as Location from "expo-location";
export async function getCurrentLocation() {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (permission.status !== "granted")
    throw new Error("Location permission denied");
  const result = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  return {
    latitude: result.coords.latitude,
    longitude: result.coords.longitude,
  };
}
