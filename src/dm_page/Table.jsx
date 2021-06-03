import React from 'react'
import 'react-contexify/dist/ReactContexify.css';

import styled, { css } from 'styled-components'
import { useTable, usePagination, useSortBy, useFlexLayout } from 'react-table';
import { characters } from '../battle_page/data';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { ActionCell } from './ActionCell';
import { Menu, Item, Separator, Submenu, MenuProvider, useContextMenu } from 'react-contexify';
import Dropdown from 'react-dropdown';

const { ipcRenderer } = window.require('electron');

const MENU_ID = 'blahblah';

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

  .container {
      display: inline-block;
      position: relative;
  }
`

// Create an editable cell renderer
const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    const handleFocus = (event) => {
        event.target.select();
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            e.target.blur();
        }
    }

    return <input value={value} onChange={onChange} onBlur={onBlur} onFocus={handleFocus} onKeyDown={handleKeyPress} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
}

// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset, currentTurn, handleContextMenu }) {
    // For this example, we're using pagination to illustrate how to stop
    // the current page from resetting when our data changes
    // Otherwise, nothing is different here.
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
    } = useTable(
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

            initialState: { sortBy: [{ id: 'initiative', desc: true }], pageSize: 50 }
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
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr className={clsx({ activeRow: currentTurn === i })} onContextMenu={(event) => handleContextMenu(event, row.id, data)} {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

function App() {

    const [currentTurn, setCurrentTurn] = useState(0);

    const [data, setData] = React.useState(characters)
    const [skipPageReset, setSkipPageReset] = React.useState(false)

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = useCallback((rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        let newVal = data.map((row, index) => {
            if (index === rowIndex) {
                let finalValue = value;
                if ((columnId === 'hp' || columnId === 'maxHP') && (value.startsWith?.('+') || value.startsWith?.('-'))) {
                    finalValue = Number(data[rowIndex][columnId]) + Number(value)
                }

                if (columnId === 'hp' && (finalValue > 0) && data[rowIndex]['showDead']) {
                    data[rowIndex]['showDead'] = false;
                }

                if (columnId === 'hp' && (finalValue > data[rowIndex]['maxHP'] / 4) && data[rowIndex]['showCritical']) {
                    data[rowIndex]['showCritical'] = false;
                }

                return {
                    ...data[rowIndex],
                    [columnId]: finalValue,
                }
            }
            return row
        });

        setData(newVal);
    }, [setData, data]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Action',
                accessor: '',
                Cell: (props) => <ActionCell row={props.row} updateData={updateMyData} />
            },
            {
                Header: 'Current HP',
                accessor: 'hp',
                width: 80,
            },
            {
                Header: 'Max HP',
                accessor: 'maxHP',
                width: 80,
            },
            {
                Header: 'AC',
                accessor: 'ac',
                width: 50
            },
            {
                Header: 'To Hit',
                accessor: 'toHit',
                width: 50
            },
            {
                Header: 'DC',
                accessor: 'dc',
                width: 80
            },
            {
                Header: 'Faction',
                accessor: 'faction',
                width: 80,
                Cell: (props) => {
                    let currentFaction = props.row.values.faction;
                    let options = ['ally', 'enemy', 'friendly', 'neither'];
                    return <select value={currentFaction}
                        key={currentFaction}
                        onChange={(e) => updateMyData(props.row.index, 'faction', e.target.value)}
                        name='faction' id='faction-select'>
                        {options.map((value) => <option>{value}</option>)}
                    </select>
                }
            },
            {
                Header: 'Initiative',
                accessor: 'initiative',
                width: 80,
            },
        ],
        [updateMyData]
    )

    // After data chagnes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    React.useEffect(() => {
        setSkipPageReset(false)
    }, [data]);

    function handleContextMenu(event, rowID) {
        event.preventDefault();
        event.stopPropagation();
        show(
            event, {
            props: {
                key: 'value',
                rowID
            }
        })
    }

    const { show } = useContextMenu({
        id: MENU_ID,
    });

    const handleItemClick = ({ event, props }) => console.log(event, props);

    const addRow = () => {
        setData([...data, {name: ''}]);
    };

    const duplicateRow = ({ event, props }) => {
        setData([...data, { ...data[props.rowID] }])
    };
    const removeRow = ({ event, props }) => {
        if (window.confirm('Are you sure you wish to delete this Row?\nThis can not be undone!')) {
            setData([...data.filter((element, index) => index != props.rowID)]);
        }
    }

    useEffect(() => {
        ipcRenderer.send('dataUpdate', {
            data,
        });
    }, [data])

    useEffect(() => { console.log(data) }, [data])

    return (

        <Styles>
            <div className="container">
                <div className="actionRow">
                    <button style={{ position: 'absolute', left: 0 }} onClick={() => {
                        ipcRenderer.send('message', -1);
                        setCurrentTurn((currentTurn - 1 + data.length) % data.length)
                    }}>PREV</button>
                    <button style={{ position: 'absolute', right: 0 }} onClick={() => {
                        ipcRenderer.send('message', 1);
                        setCurrentTurn((currentTurn + 1 + data.length) % data.length)
                    }}>NEXT</button>
                </div>
                <Table
                    currentTurn={currentTurn}
                    columns={columns}
                    data={data}
                    updateMyData={updateMyData}
                    skipPageReset={skipPageReset}
                    handleContextMenu={handleContextMenu}
                />

                <button style={{ position: 'absolute', left: '50%', transform: 'translate(-50%)', marginTop: 15 }} onClick={() => {
                    setCurrentTurn(0);
                    window.open(`/battle?data=${JSON.stringify(data)}`, '_blank', 'frame=false, useContentSize=true')
                }}>START</button>
            </div>

            <Menu id={MENU_ID}>
                <Item onClick={addRow}>Add Row</Item>
                <Separator />
                <Item onClick={duplicateRow}>Duplicate Row</Item>
                <Item onClick={removeRow}>Remove Row</Item>
            </Menu>

        </Styles>
    )
}

export default App
