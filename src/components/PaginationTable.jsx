import React, { useMemo } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import MOCK_DATA from "../../MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import { IndeterminateCheckbox } from "./CheckBox";
import "./table.css";
function PaginationTable() {
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    canNextPage,
    canPreviousPage,
    previousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setPageSize,
    selectedFlatRows,
    prepareRow,
  } = useTable(
    {
      columns: columns,
      data: data,
    },
    usePagination,
    useRowSelect,

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

  const { pageIndex, pageSize } = state;
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
          {page.map((row) => {
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
      </table>
      <div>
        <span>
          <strong>
            page {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNum = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageNum);
            }}
            style={{ width: "50px" }}
          />
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {" "}
                show {pageSize}
              </option>
            ))}
          </select>
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button disabled={!canPreviousPage} onClick={previousPage}>
          prev
        </button>
        <button disabled={!canNextPage} onClick={nextPage}>
          next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
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

export default PaginationTable;
