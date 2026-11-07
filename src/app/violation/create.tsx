import { useState } from "react";
import { Alert, ScrollView, Text, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";
import FineCalculator from "@/components/fines/FineCalculator";
import { useAuthStore } from "@/store/authStore";
import { useViolationStore } from "@/store/violationStore";
import { calculateFine } from "@/services/fineService";
import { captureEvidence } from "@/services/evidenceService";
import { getCurrentLocation } from "@/services/locationService";
import { makeTicketNumber } from "@/utils/ticketNumber";
import { normalizePlate, isValidPlate } from "@/utils/validation";
export default function CreateViolation() {
  const params = useLocalSearchParams<{ plate?: string; licence?: string }>();
  const [plate, setPlate] = useState(params.plate || "");
  const [licence, setLicence] = useState(params.licence || "");
  const [driverName, setDriverName] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [evidenceUri, setEvidenceUri] = useState<string | undefined>();
  const [coords, setCoords] = useState<
    { latitude: number; longitude: number } | undefined
  >();
  const [saving, setSaving] = useState(false);
  const officer = useAuthStore((s) => s.officer);
  const add = useViolationStore((s) => s.addViolation);
  async function photo() {
    try {
      setEvidenceUri(await captureEvidence());
    } catch (e) {
      Alert.alert("Camera", String(e));
    }
  }
  async function gps() {
    try {
      const c = await getCurrentLocation();
      setCoords(c);
      setLocation(`${c.latitude.toFixed(5)}, ${c.longitude.toFixed(5)}`);
    } catch (e) {
      Alert.alert("GPS", String(e));
    }
  }
  async function save() {
    if (!officer) return Alert.alert("Login required");
    if (!isValidPlate(plate) || !location.trim() || selected.length === 0)
      return Alert.alert(
        "Required",
        "Enter valid plate, location and select at least one offence.",
      );
    setSaving(true);
    try {
      const fine = calculateFine(selected);
      const id = makeTicketNumber();
      await add({
        id,
        plate: normalizePlate(plate),
        driverName: driverName.trim(),
        licenceNumber: licence.trim(),
        fineIds: fine.fineIds,
        totalPGK: fine.totalAmount,
        location: location.trim(),
        notes: notes.trim(),
        createdAt: new Date().toISOString(),
        officerId: officer.id,
        evidenceUri,
        latitude: coords?.latitude,
        longitude: coords?.longitude,
        status: "draft",
        paymentStatus: "unpaid",
      });
      router.replace({ pathname: "/ticket/[id]", params: { id } });
    } catch (e) {
      Alert.alert("Save failed", String(e));
    } finally {
      setSaving(false);
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{ padding: 16, paddingBottom: 50, gap: 8 }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Record Traffic Violation
      </Text>
      <Text>DEMO DRAFT ONLY — no official infringement is issued.</Text>
      <AppInput
        label="Vehicle plate *"
        value={plate}
        onChangeText={setPlate}
        autoCapitalize="characters"
      />
      <AppInput
        label="Driver name (optional)"
        value={driverName}
        onChangeText={setDriverName}
      />
      <AppInput
        label="Licence number (optional)"
        value={licence}
        onChangeText={setLicence}
      />
      <AppInput
        label="Offence location *"
        value={location}
        onChangeText={setLocation}
      />
      <AppButton title="Capture GPS Location" onPress={() => void gps()} />
      <AppInput
        label="Officer notes"
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Select offences *
      </Text>
      <FineCalculator selected={selected} onChange={setSelected} />
      <AppButton
        title="Take Evidence Photograph"
        onPress={() => void photo()}
      />
      {evidenceUri ? (
        <Image
          source={{ uri: evidenceUri }}
          style={{ height: 180, borderRadius: 10 }}
        />
      ) : null}
      <AppButton
        title={saving ? "Saving..." : "Save Local Draft & View Ticket"}
        disabled={saving}
        onPress={() => void save()}
      />
    </ScrollView>
  );
}
