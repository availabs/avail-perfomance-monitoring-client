import { useState, useEffect, useContext } from "react";

import { BarGraph } from "components/avl-graph/src/index";

import Context from "../state/ViewContext";

import {
  getAvailGraphNumRequestsPerMinute,
  AvailGraphNumRequestsPerMinute,
} from "../../../api/getters";

export default function NumRequestsPerMinute() {
  const requestTimeFrame = useContext(Context);

  const [numRequestsPerMin, setAvailGraphNumRequestsPerMinute] =
    useState<AvailGraphNumRequestsPerMinute | null>(null);

  useEffect(() => {
    (async () => {
      const d = await getAvailGraphNumRequestsPerMinute(requestTimeFrame);

      setAvailGraphNumRequestsPerMinute(d);
    })();
  }, [requestTimeFrame]);

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
