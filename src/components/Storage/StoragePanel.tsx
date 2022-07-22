import React, { useState, useEffect } from 'react';
import { client } from '../../App';
import { createEntry, readEntry, updateEntry, deleteEntry, getUserStorageEntries } from '../../lib';
import { keyNameFromPath, storageEntryToJSON } from '../../lib';
import { StorageEntry, StorageEntries, ReadKeysRequest } from '../../../proto/colink_pb';
import { readFromFile, createDownloadHref } from '../../utils';
import styles from './StoragePanel.module.css'

interface Props {
    hostToken: string,
    jwt: string
}

const numColons = (str: string) => {
    let numInstance: number = (str.split(":").length - 1);
    let padding = (numInstance * 20 + 5).toString() + "px"
    return padding;
}

export const StoragePanel: React.FC<Props> = (props) => {
    // Variables to create new entries
    const [key, updateKey] = useState("");
    const [payload, updatePayload] = useState("");
    const [upPayload, updateNewPayload] = useState("");
    const [entries, updateEntries] = useState<StorageEntry[]>([]);

    // Variables to select entry
    const [selectKey, updateSelected] = useState("");
    const [selectIndex, updateIndex] = useState(0);

    // Variables to display data
    const defEmpty = new StorageEntry();
    const [displayEntry, updateDisplay] = useState(defEmpty);

    useEffect(() => {
        async function getData() {
            let entryList: StorageEntry[] = await getUserStorageEntries(client, props.jwt);
            updateEntries(entryList);
        }

        if (props.jwt != "") {
            getData();
        }
    }, [props.jwt]);

    if (props.jwt == "") {
        return (<div></div>)
    }


    function createEntryPanel(): JSX.Element {
        return (
            <div className={styles.modalField}>
                <h3>Create Entry</h3>
                <span>Key:</span>
                <input type="text" onChange={(e) => { updateKey(e.target.value); }}></input><br />
                <span>Payload:</span>
                <textarea onChange={(e) => { updatePayload(e.target.value); }}></textarea><br />
                <button onClick={() => {
                    createEntry(client, props.jwt, key, payload)
                        .then((entry: StorageEntry) => {
                            if (entry.toString() !== defEmpty.toString()) {
                                entries.push(entry);
                                entries.sort((a, b) => { return keyNameFromPath(a.getKeyPath()) < keyNameFromPath(b.getKeyPath()) ? -1 : 1 })
                                updateEntries([...entries]);
                            }
                        })
                        .catch(err => {
                            alert(err);
                        });
                }}>Create Entry</button>
            </div>
        );
    }

    function createEntryList(): JSX.Element {

        function entryTableMap(): JSX.Element[] {
            return entries.map((entry: StorageEntry, i: number) => {
                let fragment = keyNameFromPath(entry.getKeyPath());
                return (<tr key={fragment}
                    onClick={() => {
                        updateSelected(fragment);
                        updateIndex(i);
                        readEntry(client, props.jwt, entry)
                            .then((entry: StorageEntry) => {
                                updateDisplay(entry);
                            });
                    }}>
                    <th style={fragment == selectKey ? { backgroundColor: "#DDDDDD", paddingLeft: numColons(fragment) } :
                        { paddingLeft: numColons(fragment) }}>{fragment}
                    </th>
                </tr>)
            })
        }

        return (
            <>
                <h3>Entry List</h3>
                Selected Key: {selectKey}
                <div className={styles.tableDisplay}>
                    <table style={entries.length > 0 ? { border: "1px solid black" } : {}}>
                        <tbody>
                            {entryTableMap()}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

    function updateEntryButton(): JSX.Element {
        return (
            <button onClick={() => {
                updateEntry(client, props.jwt, entries[selectIndex], upPayload)
                    .then((response: StorageEntry) => {
                        if (keyNameFromPath(displayEntry.getKeyPath()) === keyNameFromPath(entries[selectIndex].getKeyPath())) {
                            readEntry(client, props.jwt, entries[selectIndex])
                                .then(response => {
                                    updateDisplay(response);
                                })
                                .catch(err => {
                                    alert(err);
                                });
                        }
                    });
            }}>Update Entry</button>
        )
    }

    function deleteEntryButton(): JSX.Element {
        return (
            <button onClick={() => {
                let oldEntry = entries[selectIndex];
                deleteEntry(client, props.jwt, oldEntry)
                    .then(() => {
                        entries.splice(entries.indexOf(oldEntry), 1);
                        updateEntries([...entries]);

                        // logic to show entry above the deleted one in the display panel
                        if (keyNameFromPath(displayEntry.getKeyPath()) === keyNameFromPath(oldEntry.getKeyPath())) {
                            let newIndex = Math.max(selectIndex - 1, 0);
                            updateIndex(newIndex);
                            if (entries.length > 0) {
                                updateSelected(keyNameFromPath(entries[newIndex].getKeyPath()));
                                readEntry(client, props.jwt, entries[selectIndex])
                                    .then(response => {
                                        updateDisplay(response);
                                    })
                                    .catch(err => {
                                        alert(err);
                                    });
                            }
                            else {
                                updateDisplay(defEmpty);
                                updateSelected("")
                            }
                        }
                    });
            }}>Delete Entry</button>
        )
    }

    function downloadEntryPanel(): JSX.Element {
        return (
            <>
                <h3>Entry Info</h3>
                <div className={styles.innerDisplay}>
                    {displayEntry.toString() === defEmpty.toString() ?
                        <div></div> :
                        <div className={styles.innerInfo}>
                            <div style={{ whiteSpace: "pre-wrap", textAlign: "left", overflowWrap: "break-word", width: "100%" }}>
                                {JSON.stringify(storageEntryToJSON(displayEntry), null, 2)}
                            </div>
                            <button>
                                <a download="payload.txt"
                                    href={createDownloadHref(JSON.stringify(storageEntryToJSON(displayEntry), null, 2))}>Download
                                </a>
                            </button>
                        </div>}
                </div>
            </>
        )

    }

    return (
        <div>
            <h2>Storage:</h2>
            <div className={styles.modal}>
                <div className={styles.modalInner}>
                    {createEntryPanel()}
                    <div className={styles.modalField}>
                        {createEntryList()}
                        <div style={{ position: "absolute", bottom: "20px" }}>
                            <textarea onChange={(e) => { updateNewPayload(e.target.value); }}></textarea><br /><br />
                            <div className={styles.buttonGroup}>
                                {updateEntryButton()}
                                {deleteEntryButton()}
                            </div>
                        </div>
                    </div>
                    <div className={styles.modalField}>
                        {downloadEntryPanel()}
                    </div>
                </div>
            </div>
        </div>
    )
}