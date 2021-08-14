import falcor from "./falcor";

export async function getAvailGraphNumRequestsPerMinute() {
  const d = await falcor.get([
    "performanceMonitoring",
    "availGraphNumRequestsPerMinute",
  ]);

  return d.json.performanceMonitoring.availGraphNumRequestsPerMinute;
}
