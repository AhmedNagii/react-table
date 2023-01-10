import React, { useMemo } from "react";
import { useTable, useRowSelect } from "react-table";
import MOCK_DATA from "../../MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";

import "./table.css";
import { IndeterminateCheckbox } from "./CheckBox";

function RowSelection() {
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns: columns,
      data: data,
    },
    useRowSelect,
    //  hooks => {
    //   hooks.visibleColumns.push(columns => [
    //     {
    //       id: 'selection',
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <Checkbox {...getToggleAllRowsSelectedProps()} />
    //       ),
    //       Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
    //     },
    //     ...columns
    //   ])
    // },

    (hooks) => {
      hooks.visibleColumns.push((cols) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => {
              return (
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              );
            },
            Cell: ({ row }) => (
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...cols,
        ];
      });
    }
  );
  const firstPageRows = rows.slice(0, 10);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <th {...col.getHeaderProps()}>{col.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getHeaderGroupProps()}>
              {footerGroup.headers.map((col) => (
                <th {...col.getHeaderProps()}>{col.render("Footer")}</th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
}

export default RowSelection;
