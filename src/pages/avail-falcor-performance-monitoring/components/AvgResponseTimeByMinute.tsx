import { useState, useEffect } from "react";

import { BarGraph } from "components/avl-graph/src/index";

import {
  getAvailGraphAvgResponseTimeByMinute,
  AvailGraphAvgResponseTimeByMinute,
} from "../../../api/getters";

export default function AvgResponseTimeByMinute() {
  const [
    availGraphAvgResponseTimeByMinute,
    setAvailGraphAvgResponseTimeByMinute,
  ] = useState<AvailGraphAvgResponseTimeByMinute | null>(null);

  useEffect(() => {
    (async () => {
      const d = await getAvailGraphAvgResponseTimeByMinute();

      setAvailGraphAvgResponseTimeByMinute(d);
    })();
  }, []);

  if (!availGraphAvgResponseTimeByMinute) {
    return <div className="text-2xl font-bold">Loading</div>;
  }

  const data = Object.keys(availGraphAvgResponseTimeByMinute)
    .sort()
    .map((timestamp) => ({
      timestamp,
      avg_resp_ms: availGraphAvgResponseTimeByMinute[timestamp],
    }));

  return <BarGraph data={data} keys={["avg_resp_ms"]} indexBy="timestamp" />;
}
