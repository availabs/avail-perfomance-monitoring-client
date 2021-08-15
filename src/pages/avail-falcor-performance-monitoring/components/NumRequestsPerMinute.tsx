import { useState, useEffect } from "react";

import { BarGraph } from "components/avl-graph/src/index";

import {
  getAvailGraphNumRequestsPerMinute,
  AvailGraphNumRequestsPerMinute,
} from "../../../api/getters";

export default function NumRequestsPerMinute() {
  const [availGraphNumRequestsPerMinute, setAvailGraphNumRequestsPerMinute] =
    useState<AvailGraphNumRequestsPerMinute | null>(null);

  useEffect(() => {
    (async () => {
      const d = await getAvailGraphNumRequestsPerMinute();

      setAvailGraphNumRequestsPerMinute(d);
    })();
  }, []);

  if (!availGraphNumRequestsPerMinute) {
    return <div className="text-2xl font-bold">Loading</div>;
  }

  const data = Object.keys(availGraphNumRequestsPerMinute)
    .sort()
    .map((timestamp) => ({
      timestamp,
      num_req_per_min: availGraphNumRequestsPerMinute[timestamp],
    }));

  return (
    <BarGraph data={data} keys={["num_req_per_min"]} indexBy="timestamp" />
  );
}
