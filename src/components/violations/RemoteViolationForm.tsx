import { useState } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";
import FineCalculator from "@/components/fines/FineCalculator";
import { calculateFine } from "@/services/fineService";
import { getCurrentLocation } from "@/services/locationService";
import { isValidPlate, normalizePlate } from "@/utils/validation";
import type { ViolationInput } from "@/services/remoteViolations";
export default function ViolationForm({
  initial,
  onSave,
}: {
  initial?: ViolationInput;
  onSave: (v: ViolationInput) => Promise<void>;
}) {
  const [plate, setPlate] = useState(initial?.plate || "");
  const [driver, setDriver] = useState(initial?.driver_name || "");
  const [licence, setLicence] = useState(initial?.licence_number || "");
  const [location, setLocation] = useState(initial?.location || "");
  const [notes, setNotes] = useState(initial?.notes || "");
  const [selected, setSelected] = useState<string[]>(initial?.fine_ids || []);
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(
    initial?.latitude != null && initial.longitude != null
      ? { latitude: initial.latitude, longitude: initial.longitude }
      : null,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function gps() {
    setError("");
    try {
      const c = await getCurrentLocation();
      setCoords(c);
      setLocation(`${c.latitude.toFixed(5)}, ${c.longitude.toFixed(5)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Location unavailable");
    }
  }
  async function submit() {
    setError("");
    if (!isValidPlate(plate)) {
      setError("Enter a valid vehicle plate (3–12 characters).");
      return;
    }
    if (!location.trim()) {
      setError("Enter an offence location.");
      return;
    }
    if (!selected.length) {
      setError("Select at least one offence.");
      return;
    }
    setBusy(true);
    try {
      await onSave({
        plate: normalizePlate(plate),
        driver_name: driver.trim(),
        licence_number: licence.trim(),
        location: location.trim(),
        notes: notes.trim(),
        fine_ids: selected,
        total_pgk: calculateFine(selected).totalAmount,
        latitude: coords?.latitude ?? null,
        longitude: coords?.longitude ?? null,
      });
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Unable to save. Check your network.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 60 }}
    >
      <Text>Sample fine schedule — no official charge is issued.</Text>
      <AppInput label="Vehicle plate *" value={plate} onChangeText={setPlate} />
      <AppInput label="Driver name" value={driver} onChangeText={setDriver} />
      <AppInput
        label="Licence number"
        value={licence}
        onChangeText={setLicence}
      />
      <AppInput
        label="Location *"
        value={location}
        onChangeText={setLocation}
      />
      <AppButton title="Use Current GPS" onPress={() => void gps()} />
      <AppInput label="Notes" value={notes} onChangeText={setNotes} multiline />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Select offences *
      </Text>
      <FineCalculator selected={selected} onChange={setSelected} />
      <Text>
        Total demo fine: K{calculateFine(selected).totalAmount.toFixed(2)}
      </Text>
      {error ? <Text style={{ color: "#B42318" }}>{error}</Text> : null}
      {busy ? (
        <ActivityIndicator />
      ) : (
        <AppButton
          title={initial ? "Save Changes" : "Save to Remote Database"}
          onPress={() => void submit()}
        />
      )}
    </ScrollView>
  );
}
