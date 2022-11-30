import React, { useEffect, useState } from 'react';
import { readFromFile } from '../../utils';
import { Navigate } from 'react-router-dom';
import { validateJwtAndPrivilege } from '../../lib';
import styles from './LoginPanel.module.css';
import '../../global.css';

interface Props {
    setHostname: Function,
    setJwt: Function,
    setAdminStatus: Function
}

export const LoginPanel: React.FC<Props> = (props) => {
    const [locHostname, updateLocHostname] = useState(localStorage.getItem("localHostname") || "");
    const [locJwt, updateLocJwt] = useState("");  

    useEffect(() => {
        localStorage.setItem("localHostname", locHostname);
      }, [locHostname]);

    return (
        <div className={styles.Config}>
            <div className={styles.panel}>
                <div className={styles.panelTop}>
                    <h1>Colink Server Configuration</h1>
                </div>

                <div className={styles.panelMid}>
                    <h3>Hostname:</h3> 
                    <input type="text" value={locHostname} onChange={(e) => { updateLocHostname(e.target.value); }}></input><br />
                        
                    <h3>Metamask Login:</h3>
                    <input type="button" value="Connect Wallet" onClick={() => {
                            
                    }} /><br />

                    <h3>JWT:</h3><br />  
                    <input type="file" id="selectTokenValue" style={{display: "none"}} onChange={(e) => {readFromFile(e, updateLocJwt);}} />
                    <input type="button" value="Import Token From File" onClick={() => {
                        let element = document.getElementById('selectTokenValue');
                        if (element !== null) {
                            element.click();
                        }
                    }} />
                    <textarea value={locJwt} onChange={(e) => { updateLocJwt(e.target.value); }} />
                </div>

                <div className={styles.panelBottom}>
                    <input type="button" value="Login" onClick={async ()=>{
                            await validateJwtAndPrivilege(locHostname, locJwt)
                                .then((status: string) => {
                                    if (status !== "invalid") {
                                        props.setHostname(locHostname);
                                        props.setJwt(locJwt);
                                        if (status === "user") {
                                            props.setAdminStatus(false);
                                        } else {
                                            props.setAdminStatus(true);
                                        }
                                        updateLocJwt("");
                                    } else {
                                        alert("Error: Invalid JWT or hostname.");
                                    }
                                });
                        }} />
                </div>           
            </div>
        </div>
    )    
}