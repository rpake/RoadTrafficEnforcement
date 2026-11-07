import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import ViolationForm from "@/components/violations/RemoteViolationForm";
import {
  getRemoteViolation,
  updateRemoteViolation,
  type RemoteViolation,
} from "@/services/remoteViolations";
export default function Edit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<RemoteViolation | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (id)
      getRemoteViolation(id)
        .then(setItem)
        .catch((e) => setError(String(e)));
  }, [id]);
  if (error) return <Text>{error}</Text>;
  if (!item) return <ActivityIndicator />;
  return (
    <ViolationForm
      initial={{
        plate: item.plate,
        driver_name: item.driver_name,
        licence_number: item.licence_number,
        location: item.location,
        notes: item.notes,
        fine_ids: item.fine_ids,
        total_pgk: item.total_pgk,
        latitude: item.latitude,
        longitude: item.longitude,
      }}
      onSave={async (input) => {
        await updateRemoteViolation(item.id, input);
        router.replace({ pathname: "/remote/[id]", params: { id: item.id } });
      }}
    />
  );
}
