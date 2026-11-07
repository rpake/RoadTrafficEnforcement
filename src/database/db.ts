import { Platform } from "react-native";
import type { Violation } from "@/types/violation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
const KEY = "rte-demo-violations";
let dbPromise: ReturnType<typeof SQLite.openDatabaseAsync> | null = null;
async function db() {
  if (!dbPromise)
    dbPromise = (async () => {
      const conn = await SQLite.openDatabaseAsync("rte-demo.db");
      await conn.execAsync(
        "CREATE TABLE IF NOT EXISTS violations (id TEXT PRIMARY KEY NOT NULL, payload TEXT NOT NULL);",
      );
      return conn;
    })();
  return dbPromise;
}
export async function listViolations(): Promise<Violation[]> {
  if (Platform.OS === "web")
    return JSON.parse((await AsyncStorage.getItem(KEY)) || "[]");
  const rows = await (
    await db()
  ).getAllAsync<{ payload: string }>(
    "SELECT payload FROM violations ORDER BY rowid DESC",
  );
  return rows.map((r) => JSON.parse(r.payload) as Violation);
}
export async function saveViolation(v: Violation) {
  if (Platform.OS === "web") {
    const previous = await listViolations();
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify([v, ...previous.filter((x) => x.id !== v.id)]),
    );
    return;
  }
  await (
    await db()
  ).runAsync(
    "INSERT OR REPLACE INTO violations (id,payload) VALUES (?,?)",
    v.id,
    JSON.stringify(v),
  );
}
