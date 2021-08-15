import falcor from "./falcor";

export type Timestamp = string;
export type AvailGraphRoute = string;

export type AvailGraphNumRequestsPerMinute = Record<Timestamp, number>;
export type AvailGraphAvgResponseTimeByMinute = Record<Timestamp, number>;
export type AvailGraphNumRequestsPerRoute = Record<AvailGraphRoute, number>;
export type AvailGraphAvgResponseTimeByRoute = Record<AvailGraphRoute, number>;
export type AvailGraphExcessiveDelaySecByRoute = Record<
  AvailGraphRoute,
  number
>;

export async function getAvailGraphNumRequestsPerMinute(): Promise<AvailGraphNumRequestsPerMinute> {
  const d = await falcor.get([
    "performanceMonitoring",
    "availGraphNumRequestsPerMinute",
  ]);

  return d.json.performanceMonitoring.availGraphNumRequestsPerMinute;
}

export async function getAvailGraphAvgResponseTimeByMinute(): Promise<AvailGraphAvgResponseTimeByMinute> {
  const d = await falcor.get([
    "performanceMonitoring",
    "availGraphAvgResponseTimeByMinute",
  ]);

  return d.json.performanceMonitoring.availGraphAvgResponseTimeByMinute;
}

export async function getAvailGraphNumRequestsPerRoute(): Promise<AvailGraphNumRequestsPerRoute> {
  const d = await falcor.get([
    "performanceMonitoring",
    "availGraphNumRequestsPerRoute",
  ]);

  return d.json.performanceMonitoring.availGraphNumRequestsPerRoute;
}

export async function getAvailGraphAvgResponseTimeByRoute(): Promise<AvailGraphAvgResponseTimeByRoute> {
  const d = await falcor.get([
    "performanceMonitoring",
    "availGraphAvgResponseTimeByRoute",
  ]);

  return d.json.performanceMonitoring.availGraphAvgResponseTimeByRoute;
}

export async function getAvailGraphExcessiveDelaySecByRoute(): Promise<AvailGraphExcessiveDelaySecByRoute> {
  const d = await falcor.get([
    "performanceMonitoring",
    "availGraphExcessiveDelaySecByRoute",
  ]);

  return d.json.performanceMonitoring.availGraphExcessiveDelaySecByRoute;
}
