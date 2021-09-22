import { useState, useEffect, useContext } from "react";

import { BarGraph } from "components/avl-graph/src/index";

import {
  getAvailGraphAvgResponseTimeByMinute,
  AvailGraphAvgResponseTimeByMinute,
} from "../../../api/getters";

import Context from "../state/ViewContext";

export default function AvgResponseTimeByMinute() {
  const requestTimeFrame = useContext(Context);

  const [
    availGraphAvgResponseTimeByMinute,
    setAvailGraphAvgResponseTimeByMinute,
  ] = useState<AvailGraphAvgResponseTimeByMinute | null>(null);

  useEffect(() => {
    (async () => {
      const d = await getAvailGraphAvgResponseTimeByMinute(requestTimeFrame);

      setAvailGraphAvgResponseTimeByMinute(d);
    })();
  }, [requestTimeFrame]);

  if (!availGraphAvgResponseTimeByMinute) {
    return <div className="text-2xl font-bold">Loading</div>;
  }

  const data = Object.keys(availGraphAvgResponseTimeByMinute)
    .sort()
    .map((timestamp) => ({
      timestamp,
      avg_resp_ms: availGraphAvgResponseTimeByMinute[timestamp],
    }));

  return (
    <div
      style={{ padding: 50, height: 600, width: 800 }}
      className="text-2xl font-bold"
    >
      <BarGraph data={data} keys={["avg_resp_ms"]} indexBy="timestamp" />
    </div>
  );
}
