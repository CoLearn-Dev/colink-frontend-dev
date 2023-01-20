import React, { useState, useEffect } from 'react';
import { createEntry, keyNameFromPath, lastKeyNameFromPath, readEntry, updateEntry, deleteEntry, getUserStorageEntries } from '../../lib';
import { storageEntryToJSON } from '../../lib';
import { StorageEntry } from '../../../proto_js/colink_pb';
import { createDownloadHref } from '../../utils';
import styles from './StoragePanel.module.css';
import '../../global.css';
import { CoLinkClient } from '../../../proto_js/ColinkServiceClientPb';

import Container from 'react-bootstrap/Container';

interface Props {
    client: CoLinkClient,
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
    const [isString, updateB64] = useState(true);

    useEffect(() => {
        async function getData() {
            await getUserStorageEntries(props.client, props.jwt)
                .then((entries: StorageEntry[]) => {
                    let paths: string[] = entries.map((entry: StorageEntry) => {return entry.getKeyPath();});
                    updateEntries([...paths]);
                });  
            return true; // resolve lingering promises
        }

        if (props.jwt != "" && props.client.hostname_ != "") {
            getData();
        }
    }, [props.jwt, props.client]);

    if (props.jwt == "") {
        return (
            <Container>
                <div className={styles.Storage}>JWT is not initialized</div>
            </Container>
        )
    }

    function createEntryPanel(): JSX.Element {
        return (
            <div className={styles.modalFieldSmall}>
                <h3>Create Entry</h3>
                <span>Key:</span>
                <input type="text" value={key} onChange={(e) => { updateKey(e.target.value); }}></input><br />
                <span>Payload:</span>
                <textarea value={payload} onChange={(e) => { updatePayload(e.target.value); }}></textarea><br />
                <button onClick={() => {
                    createEntry(props.client, props.jwt, key, payload)
                        .then((entry: StorageEntry) => {
                            entries.push(entry.getKeyPath())
                            updateEntries([...entries]);
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

        function isEnd(path: string) {
            return path.slice(-2) !== "@0";
        }

        function entryTableMap(): JSX.Element[] {
            return entries.map((path: string, i: number) => {
                let keyName = keyNameFromPath(path);
                let displayName = lastKeyNameFromPath(path);
                if (!isEnd(path)) {
                    displayName = "* " + displayName;
                }
                return (<tr key={i}
                    onClick={async () => {
                        console.log(path)
                        if (selectKey === keyName) {
                            updateIndex(-1);
                            if (isEnd(path)) {
                                updateDisplay(defEmpty)
                                updateSelected("");
                            } else {
                                if (typeof entries.find(item => { return item.includes(path.substring(0, path.indexOf("@"))) && item !== path}) === "undefined") {
                                    await getUserStorageEntries(props.client, props.jwt, path.substring(0, path.indexOf("@")))
                                    .then((newEntries: StorageEntry[]) => {
                                        let insertIndex = entries.indexOf(path) + 1;
                                        entries.splice(insertIndex, 0, ...newEntries.map((entry: StorageEntry) => {return entry.getKeyPath();}))
                                        updateEntries([...entries]);
                                    });  
                                } else {
                                    let newEntries: string[] = entries.filter(item => { return !item.includes(path.substring(0, path.indexOf("@"))) || item === path})
                                    console.log(newEntries)
                                    updateEntries([...newEntries])
                                }
                            }
                        } else {
                            updateSelected(keyName);
                            updateIndex(i);
                            if (isEnd(path)) {
                                readEntry(props.client, props.jwt, keyName)
                                    .then((entry: StorageEntry) => {
                                        updateDisplay(entry);
                                    });
                            } else {
                                if (typeof entries.find(item => { return item.includes(path.substring(0, path.indexOf("@"))) && item !== path}) === "undefined") {
                                    await getUserStorageEntries(props.client, props.jwt, path.substring(0, path.indexOf("@")))
                                    .then((newEntries: StorageEntry[]) => {
                                        let insertIndex = entries.indexOf(path) + 1;
                                        entries.splice(insertIndex, 0, ...newEntries.map((entry: StorageEntry) => {return entry.getKeyPath();}))
                                        updateEntries([...entries]);
                                    });  
                                } else {
                                    let newEntries: string[] = entries.filter(item => { return !item.includes(path.substring(0, path.indexOf("@"))) || item === path})
                                    updateEntries([...newEntries])
                                }
                            }
                        }
                    }}>
                    <th style={keyName == selectKey ? { backgroundColor: "#DDDDDD", paddingLeft: numColons(keyName) } :
                        { paddingLeft: numColons(keyNameFromPath(path)) }}>{displayName}
                    </th>
                </tr>)
            })
        }

        return (
            <>
                <h3>Entry List</h3>
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
                let currentPath: string = entries[selectIndex];
                deleteEntry(props.client, props.jwt, new StorageEntry().setKeyPath(currentPath))
                    .then(() => {
                        entries.splice(selectIndex, 1);
                        updateEntries([...entries]);

                        // logic to show entry above the deleted one in the display panel
                        // if (displayEntry.getKeyName() === keyNameFromPath(currentPath)) {
                        //     let newIndex = Math.max(selectIndex - 1, 0);
                        //     updateIndex(newIndex);
                        //     if (entries.length > 0) {
                        //         let newKey = entries[newIndex];
                        //         updateSelected(newKey);
                        //         readEntry(props.client, props.jwt, newKey)
                        //             .then(response => {
                        //                 updateDisplay(response);
                        //             })
                        //             .catch(err => {
                        //                 alert(err);
                        //             });
                        //     }
                        //     else {
                        //         updateDisplay(defEmpty);
                        //         updateSelected("")
                        //     }
                        // }
                    });
            }}>Delete Entry</button>
        )
    }

    function downloadEntryPanel(): JSX.Element {
        return (
            <>
                <h3>Entry Info</h3>
                { isString ? <>Downloading as String</> : <>Downloading as Bytes</> }  
                <button style={{ display: "inline-block" }} onClick={() => {updateB64(!isString)}}>Toggle</button><br />
                <div className={styles.innerDisplay}>
                    {displayEntry.toString() === defEmpty.toString() ?
                        <div></div> :
                        <>
                            <div className={styles.innerInfo}>
                                <div style={{ whiteSpace: "pre-wrap", textAlign: "left", overflowWrap: "break-word", width: "100%" }}>
                                    {JSON.stringify(storageEntryToJSON(displayEntry, isString), null, 2)}
                                </div>
                            </div><br />
                            <button>
                                <a download="payload.txt"
                                    href={createDownloadHref(JSON.stringify(storageEntryToJSON(displayEntry, isString), null, 2))}>Download
                                </a>
                            </button>
                        </>            
                        }
                </div>
            </>
        )

    }

    return (
        <Container>
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
        </Container>
    )
}