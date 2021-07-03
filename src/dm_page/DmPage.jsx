import React, { useMemo } from "react";
import "react-contexify/dist/ReactContexify.css";
import { characters } from "../battle_page/data";
import { useCallback, useEffect, useState } from "react";
import { ActionCell } from "./ActionCell";
import { Menu, Item, Separator, useContextMenu } from "react-contexify";
import CreatableSelect from "react-select/creatable";
import * as css from "./Table.module.scss";
import { avatarsPath, encountersPath } from '../consts';
import Table from './Table';
import Button from '@material-ui/core/Button';
import Select from 'react-select'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const fs = window.require("fs");
const sharp = window.require("sharp");

const { remote: { dialog, app }, nativeImage } = window.require("electron");
const { ipcRenderer } = window.require("electron");
const path = window.require('path');

const MENU_ID = "blahblah";


export function DmPage() {
    const [data, setData] = React.useState(characters);
    const [variant, setVariant] = React.useState("vertical");
    const [skipPageReset, setSkipPageReset] = React.useState(false);
    const [imageBank, setImageBank] = React.useState(() => Object.fromEntries(characters.map(c => [c.image, nativeImage.createFromPath(c.image).toDataURL()])))


    const turnOrder = useMemo(() => {
        const temp = [...data].filter((d) => d.hidden !== true);
        temp.sort((a, b) => (b?.initiative ?? 0) - (a?.initiative ?? 0));
        return temp.map((d) => d.uuid);
    }, [data]);

    const [currentPlayer, setCurrentPlayer] = useState(turnOrder[0]);

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
                // index returned from map is int whereas rowIndx is saved on react-table as a string
                if (index === Number(rowIndex)) {
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

                    if (columnId === "hidden" && finalValue === false && data.every(d => d.hidden)) {
                        setCurrentPlayer(data[rowIndex].uuid);
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
        [setData, data, setCurrentPlayer]
    );

    const loadImage = useCallback(async (rowId) => {
        const { filePaths, canceled } = await dialog.showOpenDialog({
            title: "Choose an image to load",
            defaultPath: app.getPath('pictures'),
            filters: [{ name: 'Image', extensions: ['jpg', 'jpeg', 'png', 'bmp'] }],
        });
        if (!canceled) {
            const savePath = path.join(avatarsPath, `${Date.now()}_${path.basename(filePaths[0])}`);
            await sharp(filePaths[0]).resize({ width: 250 }).toFile(savePath);
            setImageBank({ ...imageBank, [savePath]: nativeImage.createFromPath(savePath).toDataURL() });
            updateMyData(rowId, 'image', savePath);
            return savePath;
        }
    }, [imageBank, updateMyData])

    const columns = React.useMemo(
        () => [
            {
                Header: "Image",
                accessor: "image",
                width: 85,
                Cell: (props) => {
                    const path = props.value;
                    return path ?
                        <img src={imageBank[path]} onClick={() => { loadImage(props.row.index) }} className={css.imageAvatar} alt="" /> :
                        <Button variant="contained" color="primary" onClick={() => { loadImage(props.row.index) }}>UPLOAD IMAGE</Button>
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
                width: 130,
                Cell: (props) => {
                    const factions = [
                        { value: "party", label: "Party" },
                        { value: "enemy", label: "Enemy" },
                        { value: "friendly", label: "Ally" },
                        { value: "neither", label: "Neither" },
                    ]
                    const currentFaction = factions.find(f => f.value === props.row.values.faction);

                    return (
                        <Select className={css.select}
                            value={currentFaction}
                            key={props.row.index + "select-faction"}
                            onChange={(val) =>
                                updateMyData(props.row.index, "faction", val.value)
                            }
                            name="faction"
                            id="faction-select"
                            options={factions}
                        />
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
        [updateMyData, loadImage, imageBank]
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
        confirmAlert({
            title: <div className={css.popUpHeader}>Delete Row</div>,
            message: <div className={css.popUpBody}>
                <div>Are you sure you wish to delete this Row? </div>
                <div>This can not be undone!</div>
            </div>,

            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => {
                        if (currentPlayer === data[rowID].uuid) {
                            moveTurn(1);
                        }
                        // index returned from map is int whereas rowIndx is saved on react-table as a string
                        setData([...data.filter((element, index) => index !== Number(rowID))]);
                    }
                },
                {
                    label: 'Abort',
                }
            ]
        });
    };

    const cleanTable = () => {
        confirmAlert({
        title: <div className={css.popUpHeader}>Clean Table</div>,
            message: <div className={css.popUpBody}>
                <div>Are you sure you wish to clear this table? </div>
                <div>This can not be undone!</div>
            </div>,

            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => {
                        setData([]);
                    }
                },
                {
                    label: 'Abort',
                }
            ]
        });
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
        , [currentPlayer]);

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

    const saveEncounter = async (characters) => {
        const { filePath, canceled } = await dialog.showSaveDialog({
            title: "Save encounter",
            defaultPath: encountersPath,
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
            defaultPath: encountersPath,
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
        <>
            <div className={css.container}>
                <div className={css.buttonContainer}>
                    <Button variant="contained"
                        onClick={() => {
                            moveTurn(-1);
                        }}
                    >
                        PREV
                    </Button>
                    <Button variant="contained"
                        onClick={() => {
                            moveTurn(1);
                        }}
                    >
                        NEXT
                    </Button>
                </div>
                <Table
                    currentPlayer={currentPlayer}
                    columns={columns}
                    data={data}
                    updateMyData={updateMyData}
                    skipPageReset={skipPageReset}
                    handleContextMenu={handleContextMenu}
                />
                <div className={css.buttonContainer}>
                    <Button variant="contained"
                        onClick={() => {
                            addRow();
                        }}
                    >
                        Add Row
                    </Button>

                    <Button variant="contained" color="primary"
                        onClick={() => {
                            window.open(
                                `/battle?data=${JSON.stringify(preprocessDataForChild(data))}`,
                                "_blank",
                                "frame=false, useContentSize=true"
                            );
                        }}
                    >
                        START
                    </Button>


                    <div className={css.buttonGroup}>
                        <Button variant="contained"
                            onClick={() => {
                                saveEncounter(data);
                            }}
                        >
                            Save Encounter
                        </Button>

                        <Button variant="contained"
                            onClick={() => {
                                loadEncounter();
                            }}
                        >
                            Load Encounter
                        </Button>

                        <Button variant="contained" color="secondary"
                            onClick={cleanTable}
                        >
                            Clean Table
                        </Button>

                    </div>
                </div>
            </div>
            <Menu id={MENU_ID}>
                <Item onClick={hideCharacter}>Hide Character</Item>
                <Separator />
                <Item onClick={duplicateRow}>Duplicate Row</Item>
                <Item onClick={removeRow}>Remove Row</Item>
                <Separator />
                <Item onClick={changeVariant}>Change Variant</Item>
            </Menu>
        </>
    );
}
