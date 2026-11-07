
import { StyleSheet, Text, View } from "react-native";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapPoint extends Coordinates {
  id: string;
  title: string;
  description?: string;
}

interface Props {
  latitude: number;
  longitude: number;
  position: Coordinates | null;
  points: MapPoint[];
}

export default function NativeMap({
  latitude,
  longitude,
  position,
  points,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Traffic Violation Locations
      </Text>

      <Text style={styles.subtitle}>
        Map preview is available on Android and iOS.
      </Text>

      <Text>
        Center: {latitude.toFixed(5)},{" "}
        {longitude.toFixed(5)}
      </Text>

      {position && (
        <Text>
          Your position: {position.latitude.toFixed(5)},{" "}
          {position.longitude.toFixed(5)}
        </Text>
      )}

      <Text style={styles.heading}>
        Recorded Locations ({points.length})
      </Text>

      {points.map((point) => (
        <View key={point.id} style={styles.item}>
          <Text style={styles.name}>{point.title}</Text>
          <Text>{point.description ?? "No description"}</Text>
          <Text>
            {point.latitude.toFixed(5)},{" "}
            {point.longitude.toFixed(5)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 12,
    color: "#666666",
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  name: {
    fontWeight: "bold",
  },
});
