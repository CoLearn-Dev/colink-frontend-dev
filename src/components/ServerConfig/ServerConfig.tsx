import React, { useState } from 'react';
import { readFromFile } from '../../utils'
import styles from './ServerConfig.module.css'
import '../../global.css'

interface Props {
    clientHostname: string,
    setHostname: Function,
    hostToken: string,
    setToken: Function,
}

export const ServerConfig: React.FC<Props> = (props) => {
    const [locHostname, updateLocHostname] = useState("");
    const [locHostToken, updateLocHostToken] = useState("");
    

    return (
        <div className={styles.Config}>
            <div className={styles.panel}>
                <div className={styles.panelTop}>
                    <h1>Colink Server Configuration</h1>
                </div>

                <div className={styles.panelMid}>
                    <h3>Client Hostname:</h3> 
                    <input type="text" value={locHostname} onChange={(e) => { updateLocHostname(e.target.value); }}></input>
                    
                    <h3>Host Token:</h3><br />  
                    <textarea value={locHostToken} onChange={(e) => { updateLocHostToken(e.target.value); }} />
                    <input type="file" id="selectTokenValue" style={{display: "none"}} onChange={(e) => {readFromFile(e, updateLocHostToken);}} />
                    <input type="button" value="Import Token From File" onClick={() => {
                        let element = document.getElementById('selectTokenValue');
                        if (element !== null) {
                            element.click();
                        }
                    }} />
                </div>

                <div className={styles.panelBottom}>
                    <input type="button" value="Confirm Configuration" onClick={()=>{
                            props.setHostname(locHostname);
                            props.setToken(locHostToken);
                            updateLocHostname("");
                            updateLocHostToken("");
                        }} />
                </div>
            </div>
        </div>
    )    
}