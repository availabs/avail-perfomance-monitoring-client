import { useState, useEffect } from "react";

import { BarGraph } from "components/avl-graph/src/index";

import {
  getAvailGraphExcessiveDelaySecByRoute,
  AvailGraphExcessiveDelaySecByRoute,
} from "../../../api/getters";

export default function NumRequestsPerRoute() {
  const [excessiveDelaySecByRoute, setExcessiveDelaySecByRoute] =
    useState<AvailGraphExcessiveDelaySecByRoute | null>(null);

  useEffect(() => {
    (async () => {
      const d = await getAvailGraphExcessiveDelaySecByRoute();

      setExcessiveDelaySecByRoute(d);
    })();
  }, []);

  if (!excessiveDelaySecByRoute) {
    return <div className="text-2xl font-bold">Loading</div>;
  }

  const data = Object.keys(excessiveDelaySecByRoute)
    .sort(
      (a, b) =>
        excessiveDelaySecByRoute[a] - excessiveDelaySecByRoute[b] ||
        a.localeCompare(b)
    )
    .map((route) => ({
      route,
      xdelay_sec: excessiveDelaySecByRoute[route],
    }));

  return (
    <div
      style={{ padding: 50, height: 600, width: 800 }}
      className="text-2xl font-bold"
    >
      <BarGraph data={data} keys={["xdelay_sec"]} indexBy="route" />
    </div>
  );
}
