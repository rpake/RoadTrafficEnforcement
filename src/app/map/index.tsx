
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "expo-router";

import NativeMap from "@/components/maps/NativeMap";

import {
  listRemoteViolations,
  type RemoteViolation,
} from "@/services/remoteViolations";

import { getCurrentLocation } from "@/services/locationService";
import AppButton from "@/components/ui/AppButton";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapPoint extends Coordinates {
  id: string;
  title: string;
  description?: string;
}

const DEFAULT_LATITUDE = -9.4438;
const DEFAULT_LONGITUDE = 147.1803;

export default function MapScreen() {
  const [items, setItems] = useState<RemoteViolation[]>([]);
  const [position, setPosition] = useState<Coordinates | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load traffic violations and current GPS location
  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [records, location] = await Promise.all([
        listRemoteViolations(),
        getCurrentLocation().catch(() => null),
      ]);

      // Keep only violations with valid GPS coordinates
      const validRecords = records.filter(
        (record) =>
          record.latitude !== null &&
          record.longitude !== null &&
          Number.isFinite(record.latitude) &&
          Number.isFinite(record.longitude)
      );

      setItems(validRecords);

      if (location) {
        setPosition({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      } else {
        setPosition(null);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load traffic violation locations."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Reload whenever the map screen becomes active
  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  // Convert Supabase violation records to map markers
  const points: MapPoint[] = items
    .filter(
      (record) =>
        record.latitude !== null &&
        record.longitude !== null
    )
    .map((record) => ({
      id: record.id,
      latitude: record.latitude!,
      longitude: record.longitude!,
      title: `Vehicle: ${record.plate}`,
      description: record.location,
    }));

  // Use officer GPS position or default Port Moresby location
  const latitude = position?.latitude ?? DEFAULT_LATITUDE;
  const longitude = position?.longitude ?? DEFAULT_LONGITUDE;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Traffic Enforcement Map
        </Text>

        <Text style={styles.subtitle}>
          View recorded traffic violations and GPS locations
        </Text>
      </View>

      {/* Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {items.length}
          </Text>
          <Text style={styles.statLabel}>
            Mapped Violations
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {position ? "Active" : "Unavailable"}
          </Text>
          <Text style={styles.statLabel}>
            Officer GPS
          </Text>
        </View>
      </View>

      {/* Loading */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#163C65" />
          <Text style={styles.loadingText}>
            Loading violation locations...
          </Text>
        </View>
      ) : (
        <>
          {/* Error message */}
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {error}
              </Text>
            </View>
          ) : null}

          {/* Map */}
          <View style={styles.mapContainer}>
            <NativeMap
              latitude={latitude}
              longitude={longitude}
              position={position}
              points={points}
            />
          </View>

          {/* Footer */}
          <ScrollView
            style={styles.footer}
            contentContainerStyle={styles.footerContent}
          >
            <Text style={styles.sectionTitle}>
              Location Information
            </Text>

            <Text style={styles.infoText}>
              Latitude: {latitude.toFixed(6)}
            </Text>

            <Text style={styles.infoText}>
              Longitude: {longitude.toFixed(6)}
            </Text>

            <Text style={styles.infoText}>
              Total Markers: {points.length}
            </Text>

            <AppButton
              title="Refresh Locations"
              onPress={() => void load()}
            />
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },

  header: {
    backgroundColor: "#163C65",
    padding: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  subtitle: {
    fontSize: 13,
    color: "#DCE6F1",
    marginTop: 5,
  },

  statsContainer: {
    flexDirection: "row",
    padding: 12,
    gap: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#163C65",
  },

  statLabel: {
    fontSize: 12,
    color: "#666666",
    marginTop: 5,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#666666",
  },

  errorContainer: {
    backgroundColor: "#FDECEA",
    marginHorizontal: 12,
    padding: 12,
    borderRadius: 8,
  },

  errorText: {
    color: "#B71C1C",
  },

  mapContainer: {
    flex: 1,
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    minHeight: 200,
  },

  footer: {
    maxHeight: 180,
    paddingHorizontal: 12,
    marginTop: 10,
  },

  footerContent: {
    paddingBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#163C65",
  },

  infoText: {
    fontSize: 13,
    color: "#444444",
    marginBottom: 5,
  },
});
