import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import AppButton from "@/components/ui/AppButton";
import {
  listRemoteViolations,
  type RemoteViolation,
} from "@/services/remoteViolations";
export default function Violations() {
  const [items, setItems] = useState<RemoteViolation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setItems(await listRemoteViolations());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load records");
    } finally {
      setLoading(false);
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );
  return (
    <View style={{ flex: 1, padding: 16, gap: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Remote Violation Records
      </Text>
      <AppButton
        title="Create Record"
        onPress={() => router.push("/remote/create")}
      />
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <View>
          <Text style={{ color: "#B42318" }}>{error}</Text>
          <AppButton title="Retry" onPress={() => void load()} />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(x) => x.id}
          ListEmptyComponent={
            <Text>No records yet. Create your first violation.</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/remote/[id]",
                  params: { id: item.id },
                })
              }
              style={{
                padding: 14,
                backgroundColor: "white",
                marginVertical: 5,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {item.plate} — K{item.total_pgk.toFixed(2)}
              </Text>
              <Text>{item.location}</Text>
              <Text>{new Date(item.created_at).toLocaleDateString()}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
