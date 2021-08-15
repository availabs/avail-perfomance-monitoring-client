import Landing from "pages/Landing";
import NoMatch from "pages/404";

import AvailFalcorApiPerformanceMonitoringView from "pages/avail-falcor-performance-monitoring";

const Routes = [Landing, AvailFalcorApiPerformanceMonitoringView];

// Must be the last route
Routes.push(NoMatch);

export default Routes;
