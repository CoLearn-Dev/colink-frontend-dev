import React, { useEffect, useState } from 'react';
import { readFromFile } from '../../utils';
import { Navigate } from 'react-router-dom';
import { validateJwtAndPrivilege, generateJwtMetaMask, generateToken, UserData } from '../../lib';
import styles from './LoginPanel.module.css';
import { ethers } from 'ethers';
import '../../global.css';
import { CoLinkClient } from '../../../proto_js/ColinkServiceClientPb';

interface Props {
    setHostname: Function,
    setJwt: Function,
    setAdminStatus: Function
}

export const LoginPanel: React.FC<Props> = (props) => {
    const [locHostname, updateLocHostname] = useState(localStorage.getItem("localHostname") || "");
    const [locJwt, updateLocJwt] = useState(""); 
    const [tryToken, updateTryToken] = useState(true);

    useEffect(() => {
        localStorage.setItem("localHostname", locHostname);
      }, [locHostname]);

    async function loginWithLocal() {
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
    }

    async function loginWithValue(jwt: string) {
        await validateJwtAndPrivilege(locHostname, jwt)
            .then((status: string) => {
                if (status !== "invalid") {
                    props.setHostname(locHostname);
                    props.setJwt(jwt);
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
    }

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
                    <input type="button" value="Connect Wallet" onClick={async () => {
                        if (tryToken) {
                            await generateToken(locHostname, "", true)
                                .then((jwt: string) => {
                                    loginWithValue(jwt);
                                })
                                .catch(async (err: Error) => {
                                    if (locJwt !== "") {
                                        await generateJwtMetaMask(locHostname, locJwt)
                                            .then((data: UserData) => {
                                                loginWithValue(data.userJwt);
                                            })
                                            .catch((err: Error) => {
                                                alert(err);
                                            })
                                    } else {
                                        alert("No MetaMask account registered: please insert a host token as the JWT, then try again to create an account.");
                                        updateTryToken(false);
                                    }
                                });
                        } else {
                            if (locJwt !== "") {
                                await generateJwtMetaMask(locHostname, locJwt)
                                    .then((data: UserData) => {
                                        updateTryToken(true);
                                        loginWithValue(data.userJwt);
                                    })
                                    .catch((err: Error) => {
                                        alert(err);
                                    })
                            } else {
                                alert("No MetaMask account registered: please insert a host token as the JWT, then try again to create an account.");
                            }
                        }
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
                    <input type="button" value="Login" onClick={loginWithLocal} />
                </div>           
            </div>
        </div>
    )    
}