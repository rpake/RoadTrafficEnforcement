import { router } from "expo-router";
import ViolationForm from "@/components/violations/RemoteViolationForm";
import { createRemoteViolation } from "@/services/remoteViolations";
export default function Create() {
  return (
    <ViolationForm
      onSave={async (input) => {
        const result = await createRemoteViolation(input);
        router.replace({ pathname: "/remote/[id]", params: { id: result.id } });
      }}
    />
  );
}
