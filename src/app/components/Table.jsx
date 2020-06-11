import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination
} from "react-table";
require("../../assets/table.css");

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;
  

  return (
    <input
      value={filterValue || ""}
      style={{marginLeft:"10px",height:"30px",width:"180px",border:"0px",marginTop:"5px",fontSize:"0.9rem",boxShadow:"none",backgroundColor:"#F4F4F2",textAlign:"justify",textTransform:"capitalize"}}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      // placeholder={`Search ${count} records...`}
      // placeholder = {`Search`}
    />
  );
}

// const defaultColumn = 
//   () => ({
//     // Let's set up our default Filter UI
//     Filter: DefaultColumnFilter,
//   }),
//   []

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val


function Table({ columns, data, rowInfo,styles }) {
  

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );
  return (
    <table {...getTableProps()} style={styles && styles}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
                
                <div>{column.canFilter && column.render('Header') !== "Action" && column.render('Header') !== "Reassign"? column.render("Filter") : null}</div>
              </th>
          
            ))}
          </tr>
        ))}
        {/* <tr>
          <th
            colSpan={visibleColumns.length}
            style={{
              textAlign: "left",
            }}
          >
            <DefaultColumnFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr> */}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps({ onClick: () => rowInfo(row) })}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>
                    {/* <input/> */}
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

export default Table;
