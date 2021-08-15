import { useState, useEffect } from "react";

import { BarGraph } from "components/avl-graph/src/index";

import {
  getAvailGraphAvgResponseTimeByRoute,
  AvailGraphAvgResponseTimeByRoute,
} from "../../../api/getters";

export default function AvgResponseTimeByRoute() {
  const [avgResponseTimeByRoute, setAvgResponseTimeByRoute] =
    useState<AvailGraphAvgResponseTimeByRoute | null>(null);

  useEffect(() => {
    (async () => {
      const d = await getAvailGraphAvgResponseTimeByRoute();

      setAvgResponseTimeByRoute(d);
    })();
  }, []);

  if (!avgResponseTimeByRoute) {
    return <div className="text-2xl font-bold">Loading</div>;
  }

  const data = Object.keys(avgResponseTimeByRoute)
    .sort(
      (a, b) =>
        avgResponseTimeByRoute[a] - avgResponseTimeByRoute[b] ||
        a.localeCompare(b)
    )
    .map((route) => ({
      route,
      avg_resp_ms: avgResponseTimeByRoute[route],
    }));

  return (
    <div
      style={{ padding: 50, height: 600, width: 800 }}
      className="text-2xl font-bold"
    >
      <BarGraph data={data} keys={["avg_resp_ms"]} indexBy="route" />
    </div>
  );
}
