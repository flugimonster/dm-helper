import React, { useMemo } from "react";
import "react-contexify/dist/ReactContexify.css";

import styled from "styled-components";
import { useTable, usePagination, useSortBy, useFlexLayout } from "react-table";
import { characters } from "../battle_page/data";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { ActionCell } from "./ActionCell";
import { Menu, Item, Separator, useContextMenu } from "react-contexify";
import CreatableSelect from "react-select/creatable";
import * as css from "./Table.module.scss";

const fs = window.require("fs");
const sharp = window.require("sharp");

const { remote: { dialog, app }, nativeImage } = window.require("electron");
const { ipcRenderer } = window.require("electron");
const path = window.require('path');

const MENU_ID = "blahblah";

const Styles = styled.div`
  padding: 1rem;

  table {
    margin-top: 20px;
    border-spacing: 0;
    border: 5px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 3px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        width: 100%;
        background: transparent;
        text-align: center;
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }

  tr {
    transition: 0.2s all ease-in;
  }
  .activeRow {
    background: gold;
  }

  .hidden {
    background: gray;
  }

  .container {
    display: inline-block;
    position: relative;
  }

  .imageAvatar {
    border-radius: 5px;
    max-width: 75px;
    max-height: 75px;
  }
`;

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
    <>
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
                  activeRow: row.original.uuid === currentPlayer,
                  hidden: row.original.hidden,
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
    </>
  );
}

