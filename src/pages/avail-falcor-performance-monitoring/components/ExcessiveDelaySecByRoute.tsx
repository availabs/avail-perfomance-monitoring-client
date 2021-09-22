import { useState, useEffect, useContext } from "react";

import { BarGraph } from "components/avl-graph/src/index";

import {
  getAvailGraphExcessiveDelaySecByRoute,
  AvailGraphExcessiveDelaySecByRoute,
} from "../../../api/getters";

import Context from "../state/ViewContext";

export default function NumRequestsPerRoute() {
  const requestTimeFrame = useContext(Context);

  const [excessiveDelaySecByRoute, setExcessiveDelaySecByRoute] =
    useState<AvailGraphExcessiveDelaySecByRoute | null>(null);

  useEffect(() => {
    (async () => {
      const d = await getAvailGraphExcessiveDelaySecByRoute(requestTimeFrame);

      setExcessiveDelaySecByRoute(d);
    })();
  }, [requestTimeFrame]);

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
