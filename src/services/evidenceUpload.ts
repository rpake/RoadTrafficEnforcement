import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";
import { supabase } from "./supabase";
export async function uploadEvidence(
  violationId: string,
  uri: string,
): Promise<string> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Login required");
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const path = `${user.id}/${violationId}/${Date.now()}.jpg`;
  const { error } = await supabase.storage
    .from("evidence")
    .upload(path, decode(base64), { contentType: "image/jpeg", upsert: false });
  if (error) throw error;
  return path;
}
export async function evidenceSignedUrl(path: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from("evidence")
    .createSignedUrl(path, 60 * 10);
  if (error) throw error;
  return data.signedUrl;
}
