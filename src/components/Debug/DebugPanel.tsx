import React, { useState } from 'react';
import { readFromFile } from '../../utils'
import styles from './DebugPanel.module.css'

interface Props {
    hostToken: string;
    setToken: Function;
    jwt: string;
}

export const DebugPanel: React.FC<Props> = (props) => {
    return (
        <div>
            <h2>Debug Panel:</h2>
            <div className={styles.statusPanel}>
                <div className={styles.statusInner}>
                    <div className={styles.statusField}>
                        <h3>Status:</h3>
                        Host Token: {props.hostToken != "" ? <span>Set</span> : <span>Not set</span>}<br />
                        Jwt: {props.jwt != "" ? <span>Set</span> : <span>Not set</span>}
                    </div>
                    <div className={styles.statusField}>
                        <div>
                            <h3>Import Host Token:</h3>
                            <input type="file" onChange={(e) => {readFromFile(e, props.setToken);}} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )    
}