import React, { useState, useEffect } from 'react';
import { createEntry, readEntry, updateEntry, deleteEntry, getUserStorageEntries } from '../../lib';
import { keyNameFromPath, storageEntryToJSON } from '../../lib';
import { StorageEntry } from '../../../proto_js/colink_pb';
import { createDownloadHref } from '../../utils';
import styles from './StoragePanel.module.css'
import '../../global.css'
import { CoLinkClient } from '../../../proto_js/ColinkServiceClientPb';

interface Props {
    client: CoLinkClient,
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
    const [entries, updateEntries] = useState<string[]>([]);

    // Variables to select entry
    const [selectKey, updateSelected] = useState("");
    const [selectIndex, updateIndex] = useState(0);

    // Variables to display data
    const defEmpty = new StorageEntry();
    const [displayEntry, updateDisplay] = useState(defEmpty);

    useEffect(() => {
        async function getData() {
            await getUserStorageEntries(props.client, props.jwt)
                .then((entries: StorageEntry[]) => {
                    let keys: string[] = entries.map((entry: StorageEntry) => {return keyNameFromPath(entry.getKeyPath());});
                    updateEntries(keys);
                });  
        }

        if (props.jwt != "") {
            getData();
        }
    }, [props.jwt]);

    if (props.jwt == "") {
        return (<div className={styles.Storage}>JWT is not initialized</div>)
    }


    function createEntryPanel(): JSX.Element {
        return (
            <div className={styles.modalField}>
                <h3>Create Entry</h3>
                <span>Key:</span>
                <input type="text" value={key} onChange={(e) => { updateKey(e.target.value); }}></input><br />
                <span>Payload:</span>
                <textarea value={payload} onChange={(e) => { updatePayload(e.target.value); }}></textarea><br />
                <button onClick={() => {
                    createEntry(props.client, props.jwt, key, payload)
                        .then((entry: StorageEntry) => {
                            if (entry.toString() !== defEmpty.toString()) {
                                entries.push(key);
                                entries.sort();
                                updateEntries([...entries]);
                            }
                            updateKey("");
                            updatePayload("");
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
            return entries.map((keyName: string, i: number) => {
                return (<tr key={keyName}
                    onClick={() => {
                        if (selectKey === keyName) {
                            updateSelected("");
                            updateIndex(-1);
                            updateDisplay(defEmpty)
                        } else {
                            updateSelected(keyName);
                            updateIndex(i);
                            readEntry(props.client, props.jwt, keyName)
                            .then((entry: StorageEntry) => {
                                updateDisplay(entry);
                            });
                        }
                    }}>
                    <th style={keyName == selectKey ? { backgroundColor: "#DDDDDD", paddingLeft: numColons(keyName) } :
                        { paddingLeft: numColons(keyName) }}>{keyName}
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
                let currentKey = entries[selectIndex];
                updateEntry(props.client, props.jwt, currentKey, upPayload)
                    .then(() => {
                        readEntry(props.client, props.jwt, currentKey)
                            .then((entry: StorageEntry) => {
                                updateDisplay(entry);
                            })
                            .catch(err => {
                                alert(err);
                            });
                    });
                updateNewPayload("");
            }}>Update Entry</button>
        )
    }

    function deleteEntryButton(): JSX.Element {
        return (
            <button onClick={() => {
                let currentKey: string = entries[selectIndex];
                deleteEntry(props.client, props.jwt, currentKey)
                    .then(() => {
                        entries.splice(entries.indexOf(currentKey), 1);
                        updateEntries([...entries]);

                        // logic to show entry above the deleted one in the display panel
                        if (keyNameFromPath(displayEntry.getKeyPath()) === currentKey) {
                            let newIndex = Math.max(selectIndex - 1, 0);
                            updateIndex(newIndex);
                            if (entries.length > 0) {
                                let newKey = entries[newIndex];
                                updateSelected(newKey);
                                readEntry(props.client, props.jwt, newKey)
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
        <div className={styles.Storage}>
            <div className={styles.modal}>
                <div className={styles.modalInner}>
                    {createEntryPanel()}
                    <div className={styles.modalField}>
                        {createEntryList()}
                        <div className={styles.modalInners} style={{ position: "absolute", bottom: "20px" }}>
                            <textarea value={upPayload} onChange={(e) => { updateNewPayload(e.target.value); }}></textarea><br /><br />
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