
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

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
    <MapView
      style={styles.map}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.12,
        longitudeDelta: 0.12,
      }}
    >
      {position && (
        <Marker
          coordinate={position}
          title="Your position"
          pinColor="blue"
        />
      )}

      {points.map((point) => (
        <Marker
          key={point.id}
          coordinate={{
            latitude: point.latitude,
            longitude: point.longitude,
          }}
          title={point.title}
          description={point.description}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
    minHeight: 400,
  },
});
