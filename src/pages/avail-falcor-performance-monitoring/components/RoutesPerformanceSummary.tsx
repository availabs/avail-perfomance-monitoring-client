import { useState, useEffect, useMemo } from "react";

import { useTable, useSortBy } from "react-table";

import {
  getAvailGraphRoutesPerformanceSummary,
  AvailGraphRoute,
  RoutePerformanceSummary,
  AvailGraphRoutesPerformanceSummary,
} from "../../../api/getters";

type SummaryRow = {
  route: AvailGraphRoute;
} & RoutePerformanceSummary;

const schema = [
  {
    Header: "API Route",
    accessor: "route",
  },

  {
    Header: "# Requests",
    accessor: "numRequests",
  },

  {
    Header: "Avg Resp Time (ms)",
    accessor: "avgResponseTimeMs",
  },

  {
    Header: "Excessive Delay (s)",
    accessor: "excessiveDelaySec",
  },
];

export default function RoutePerformanceSummaryTable() {
  console.log("RoutePerformanceSummaryTable");
  const [summary, setSummary] =
    useState<AvailGraphRoutesPerformanceSummary | null>(null);

  const columns = useMemo(() => schema, []);

  const data = useMemo<SummaryRow[]>(
    () =>
      summary
        ? Object.keys(summary).map((route) => ({
            route,
            ...summary[route],
          }))
        : [],
    [summary]
  );

  // @ts-ignore
  const tableInstance = useTable({ columns, data }, useSortBy);

  useEffect(() => {
    (async () => {
      const d = await getAvailGraphRoutesPerformanceSummary();

      setSummary(d);
    })();
  }, []);

  if (!summary) {
    return <div className="text-2xl font-bold">Loading</div>;
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  // https://react-table.tanstack.com/docs/quick-start
  // https://react-table.tanstack.com/docs/examples/sorting

  return (
    <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // Add the sorting props to control sorting. For this example
              // we can add them into the header props
              // @ts-ignore
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                {/* Add a sort direction indicator */}
                <span>
                  {
                    // @ts-ignore
                    column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
                  }
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: "papayawhip",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
