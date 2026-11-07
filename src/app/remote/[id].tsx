import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
} from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import AppButton from "@/components/ui/AppButton";
import {
  deleteRemoteViolation,
  getRemoteViolation,
  type RemoteViolation,
} from "@/services/remoteViolations";
import { captureEvidence } from "@/services/evidenceService";
import { uploadEvidence, evidenceSignedUrl } from "@/services/evidenceUpload";
import { supabase } from "@/services/supabase";
export default function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<RemoteViolation | null>(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    if (!id) return;
    try {
      setError("");
      const v = await getRemoteViolation(id);
      setItem(v);
      if (v.evidence_path) setImage(await evidenceSignedUrl(v.evidence_path));
    } catch (e) {
      setError(String(e));
    }
  }, [id]);
  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );
  async function photo() {
    if (!item) return;
    setBusy(true);
    try {
      const uri = await captureEvidence();
      if (!uri) return;
      const path = await uploadEvidence(item.id, uri);
      const { error } = await supabase
        .from("violations")
        .update({ evidence_path: path })
        .eq("id", item.id);
      if (error) throw error;
      await load();
    } catch (e) {
      setError(String(e));
    } finally {
      setBusy(false);
    }
  }
  function remove() {
    if (!item) return;
    Alert.alert("Delete record?", "This permanently deletes this violation.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          void deleteRemoteViolation(item.id)
            .then(() => router.replace("/(tabs)/violations"))
            .catch((e) => setError(String(e))),
      },
    ]);
  }
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
      {error ? <Text style={{ color: "#B42318" }}>{error}</Text> : null}
      {!item ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>{item.plate}</Text>
          <Text>Driver: {item.driver_name || "Not provided"}</Text>
          <Text>Licence: {item.licence_number || "Not provided"}</Text>
          <Text>Location: {item.location}</Text>
          <Text>Notes: {item.notes}</Text>
          <Text>Offence codes: {item.fine_ids.join(", ")}</Text>
          <Text>DEMO fine: K{item.total_pgk.toFixed(2)}</Text>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ height: 220, borderRadius: 12 }}
            />
          ) : (
            <Text>No evidence uploaded.</Text>
          )}
          {busy ? (
            <ActivityIndicator />
          ) : (
            <AppButton
              title="Capture and Upload Evidence"
              onPress={() => void photo()}
            />
          )}
          <AppButton
            title="Edit Record"
            onPress={() =>
              router.push({
                pathname: "/remote/edit/[id]",
                params: { id: item.id },
              })
            }
          />
          <AppButton title="Delete Record" onPress={remove} />
        </>
      )}
    </ScrollView>
  );
}
