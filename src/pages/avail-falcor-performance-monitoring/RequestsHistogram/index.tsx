import React, {useState, useEffect, useRef} from 'react';

import { BarGraph } from 'components/avl-graph/src/index'

import { getAvailGraphNumRequestsPerMinute } from '../../../api/getters'

type AvailGraphNumRequestsPerMinute = Record<string, number>

function RequestsHistogram () {
  const [ready, setPageReady] = useState(false);

  const availGraphNumRequestsPerMinute: {current: AvailGraphNumRequestsPerMinute | null} = useRef(null);

  useEffect(() => {
    (async () => {
      availGraphNumRequestsPerMinute.current = await getAvailGraphNumRequestsPerMinute()

      setPageReady(true)
    })();
  }, []);

  if (!ready) {
    return (
      <div className="h-full flex items-center justify-center flex-col">
        <div className="text-2xl font-bold">Loading</div>
      </div>
    );
  }

  const data = Object.keys(availGraphNumRequestsPerMinute.current).sort()
    .map((k) => ({k, v: availGraphNumRequestsPerMinute.current[k]}))

  return <div className="h-full flex items-center justify-center flex-col">
    <BarGraph
      data={data}
      keys={['v']}
      indexBy='k'
    />
  </div>
}

const config = {
  path: "/avail-falcor-performance-monitoring/requests-histogram",
  exact: true,
  mainNav: false,
  component: RequestsHistogram,
  layoutSettings: {
    fixed: true,
    headerBar: false,
    logo: "AVAIL",
    navBar: false,
  },
};

export default config;
