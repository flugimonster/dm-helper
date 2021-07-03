import React from "react";
import "react-contexify/dist/ReactContexify.css";
import { useTable, usePagination, useSortBy, useFlexLayout } from "react-table";
import clsx from "clsx";
import * as css from "./Table.module.scss";

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  return (
    <input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyPress}
    />
  );
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

// Be sure to pass our updateMyData and the skipPageReset option
function Table({
  columns,
  data,
  updateMyData,
  skipPageReset,
  currentPlayer,
  handleContextMenu,
}) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
        // use the skipPageReset option to disable page resetting temporarily
        autoResetPage: !skipPageReset,
        // updateMyData isn't part of the API, but
        // anything we put into these options will
        // automatically be available on the instance.
        // That way we can call this function from our
        // cell renderer!
        updateMyData,
        initialState: {
          sortBy: [
            { id: "initiative", desc: true },
            { id: "name", desc: false },
          ],
          pageSize: 50,
        },
      },
      useSortBy,
      usePagination,
      useFlexLayout
    );

  // Render the UI for your table
  return (
    <div className={css.tableWrapper}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                className={clsx({
                  [css.activeRow]: row.original.uuid === currentPlayer,
                  [css.hidden]: row.original.hidden,
                })}
                onContextMenu={(event) =>
                  handleContextMenu(event, row.id, data)
                }
                {...row.getRowProps()}
              >
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
    </div>
  );
}

export default Table;
