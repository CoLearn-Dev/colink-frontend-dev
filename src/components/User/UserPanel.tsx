import React, { useEffect, useState } from 'react';
import { UserData, generateKeyAndJwt, generateJwtFromKey, generateToken, daysToTimestamp } from 'colink-sdk-test';
import { readFromFile, createDownloadHref } from '../../utils';
import { client } from '../../App';
import styles from './UserPanel.module.css'

interface Props {
    hostToken: string,
    jwt: string,
    setJwt: Function,
}

async function getUserData(method: Function, callbacks: [Function | null, Function | null], args: Array<any>) {
    await method(...args)
        .then((res: UserData) => {
            let setPrivateKey: Function | null = callbacks[0];
            let setJwt: Function | null = callbacks[1];

            if (setPrivateKey !== null) {
                setPrivateKey(res.privateKey);
            }

            if (setJwt !== null) {
                setJwt(res.userJwt);
            }
        });
}

export const UserPanel: React.FC<Props> = (props) => {
    const [privateKey, updateKey] = useState("");
    const [pkFile, updatePkFile] = useState(false);
    const [time, updateTime] = useState(0);
    const [guestJwt, updateGuestJwt] = useState("");

    useEffect(() => {
        // Only generate new Jwt by using a private key from file
        if (pkFile) {
            getUserData(generateJwtFromKey, [null, props.setJwt], [client, privateKey, props.hostToken]);
        }
    }, [privateKey])

    function loginPanel(): JSX.Element {
        return (
            <div className={styles.modalInner}>
                <div className={styles.modalField}>
                    <h4>Use Pre-existing Private Key</h4>
                    <input type="file" onChange={(e) => { 
                        updatePkFile(true);
                        readFromFile(e, updateKey); 
                        }} />
                </div>
                <div className={styles.modalField}>
                    <h4>Generate New Private Key + JWT</h4>
                    <button onClick={() => getUserData(generateKeyAndJwt, [updateKey, props.setJwt],
                        [client, props.hostToken])}>Generate JWT</button>
                </div>
                <div className={styles.modalField}>
                    <h4>Use Pre-existing JWT</h4>
                    <input type="file" onChange={(e) => { readFromFile(e, props.setJwt) }} />
                </div>
            </div>
        )
    }

    function userSettings(): JSX.Element {
        return (
            <div>
                <div>
                    <h4>Refresh JWT (# Days)</h4>
                    <input type="text" onChange={(e) => { updateTime(parseInt(e.target.value)); }}></input><br /><br />
                    <button onClick={() => getUserData(generateToken, [null, props.setJwt], 
                        [client, props.jwt, daysToTimestamp(time)])}>Refresh JWT</button>
                </div>
                <div>
                    <h4>Generate Guest JWT (# Days)</h4>
                    <input type="text" onChange={(e) => { updateTime(parseInt(e.target.value)); }}></input><br /><br />
                    <button onClick={() => getUserData(generateKeyAndJwt, [null, updateGuestJwt], 
                        [client, props.hostToken, daysToTimestamp(time)])}>Generate Guest JWT</button>
                </div>
            </div>
        )
    }

    function displayInfo(): JSX.Element {
        return (
            <div>
                <h4>Credentials:</h4>
                <div className={styles.modalInner}>
                    <div className={styles.innerDisplay}>
                        <div>{privateKey == "" ? <span></span> : <span>Private Key: {privateKey}</span>}</div>
                        <div>{props.jwt == "" ? <span></span> : <span>Client JWT: {props.jwt}</span>}</div>
                        <div>{guestJwt == "" ? <span></span> : <span>Guest JWT: {guestJwt}</span>}</div>
                        <div className={styles.buttonGroup}>
                            {privateKey == "" ? <span></span> : <button><a download="private_key.txt"
                                href={createDownloadHref(privateKey)}>Download PK</a></button>}
                            {props.jwt == "" ? <span></span> : <button><a download="user_JWT.txt"
                                href={createDownloadHref(props.jwt)}>Download User JWT</a></button>}
                            {guestJwt == "" ? <span></span> : <button><a download="guest_JWT.txt"
                                href={createDownloadHref(guestJwt)}>Download Guest JWT</a></button>} 
                        </div>
                    </div>
                </div>
                <button onClick={() => logout()}>Logout</button>
            </div>
        );
    }

    function logout(): void {
        updateKey("");
        updatePkFile(false);
        updateGuestJwt("");
        props.setJwt("");
    }

    return (
        <div>
            <h2>Login:</h2>
            <div className={styles.modal}>
                {props.jwt == "" ? 
                    loginPanel() : 
                    <div>
                        {displayInfo()}<br />
                        {userSettings()}
                    </div>
                    }
            </div>
        </div>
    );
}