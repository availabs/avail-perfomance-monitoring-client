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

export enum ApiRequestTimeFrame {
  PAST_DAY = "Past Day",
  PAST_WEEK = "Past Week",
  PAST_MONTH = "Past Month",
  PAST_YEAR = "Past Year",
  ALL_TIME = "All Time",
}

export function getApiRequestTimeFrame(
  requestTimeFrame: ApiRequestTimeFrame = ApiRequestTimeFrame.ALL_TIME
) {
  const now = new Date();

  if (requestTimeFrame === ApiRequestTimeFrame.PAST_DAY) {
    const start = new Date(now);
    start.setDate(now.getDate() - 1);

    return {
      start_timestamp: start.toISOString(),
      end_timestamp: now.toISOString(),
    };
  }

  if (requestTimeFrame === ApiRequestTimeFrame.PAST_WEEK) {
    const start = new Date(now);
    start.setDate(now.getDate() - 7);

    return {
      start_timestamp: start.toISOString(),
      end_timestamp: now.toISOString(),
    };
  }

  if (requestTimeFrame === ApiRequestTimeFrame.PAST_MONTH) {
    const start = new Date(now);
    start.setMonth(now.getMonth() - 1);

    return {
      start_timestamp: start.toISOString(),
      end_timestamp: now.toISOString(),
    };
  }

  if (requestTimeFrame === ApiRequestTimeFrame.PAST_YEAR) {
    const start = new Date(now);
    start.setFullYear(now.getFullYear() - 1);

    return {
      start_timestamp: start.toISOString(),
      end_timestamp: now.toISOString(),
    };
  }

  // Defaults to ALL_TIME
  const start = new Date("1970-01-01");

  return {
    start_timestamp: start.toISOString(),
    end_timestamp: now.toISOString(),
  };
}

export type RoutePerformanceSummary = {
  numRequests: number;
  avgResponseTimeMs: number;
  excessiveDelaySec: number;
};

export type AvailGraphRoutesPerformanceSummary = Record<
  AvailGraphRoute,
  RoutePerformanceSummary
>;

export async function getAvailGraphNumRequestsPerMinute(
  requestTimeFrame: ApiRequestTimeFrame
): Promise<AvailGraphNumRequestsPerMinute> {
  const { start_timestamp, end_timestamp } =
    getApiRequestTimeFrame(requestTimeFrame);

  const resp = await falcor.get([
    "performanceMonitoring",
    "availGraphNumRequestsPerMinute",
    "from",
    start_timestamp,
    "to",
    end_timestamp,
  ]);

  return resp.json.performanceMonitoring.availGraphNumRequestsPerMinute.from[
    start_timestamp
  ].to[end_timestamp];
}

export async function getAvailGraphAvgResponseTimeByMinute(
  requestTimeFrame: ApiRequestTimeFrame
): Promise<AvailGraphAvgResponseTimeByMinute> {
  const { start_timestamp, end_timestamp } =
    getApiRequestTimeFrame(requestTimeFrame);

  const resp = await falcor.get([
    "performanceMonitoring",
    "availGraphAvgResponseTimeByMinute",
    "from",
    start_timestamp,
    "to",
    end_timestamp,
  ]);

  return resp.json.performanceMonitoring.availGraphAvgResponseTimeByMinute.from[
    start_timestamp
  ].to[end_timestamp];
}

export async function getAvailGraphRoutesPerformanceSummary(
  requestTimeFrame: ApiRequestTimeFrame
): Promise<AvailGraphRoutesPerformanceSummary> {
  const { start_timestamp, end_timestamp } =
    getApiRequestTimeFrame(requestTimeFrame);

  const resp = await falcor.get([
    "performanceMonitoring",
    "availGraphRoutesPerformanceSummary",
    "from",
    start_timestamp,
    "to",
    end_timestamp,
  ]);

  return resp.json.performanceMonitoring.availGraphRoutesPerformanceSummary
    .from[start_timestamp].to[end_timestamp];
}

export async function getAvailGraphNumRequestsPerRoute(
  requestTimeFrame: ApiRequestTimeFrame
): Promise<AvailGraphNumRequestsPerRoute> {
  const d = await getAvailGraphRoutesPerformanceSummary(requestTimeFrame);

  return Object.keys(d).reduce((acc: AvailGraphNumRequestsPerRoute, route) => {
    acc[route] = d[route].numRequests;
    return acc;
  }, {});
}

export async function getAvailGraphAvgResponseTimeByRoute(
  requestTimeFrame: ApiRequestTimeFrame
): Promise<AvailGraphAvgResponseTimeByRoute> {
  const d = await getAvailGraphRoutesPerformanceSummary(requestTimeFrame);

  return Object.keys(d).reduce(
    (acc: AvailGraphAvgResponseTimeByRoute, route) => {
      acc[route] = d[route].avgResponseTimeMs;
      return acc;
    },
    {}
  );
}

export async function getAvailGraphExcessiveDelaySecByRoute(
  requestTimeFrame: ApiRequestTimeFrame
): Promise<AvailGraphExcessiveDelaySecByRoute> {
  const d = await getAvailGraphRoutesPerformanceSummary(requestTimeFrame);

  return Object.keys(d).reduce(
    (acc: AvailGraphExcessiveDelaySecByRoute, route) => {
      acc[route] = d[route].excessiveDelaySec;
      return acc;
    },
    {}
  );
}
