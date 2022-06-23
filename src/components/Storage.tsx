import React, { useState } from 'react';
import { StorageEntry, StorageEntries, ReadKeysRequest } from '../../proto/colink_pb';
import { client } from '../App';
import styles from './Storage.module.css'

interface Props {
    adminToken: string,
    jwt: string
}

const getMetadata = (jwt: string) => {
    // set metadata with admin token
    let meta = {'authorization': jwt};
    return meta
}

const createEntry = async (keyname: string, payload: string, jwt: string, entries: Array<StorageEntry>, updateEntries: Function) => {
    keyname = keyname.trim();
    payload = payload.trim();
    
    let request: StorageEntry = new StorageEntry();
    request.setKeyName(keyname);
    request.setPayload(payload);

    let meta = getMetadata(jwt);

    await client.createEntry(request, meta)
        .then(entry => {
            entries.push(entry);
            entries.sort((a, b) => { return parseKeyName(a.getKeyPath()) < parseKeyName(b.getKeyPath()) ? -1 : 1 })
            updateEntries([...entries]);
        })
        .catch(err => {
            alert(err);
        });
}

const readEntry = async (entry: StorageEntry, jwt: string, updateDisplay: Function) => {
    let request: StorageEntries = new StorageEntries();
    
    request.addEntries(entry);
    let meta = getMetadata(jwt);

    await client.readEntries(request, meta)
        .then(entriesList => {
            let response: StorageEntry = entriesList.getEntriesList()[0];
            updateDisplay(response);
        })
        .catch(err => {
            alert(err);
        });
}

const updateEntry = async (keyname: string, newContents: string, oldEntry: StorageEntry, jwt: string) => {
    keyname = keyname.trim();
    newContents = newContents.trim();
    
    let request: StorageEntry = new StorageEntry();
    request.setKeyName(keyname);
    request.setPayload(newContents);
    
    let meta = getMetadata(jwt);

    await client.updateEntry(request, meta)
        .then(response => {
            oldEntry.setKeyPath(response.getKeyPath());
        })
        .catch(err => {
            alert(err);
        });
}

const deleteEntry = async (keyname: string, oldEntry: StorageEntry, jwt: string, entries: Array<StorageEntry>, updateEntries: Function) => {
    keyname = keyname.trim();
    
    let request: StorageEntry = new StorageEntry();
    request.setKeyName(keyname);

    let meta = getMetadata(jwt);

    await client.deleteEntry(request, meta)
        .then(response => {
            entries.splice(entries.indexOf(oldEntry), 1);
            updateEntries([...entries]);
        })
        .catch(err => {
            alert(err);
        });
}

const entryToJSON = (entry: StorageEntry) => {
    return {keyName: entry.getKeyName(), keyPath: entry.getKeyPath(), payload: entry.getPayload_asB64()}
}

const parseKeyName = (keyPath: string) => {
    const pattern = /::(.+)@/;
    let matches = keyPath.match(pattern);
    if (matches != null)
        return matches[1];
    throw Error("Error in keyPath parsing");
}

const lastKeyName = (keyPath: string) => {
    const pattern = /::(.+)@/;
    let matches = keyPath.match(pattern);
    if (matches != null) {
        let match: string = matches[1];
        if (match.split(":").length == 1) {
            return match;
        }
        return match.split(":").slice(-1)[0];
    }
        
}

const getLink = (contents: string) => {
    let data: Blob = new Blob([contents], { type: 'text/plain' });
    let dataLink = window.URL.createObjectURL(data);
    
    return dataLink;
}

const numColons = (str: string) => {
    let numInstance: number = (str.split(":").length - 1);
    let padding = (numInstance * 20 + 5).toString() + "px"
    return padding;
}

const getUserEntries = async (jwt: string, cb: Function) => {
    let encodedId: string = jwt.split(".")[1];
    let userId: string = JSON.parse(Buffer.from(encodedId, "base64").toString()).user_id;

    let entries: StorageEntry[] = []
    let meta = getMetadata(jwt);

    const updateEntries = async (prefix: string) => {
        let req: ReadKeysRequest = new ReadKeysRequest();
        req.setPrefix(prefix);
        req.setIncludeHistory(true);

        await client.readKeys(req, meta)
            .then(response => {
                let newEntries: StorageEntry[] = response.getEntriesList();
                for (let entry of newEntries) {
                    entries.push(entry);
                }
                Promise.all(newEntries.map((entry: StorageEntry) => {updateEntries(prefix + ":" + lastKeyName(entry.getKeyPath()))}))
                    .then(() => {
                        entries.sort((a, b) => { return parseKeyName(a.getKeyPath()) < parseKeyName(b.getKeyPath()) ? -1 : 1 });
                        cb([...entries]);
                    })
            })
            .catch(err => {
                alert(err);
            });
    }

    updateEntries(userId + ":")
}

