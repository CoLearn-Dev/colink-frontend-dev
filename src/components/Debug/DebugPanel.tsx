import React, { useState } from 'react';
import { readFromFile } from '../../utils'
import styles from './DebugPanel.module.css'

interface Props {
    clientHostname: string,
    setHostname: Function,
    hostToken: string,
    setToken: Function,
    jwt: string,
}

export const DebugPanel: React.FC<Props> = (props) => {
    const [locHostname, updateLocHostname] = useState("");
    const [locHostToken, updateLocHostToken] = useState("");

    return (
        <div>
            <h2>Debug Panel:</h2>
            <div className={styles.statusPanel}>
                <div className={styles.statusInner}>
                    <div className={styles.statusField}>
                        <h3>Status:</h3>
                        Client: {props.clientHostname != "" ? props.clientHostname : <span>Not Set</span>}<br />
                        Host Token: {props.hostToken != "" ? <span>Set</span> : <span>Not Set</span>}<br />
                        Jwt: {props.jwt != "" ? <span>Set</span> : <span>Not Set</span>}
                    </div>
                    <div className={styles.statusField}>
                        <div>
                            <h3>Client Hostname:</h3>
                            <input type="text" onChange={(e) => { updateLocHostname(e.target.value); }}></input><br />
                            <h3>Host Token:</h3>
                            <input type="file" onChange={(e) => {readFromFile(e, updateLocHostToken);}} /><br /><br />
                            <button onClick={()=>{
                                props.setHostname(locHostname);
                                props.setToken(locHostToken);
                            }}>Update Client</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )    
}