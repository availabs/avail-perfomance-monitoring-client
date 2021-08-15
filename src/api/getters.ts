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

export type RoutePerformanceSummary = {
  numRequests: number;
  avgResponseTimeMs: number;
  excessiveDelaySec: number;
};

export type AvailGraphRoutesPerformanceSummary = Record<
  AvailGraphRoute,
  RoutePerformanceSummary
>;

export async function getAvailGraphNumRequestsPerMinute(): Promise<AvailGraphNumRequestsPerMinute> {
  const resp = await falcor.get([
    "performanceMonitoring",
    "availGraphNumRequestsPerMinute",
  ]);

  return resp.json.performanceMonitoring.availGraphNumRequestsPerMinute;
}

export async function getAvailGraphAvgResponseTimeByMinute(): Promise<AvailGraphAvgResponseTimeByMinute> {
  const resp = await falcor.get([
    "performanceMonitoring",
    "availGraphAvgResponseTimeByMinute",
  ]);

  return resp.json.performanceMonitoring.availGraphAvgResponseTimeByMinute;
}

export async function getAvailGraphRoutesPerformanceSummary(): Promise<AvailGraphRoutesPerformanceSummary> {
  const resp = await falcor.get([
    "performanceMonitoring",
    "availGraphRoutesPerformanceSummary",
  ]);

  console.log(resp);

  return resp.json.performanceMonitoring.availGraphRoutesPerformanceSummary;
}

export async function getAvailGraphNumRequestsPerRoute(): Promise<AvailGraphNumRequestsPerRoute> {
  const d = await getAvailGraphRoutesPerformanceSummary();

  return Object.keys(d).reduce((acc: AvailGraphNumRequestsPerRoute, route) => {
    acc[route] = d[route].numRequests;
    return acc;
  }, {});
}

export async function getAvailGraphAvgResponseTimeByRoute(): Promise<AvailGraphAvgResponseTimeByRoute> {
  const d = await getAvailGraphRoutesPerformanceSummary();

  return Object.keys(d).reduce(
    (acc: AvailGraphAvgResponseTimeByRoute, route) => {
      acc[route] = d[route].avgResponseTimeMs;
      return acc;
    },
    {}
  );
}

export async function getAvailGraphExcessiveDelaySecByRoute(): Promise<AvailGraphExcessiveDelaySecByRoute> {
  const d = await getAvailGraphRoutesPerformanceSummary();

  return Object.keys(d).reduce(
    (acc: AvailGraphExcessiveDelaySecByRoute, route) => {
      acc[route] = d[route].excessiveDelaySec;
      return acc;
    },
    {}
  );
}