function App() {
  const [data, setData] = React.useState(characters);
  const [variant, setVariant] = React.useState("vertical");
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [imageBank, setImageBank] = React.useState(() => Object.fromEntries(characters.map(c => [c.image, nativeImage.createFromPath(c.image).toDataURL()])))

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = useCallback(
    (rowIndex, columnId, value) => {
      // We also turn on the flag to not reset the page
      setSkipPageReset(true);
      let newVal = data.map((row, index) => {
        if (index == rowIndex) {
          let finalValue = value;
          if (
            (columnId === "hp" || columnId === "maxHP") &&
            (value.startsWith?.("+") || value.startsWith?.("-"))
          ) {
            finalValue = Number(data[rowIndex][columnId]) + Number(value);
          }

          if (
            columnId === "hp" &&
            finalValue > 0 &&
            data[rowIndex]["showDead"]
          ) {
            data[rowIndex]["showDead"] = false;
          }

          if (
            columnId === "hp" &&
            finalValue > data[rowIndex]["maxHP"] / 4 &&
            data[rowIndex]["showCritical"]
          ) {
            data[rowIndex]["showCritical"] = false;
          }

          return {
            ...data[rowIndex],
            [columnId]: finalValue,
          };
        }
        return row;
      });

      setData(newVal);
    },
    [setData, data]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Image",
        accessor: "image",
        width: 85,
        Cell: (props) => {
          const path = props.value;
          return path ?
            <img src={imageBank[path]} className={"imageAvatar"} alt="" /> :
            <button onClick={() => { loadImage(props.row.index) }} >UPLOAD IMAGE</button>
        },
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Action",
        accessor: "",
        Cell: (props) => (
          <ActionCell row={props.row} updateData={updateMyData} />
        ),
      },
      {
        Header: "Current HP",
        accessor: "hp",
        width: 80,
      },
      {
        Header: "Max HP",
        accessor: "maxHP",
        width: 80,
      },
      {
        Header: "To Hit",
        accessor: "toHit",
        width: 50,
      },
      {
        Header: "AC",
        accessor: "ac",
        width: 50,
      },
      {
        Header: "DC",
        accessor: "dc",
        width: 80,
      },
      {
        Header: "Faction",
        accessor: "faction",
        width: 80,
        Cell: (props) => {
          let currentFaction = props.row.values.faction;
          let options = ["ally", "enemy", "friendly", "neither"];
          return (
            <select
              value={currentFaction}
              key={props.row.index + "select-faction"}
              onChange={(e) =>
                updateMyData(props.row.index, "faction", e.target.value)
              }
              name="faction"
              id="faction-select"
            >
              {options.map((value) => (
                <option>{value}</option>
              ))}
            </select>
          );
        },
      },
      {
        Header: "Conditions",
        accessor: "Conditions",
        Cell: (props) => {
          return (
            <CreatableSelect
              className={css.select}
              isMulti
              options={[
                { label: "Blinded", value: "Blinded" },
                { label: "Charmed", value: "Charmed" },
                { label: "Deafened", value: "Deafened" },
                { label: "Frightened", value: "Frightened" },
                { label: "Grappled", value: "Grappled" },
                { label: "Incapacitated", value: "Incapacitated" },
                { label: "Invisible", value: "Invisible" },
                { label: "Paralyzed", value: "Paralyzed" },
                { label: "Petrified", value: "Petrified" },
                { label: "Poisoned", value: "Poisoned" },
                { label: "Prone", value: "Prone" },
                { label: "Restrained", value: "Restrained" },
                { label: "Stunned", value: "Stunned" },
                { label: "Unconscious", value: "Unconscious" },
                { label: "Exhaustion", value: "Exhaustion" },
              ]}
            />
          );
        },
        width: 350,
      },
      {
        Header: "Initiative",
        accessor: "initiative",
        width: 80,
      },
    ],
    [updateMyData]
  );

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  function handleContextMenu(event, rowID) {
    event.preventDefault();
    event.stopPropagation();
    show(event, {
      props: {
        key: "value",
        rowID,
      },
    });
  }

  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const addRow = () => {
    setData([
      ...data,
      {
        hp: 1,
        maxHP: 1,
        initiative: 0,
        name: "",
        hidden: true,
        uuid: Date.now(),
      },
    ]);
  };

  const duplicateRow = ({ event, props }) => {
    setData([
      ...data,
      {
        ...data[props.rowID],
        name: data[props.rowID].name + "*",
        uuid: Date.now(),
      },
    ]);
  };

  const removeRow = ({ event, props: { rowID } }) => {
    if (
      window.confirm(
        "Are you sure you wish to delete this Row?\nThis can not be undone!"
      )
    ) {
      if (currentPlayer === data[rowID].uuid) {
        moveTurn(1);
      }
      setData([...data.filter((element, index) => index != rowID)]);
    }
  };

  const hideCharacter = ({ props: { rowID } }) => {
    if (currentPlayer === data[rowID].uuid) {
      moveTurn(1);
    }
    updateMyData(rowID, "hidden", true);
  };

  const changeVariant = useCallback(() => {
    let align = variant === "vertical" ? "horizontal" : "vertical";
    setVariant(align);
  }, [variant, setVariant]);

  useEffect(() => {
    ipcRenderer.send("variant", {
      variant,
    });
  }, [variant]);

  const turnOrder = useMemo(() => {
    const temp = [...data].filter((d) => d.hidden !== true);
    temp.sort((a, b) => (b?.initiative ?? 0) - (a?.initiative ?? 0));
    return temp.map((d) => d.uuid);
  }, [data]);

  const [currentPlayer, setCurrentPlayer] = useState(turnOrder[0]);

  const preprocessDataForChild = useCallback((data) =>
    data
      .filter((d) => !d.hidden)
      .map(
        (d) => {
          if (d.uuid !== currentPlayer) {
            return d;
          } else {
            return { ...d, highlight: true };
          }
        },
        [data, currentPlayer]
      )
  );

  useEffect(() => {
    ipcRenderer.send("dataUpdate", {
      data: preprocessDataForChild(data),
    });
  }, [data, currentPlayer, preprocessDataForChild]);

  const moveTurn = (step) => {
    const i =
      (turnOrder.findIndex((t) => t === currentPlayer) +
        step +
        turnOrder.length) %
      turnOrder.length;
    setCurrentPlayer(turnOrder[i]);
  };

  const loadImage = async (rowId) => {
    const { filePaths, canceled } = await dialog.showOpenDialog();
    if (!canceled) {
      const savePath = path.join(app.getPath('userData'), `avatars/${Date.now()}_${path.basename(filePaths[0])}`);
      await sharp(filePaths[0]).resize({ width: 250 }).toFile(savePath);
      setImageBank({ ...imageBank, [savePath]: nativeImage.createFromPath(savePath).toDataURL() });
      updateMyData(rowId, 'image', savePath);
      return savePath;
    }
  }

  const saveEncounter = async (characters) => {
    const { filePath, canceled } = await dialog.showSaveDialog({
      title: "Save encounter",
      defaultPath: path.join(app.getPath('userData'), 'encounters/'),
      filters: [{ name: 'Encounter', extensions: ['json'] }],
    });

    if (!canceled) {
      const toSave = characters.map(({ uuid, ...character }) => character);
      fs.writeFileSync(filePath, JSON.stringify(toSave), "utf-8");
    }
  };

  const loadEncounter = async () => {
    const { filePaths, canceled } = await dialog.showOpenDialog({
      title: "Choose an encounter to load",
      defaultPath: path.join(app.getPath('userData'), 'encounters/'),
      filters: [{ name: 'Encounter', extensions: ['json'] }],
      properties: ["multiSelections"],
    });
    if (!canceled) {
      filePaths.forEach((path) => {
        const content = JSON.parse(fs.readFileSync(path, { encoding: "utf8", flag: "r" }));
        const toLoad = content.map((c) => ({ ...c, uuid: Date.now() * Math.random() }));
        setData([...data, ...toLoad]);
      });
    }
  };

  return (
    <Styles>
      <div className="container">
        <div className="actionRow">
          <button
            style={{ position: "absolute", left: 0 }}
            onClick={() => {
              moveTurn(-1);
            }}
          >
            PREV
          </button>
          <button
            style={{ position: "absolute", right: 0 }}
            onClick={() => {
              moveTurn(1);
            }}
          >
            NEXT
          </button>
        </div>
        <Table
          currentPlayer={currentPlayer}
          columns={columns}
          data={data}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
          handleContextMenu={handleContextMenu}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%)",
            marginTop: 15,
            width: "100%",
          }}
        >
          <button
            onClick={() => {
              window.open(
                `/battle?data=${JSON.stringify(preprocessDataForChild(data))}`,
                "_blank",
                "frame=false, useContentSize=true"
              );
            }}
          >
            START
          </button>

          <button
            style={{ marginLeft: 200 }}
            onClick={() => {
              saveEncounter(data);
            }}
          >
            Save Encounter
          </button>

          <button
            onClick={() => {
              loadEncounter();
            }}
          >
            Load Encounter
          </button>
        </div>
      </div>

      <Menu id={MENU_ID}>
        <Item onClick={hideCharacter}>Hide Character</Item>
        <Separator />
        <Item onClick={addRow}>Add Row</Item>
        <Item onClick={duplicateRow}>Duplicate Row</Item>
        <Item onClick={removeRow}>Remove Row</Item>
        <Separator />
        <Item onClick={changeVariant}>Change Variant</Item>
      </Menu>
    </Styles>
  );
}

export default App;
