import { supabase } from "./supabase";
export interface RemoteViolation {
  id: string;
  user_id: string;
  plate: string;
  driver_name: string;
  licence_number: string;
  location: string;
  notes: string;
  fine_ids: string[];
  total_pgk: number;
  latitude: number | null;
  longitude: number | null;
  evidence_path: string | null;
  created_at: string;
  updated_at: string;
}
export type ViolationInput = Pick<
  RemoteViolation,
  | "plate"
  | "driver_name"
  | "licence_number"
  | "location"
  | "notes"
  | "fine_ids"
  | "total_pgk"
  | "latitude"
  | "longitude"
>;
export async function listRemoteViolations(): Promise<RemoteViolation[]> {
  const { data, error } = await supabase
    .from("violations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as RemoteViolation[];
}
export async function getRemoteViolation(id: string): Promise<RemoteViolation> {
  const { data, error } = await supabase
    .from("violations")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as RemoteViolation;
}
export async function createRemoteViolation(
  input: ViolationInput,
): Promise<RemoteViolation> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Please sign in again");
  const { data, error } = await supabase
    .from("violations")
    .insert({ ...input, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data as RemoteViolation;
}
export async function updateRemoteViolation(
  id: string,
  input: Partial<ViolationInput>,
): Promise<RemoteViolation> {
  const { data, error } = await supabase
    .from("violations")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as RemoteViolation;
}
export async function deleteRemoteViolation(id: string): Promise<void> {
  const { error } = await supabase.from("violations").delete().eq("id", id);
  if (error) throw error;
}
