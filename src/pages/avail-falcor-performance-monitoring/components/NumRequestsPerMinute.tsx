import { useState, useEffect } from "react";

import { BarGraph } from "components/avl-graph/src/index";

import {
  getAvailGraphNumRequestsPerMinute,
  AvailGraphNumRequestsPerMinute,
} from "../../../api/getters";

export default function NumRequestsPerMinute() {
  const [numRequestsPerMin, setAvailGraphNumRequestsPerMinute] =
    useState<AvailGraphNumRequestsPerMinute | null>(null);

  useEffect(() => {
    (async () => {
      const d = await getAvailGraphNumRequestsPerMinute();

      setAvailGraphNumRequestsPerMinute(d);
    })();
  }, []);

  if (!numRequestsPerMin) {
    return <div className="text-2xl font-bold">Loading</div>;
  }

  const data = Object.keys(numRequestsPerMin)
    .sort()
    .map((timestamp) => ({
      timestamp,
      num_req_per_min: numRequestsPerMin[timestamp],
    }));

  return (
    <div
      style={{ padding: 50, height: 600, width: 800 }}
      className="text-2xl font-bold"
    >
      <BarGraph data={data} keys={["num_req_per_min"]} indexBy="timestamp" />
    </div>
  );
}
