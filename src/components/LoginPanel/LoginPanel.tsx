import React, { useEffect, useState } from 'react';
import { readFromFile } from '../../utils';
import { Navigate } from 'react-router-dom';
import styles from './LoginPanel.module.css';
import '../../global.css';

interface Props {
    setHostname: Function,
    setToken: Function,
    setJwt: Function,
    setAdminStatus: Function
}

export const LoginPanel: React.FC<Props> = (props) => {
    const [locHostname, updateLocHostname] = useState("");
    const [isUser, updateUserType] = useState(true);
    const [locHostToken, updateLocHostToken] = useState("");
    const [locJwt, updateLocJwt] = useState("");  

    return (
        <div className={styles.Config}>
            <div className={styles.panel}>
                <div className={styles.panelTop}>
                    <h1>Colink Server Configuration</h1>
                </div>

                {isUser ? 
                    <div className={styles.panelMid}>
                        <h3>Client Hostname:</h3> 
                        <input type="text" value={locHostname} onChange={(e) => { updateLocHostname(e.target.value); }}></input><br />
                        
                        <h3>Metamask Login:</h3>
                        <input type="button" value="Connect Wallet" onClick={() => {
                            
                        }} /><br />

                        <h3>User JWT:</h3><br />  
                        <input type="file" id="selectTokenValue" style={{display: "none"}} onChange={(e) => {readFromFile(e, updateLocJwt);}} />
                        <input type="button" value="Import Token From File" onClick={() => {
                            let element = document.getElementById('selectTokenValue');
                            if (element !== null) {
                                element.click();
                            }
                        }} />
                        <textarea value={locJwt} onChange={(e) => { updateLocJwt(e.target.value); }} />
                    </div> :
                    <div className={styles.panelMid}>
                        <h3>Client Hostname:</h3> 
                        <input type="text" value={locHostname} onChange={(e) => { updateLocHostname(e.target.value); }}></input><br />
                        
                        <h3>Host Token:</h3><br />  
                        <input type="file" id="selectTokenValue" style={{display: "none"}} onChange={(e) => {readFromFile(e, updateLocHostToken);}} />
                        <input type="button" value="Import Token From File" onClick={() => {
                            let element = document.getElementById('selectTokenValue');
                            if (element !== null) {
                                element.click();
                            }
                        }} />
                        <textarea value={locHostToken} onChange={(e) => { updateLocHostToken(e.target.value); }} />
                    </div>
                }

                <div className={styles.panelBottom}>
                    <input type="button" value="Login" onClick={()=>{
                            props.setHostname(locHostname);
                            if (isUser) {
                                props.setJwt(locJwt);
                                props.setAdminStatus(false);
                            } else {
                                props.setToken(locHostToken);
                                props.setAdminStatus(true);
                            }
                            updateLocHostname("");
                            updateLocHostToken("");
                            updateLocJwt("");
                        }} />
                </div>

                {isUser ?
                    <div className={styles.footer}>
                        <a href="javascript:void(0)" onClick={() => {updateUserType(false)}}>Login as Host</a>
                    </div>
                    :
                    <div className={styles.footer}>
                        <a href="javascript:void(0)" onClick={() => {updateUserType(true)}}>Login as Client</a>
                    </div>
                }                
            </div>
        </div>
    )    
}