export const Storage: React.FC<Props> = (props) => {
    // Variables to initialize entries
    const[hasInit, updateInit] = useState(false);
    
    // Variables to create new entries
    const[key, updateKey] = useState("");
    const[payload, updatePayload] = useState("");
    const[upPayload, updateUpPayload] = useState("");
    const[entries, updateEntries] = useState<StorageEntry[]>([]);

    // Variables to select entry
    const[selectKey, updateSelected] = useState("");
    const[selectIndex, updateIndex] = useState(0);

    // Variables to display data
    const defEmpty = new StorageEntry();
    const[displayEntry, updateDisplay] = useState(defEmpty);

    if (props.jwt == "") {
        return (<div></div>)
    }

    if (entries.length == 0 && !hasInit) {
        getUserEntries(props.jwt, updateEntries);
        updateInit(true);
    }

    return (
        <div>
            <h2>Storage:</h2>
            <div className={styles.modal}>
                <div className={styles.modalInner}>
                    <div className={styles.modalField}>
                        <div>
                            <h3>Create Entry</h3>
                            <span>Key:    </span>
                            <input type="text" onChange={(e) => {updateKey(e.target.value);}}></input><br /><br />
                            <span>Payload:    </span><br /><br />
                            <textarea onChange={(e) => {updatePayload(e.target.value);}}></textarea><br /><br />
                            <button onClick={() => {
                                createEntry(key, payload, props.jwt, entries, updateEntries);
                                }}>Create Entry</button><br></br>
                        </div>
                    </div>
                    <div className={styles.modalField}>
                        <h3>Entry List</h3>
                        Selected Key: {selectKey}
                        {/* <button onClick={() => readEntry(entries[selectIndex], props.jwt, updateDisplay)}>Read Entry</button> <br></br> */}
                        <div className={styles.tableDisplay}>
                            <table style={entries.length > 0 ? {border: "1px solid black"} : {}}>
                                <tbody>
                                    {entries.map((entry: StorageEntry, index: number) => {
                                        let fragment = parseKeyName(entry.getKeyPath());
                                        return (<tr key={fragment} 
                                                    onClick={() => {
                                                        updateSelected(fragment);
                                                        updateIndex(index);
                                                        readEntry(entries[index], props.jwt, updateDisplay);
                                                    }}><th style={fragment == selectKey ? {backgroundColor: "#DDDDDD", paddingLeft: numColons(fragment)} : {paddingLeft: numColons(fragment)}}>{fragment}</th></tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div style={{position: "absolute", bottom: "20px"}}>
                            <textarea onChange={(e) => {updateUpPayload(e.target.value);}}></textarea><br /><br />
                            <div className={styles.buttonGroup}>
                                <button onClick={() => {
                                        updateEntry(selectKey, upPayload, entries[selectIndex], props.jwt)
                                            .then(() => {
                                                if (parseKeyName(displayEntry.getKeyPath()) === parseKeyName(entries[selectIndex].getKeyPath())) {
                                                    readEntry(entries[selectIndex], props.jwt, updateDisplay);
                                                }
                                            });
                                    }}>Update Entry</button>
                                <button onClick={() => {
                                        let oldEntry = entries[selectIndex];
                                        deleteEntry(selectKey, oldEntry, props.jwt, entries, updateEntries)
                                            .then(() => {
                                                if (parseKeyName(displayEntry.getKeyPath()) === parseKeyName(oldEntry.getKeyPath())) {
                                                    let newIndex = Math.max(selectIndex - 1, 0);
                                                    updateIndex(newIndex);
                                                    if (entries.length > 0) {
                                                        updateSelected(parseKeyName(entries[newIndex].getKeyPath()));
                                                        readEntry(entries[newIndex], props.jwt, updateDisplay);
                                                    }
                                                    else {
                                                        updateDisplay(defEmpty);
                                                        updateSelected("")
                                                    }
                                                }
                                            });
                                    }}>Delete Entry</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.modalField}>
                        <h3>Entry Info</h3>
                        <div className={styles.innerDisplay}>
                            {displayEntry.getPayload().length === 0 ?
                                <div></div> :
                                <div className={styles.innerInfo}>
                                    <div style={{whiteSpace: "pre-wrap", textAlign: "left", overflowWrap: "break-word", width: "100%"}}>{JSON.stringify(entryToJSON(displayEntry), null, 2)}</div><br></br>
                                </div>}
                        </div>
                        <button><a download="payload.txt" href={getLink(JSON.stringify(entryToJSON(displayEntry), null, 2))}>Download</a></button>
                    </div>
                </div>
            </div>
        </div>
    )
}