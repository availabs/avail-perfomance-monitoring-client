import { useState, useEffect, useContext } from "react";

import { BarGraph } from "components/avl-graph/src/index";

import {
  getAvailGraphNumRequestsPerRoute,
  AvailGraphNumRequestsPerRoute,
} from "../../../api/getters";

import Context from "../state/ViewContext";

export default function NumRequestsPerRoute() {
  const requestTimeFrame = useContext(Context);

  const [numRequestsPerRoute, setNumRequestsPerRoute] =
    useState<AvailGraphNumRequestsPerRoute | null>(null);

  useEffect(() => {
    (async () => {
      const d = await getAvailGraphNumRequestsPerRoute(requestTimeFrame);

      setNumRequestsPerRoute(d);
    })();
  }, [requestTimeFrame]);

  if (!numRequestsPerRoute) {
    return <div className="text-2xl font-bold">Loading</div>;
  }

  const data = Object.keys(numRequestsPerRoute)
    .sort(
      (a, b) =>
        numRequestsPerRoute[a] - numRequestsPerRoute[b] || a.localeCompare(b)
    )
    .map((route) => ({
      route,
      num_req: numRequestsPerRoute[route],
    }));

  return (
    <div
      style={{ padding: 50, height: 600, width: 800 }}
      className="text-2xl font-bold"
    >
      <BarGraph data={data} keys={["num_req"]} indexBy="route" />
    </div>
  );
}
