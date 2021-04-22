import React from 'react'
import styled, { css } from 'styled-components'
import { useTable, usePagination, useSortBy, useFlexLayout } from 'react-table';
import { characters } from '../battle_page/data';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');


const Styles = styled.div`
  padding: 1rem;

  table {
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
function Table({ columns, data, updateMyData, skipPageReset, currentTurn }) {
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
            initialState: { sortBy: [{ id: 'initiative', desc: true }] }
        },
        useSortBy,
        usePagination,
        useFlexLayout
    )

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
                        console.log(i, currentTurn === i)
                        return (
                            <tr className={clsx({ activeRow: currentTurn === i })} {...row.getRowProps()}>
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

    const sortData = (original) => {
        // const newVal = [...original];
        // newVal.sort((a, b) => b.initiative - a.initiative);
        // return newVal;
        return original
    }

    const [currentTurn, setCurrentTurn] = useState(0);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
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
                Header: 'DC',
                accessor: 'dc',
                width: 50
            },
            {
                Header: 'Faction',
                accessor: 'faction',
                width: 80,
            },
            {
                Header: 'Initiative',
                accessor: 'initiative',
                width: 80,
            },
        ],
        []
    )

    const [data, setData] = React.useState(sortData(characters))
    const [skipPageReset, setSkipPageReset] = React.useState(false)

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        let newVal = data.map((row, index) => {
            if (index === rowIndex) {
                let finalValue = value;
                if ((columnId === 'hp' || columnId === 'maxHP') && (value.startsWith?.('+') || value.startsWith?.('-'))) {
                    finalValue = Number(data[rowIndex][columnId]) + Number(value)
                }

                if (columnId === 'hp' || columnId === 'maxHP') {
                    ipcRenderer.send('hp', {
                        name: data[rowIndex].name,
                        value: finalValue
                    });
                }
                return {
                    ...data[rowIndex],
                    [columnId]: finalValue,
                }
            }
            return row
        });



        if (columnId === 'initiative') {
            newVal = sortData(newVal);
        }

        setData(
            newVal,
        )
    }


    // After data chagnes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    React.useEffect(() => {
        setSkipPageReset(false)
    }, [data]);

    return (
        <Styles>
            <div className="container">
                <div className="actionRow">
                    <button onClick={() => {
                        ipcRenderer.send('message', -1);
                        setCurrentTurn((currentTurn - 1 + characters.length) % characters.length)
                    }}>PREV</button>
                    <button style={{ position: 'absolute', right: 0 }} onClick={() => {
                        ipcRenderer.send('message', 1);
                        setCurrentTurn((currentTurn + 1 + characters.length) % characters.length)
                    }}>NEXT</button>
                </div>
                <Table
                    currentTurn={currentTurn}
                    columns={columns}
                    data={data}
                    updateMyData={updateMyData}
                    skipPageReset={skipPageReset}
                />

                <button style={{ position: 'absolute', left: '50%', transform: 'translate(-50%)', marginTop: 15 }} onClick={() => {
                    setCurrentTurn(0);
                    window.open('/battle', '_blank', 'frame=false, width=240, height=800, transparent=true')
                }}>START</button>
            </div>
        </Styles>
    )
}

export default App
