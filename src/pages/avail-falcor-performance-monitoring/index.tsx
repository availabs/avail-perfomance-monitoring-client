import { useState, ReactElement } from "react";

import Select from "react-select";

import RoutesPerformanceSummary from "./components/RoutesPerformanceSummary";
import AvgResponseTimeByMinute from "./components/AvgResponseTimeByMinute";
import NumRequestsPerMinute from "./components/NumRequestsPerMinute";
import AvgResponseTimeByRoute from "./components/AvgResponseTimeByRoute";
import NumRequestsPerRoute from "./components/NumRequestsPerRoute";
import ExcessiveDelaySecByRoute from "./components/ExcessiveDelaySecByRoute";

enum VizLabel {
  RoutesPerformanceSummary = "Summary Table",
  AvgResponseTimeByMinute = "Avg Response Time By Minute",
  NumRequestsPerMinute = "Num Requests By Minute",
  AvgResponseTimeByRoute = "Avg Response Time By Route",
  NumRequestsPerRoute = "Num Requests By Route",
  ExcessiveDelaySecByRoute = "Excessive Delay By Route",
}

const visualizations: Record<VizLabel, ReactElement> = {
  [VizLabel.RoutesPerformanceSummary]: <RoutesPerformanceSummary />,
  [VizLabel.AvgResponseTimeByMinute]: <AvgResponseTimeByMinute />,
  [VizLabel.NumRequestsPerMinute]: <NumRequestsPerMinute />,
  [VizLabel.AvgResponseTimeByRoute]: <AvgResponseTimeByRoute />,
  [VizLabel.NumRequestsPerRoute]: <NumRequestsPerRoute />,
  [VizLabel.ExcessiveDelaySecByRoute]: <ExcessiveDelaySecByRoute />,
};

const options = Object.keys(visualizations).map((label) => ({
  label,
  // @ts-ignore
  value: visualizations[label],
}));

const defaultLabel = VizLabel.RoutesPerformanceSummary;
const defaultViz = visualizations[defaultLabel];

function AvailFalcorApiPerformanceMonitoringView() {
  const [viz, setViz] = useState<ReactElement>(defaultViz);

  return (
    <div className="h-full flex items-center justify-center flex-col">
      <div style={{ padding: 50 }} className="text-2xl font-bold">
        AVAIL Falcor Graph API Performance Monitoring
      </div>
      <div style={{ padding: 50, width: 600 }} className="text-2xl font-bold">
        <div className="font-medium">Visualization</div>
        <Select
          options={options}
          // @ts-ignore
          onChange={({ value } = {}) => value && setViz(value)}
        />
      </div>
      <div style={{ padding: 50 }} className="flex items-center justify-center">
        {viz}
      </div>
    </div>
  );
}

const config = {
  path: "/",
  exact: true,
  mainNav: false,
  component: AvailFalcorApiPerformanceMonitoringView,
  layoutSettings: {
    fixed: true,
    headerBar: false,
    logo: "AVAIL",
    navBar: false,
  },
};

export default config;
