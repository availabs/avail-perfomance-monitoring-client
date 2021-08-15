// import AvgResponseTimeByMinute from "./components/AvgResponseTimeByMinute";
// import NumRequestsPerRoute from "./components/NumRequestsPerRoute";
// import AvgResponseTimeByRoute from "./components/AvgResponseTimeByRoute";
import ExcessiveDelaySecByRoute from "./components/ExcessiveDelaySecByRoute";

function AvailFalcorApiPerformanceMonitoringView() {
  return (
    <div className="h-full flex items-center justify-center flex-col">
      <ExcessiveDelaySecByRoute />
    </div>
  );
}

const config = {
  path: "/avail-falcor-performance-monitoring",
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
