import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import type { Violation } from "@/types/violation";
import { FINE_SCHEDULE } from "@/constants/fineSchedule";
const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] || c,
  );
export async function shareDemoTicket(v: Violation) {
  const lines = v.fineIds
    .map((id) => {
      const f = FINE_SCHEDULE.find((x) => x.id === id);
      return `<li>${esc(f?.violationType || id)} — K${f?.amountPGK.toFixed(2) || "0.00"}</li>`;
    })
    .join("");
  const html = `<html><body style="font-family:Arial;padding:32px"><h1>DEMONSTRATION NOTICE</h1><h2>NOT VALID FOR PAYMENT OR ENFORCEMENT</h2><p>Reference: ${esc(v.id)}</p><p>Plate: ${esc(v.plate)}</p><p>Driver: ${esc(v.driverName)}</p><p>Licence: ${esc(v.licenceNumber)}</p><p>Location: ${esc(v.location)}</p><p>Date: ${esc(v.createdAt)}</p><ul>${lines}</ul><h2>Total demo amount: K${v.totalPGK.toFixed(2)}</h2><p>Official government validation and payment integration are NOT connected.</p></body></html>`;
  const result = await Print.printToFileAsync({ html });
  if (await Sharing.isAvailableAsync())
    await Sharing.shareAsync(result.uri, { mimeType: "application/pdf" });
  return result.uri;
}
