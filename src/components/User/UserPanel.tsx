import React, { useEffect, useState } from 'react';
import { UserData, generateKeyAndJwt, generateJwtFromKey, generateToken, daysToTimestamp } from '../../lib';
import { readFromFile, createDownloadHref } from '../../utils';
import { ethers } from 'ethers';
import styles from './UserPanel.module.css'
import { CoLinkClient } from '../../../proto/ColinkServiceClientPb';

interface Props {
    client: CoLinkClient,
    hostToken: string,
    jwt: string,
    setJwt: Function,
}

declare let window: any;

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

async function signMessage() {
    let message = "test"
    try {
        // Connect to metamask wallet
        if (!window.ethereum)
          throw new Error("No crypto wallet found. Please install it.");
    
        await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        // Sign message
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signature = await signer.signMessage(message);
        const address = await signer.getAddress();

        console.log(signature);
    
        // Verify signature (recover signer address --> public key)
        const signerAddress = await ethers.utils.verifyMessage(message, signature);
        if (signerAddress !== address) {
            alert("issue with signature")
        } else {
            console.log("signature matches")
        }

        // Verifying in rust: https://stackoverflow.com/questions/67278243/how-to-verify-the-signature-made-by-metamask-for-ethereum
        // More on EIP-712: https://eips.ethereum.org/EIPS/eip-712 

      } catch (err) {
        alert(err);
      }
}

export const UserPanel: React.FC<Props> = (props) => {
    const [privateKey, updateKey] = useState("");
    const [pkFile, updatePkFile] = useState(false);
    const [time, updateTime] = useState(0);
    const [guestJwt, updateGuestJwt] = useState("");

    useEffect(() => {
        // Only generate new Jwt by using a private key from file
        if (pkFile) {
            getUserData(generateJwtFromKey, [null, props.setJwt], [props.client, privateKey, props.hostToken]);
        }
    }, [privateKey])

    function loginPanel(): JSX.Element {
        return (
            <div>
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
                            [props.client, props.hostToken])}>Generate JWT</button>
                    </div>
                    <div className={styles.modalField}>
                        <h4>Use Pre-existing JWT</h4>
                        <input type="file" onChange={(e) => { readFromFile(e, props.setJwt) }} />
                    </div>
                </div>
                <div className={styles.modalInner}>
                    <div className={styles.modalField}></div>
                    <div className={styles.modalField}>
                        <h4>Metamask Login</h4>
                        <button onClick={() => signMessage()}>Connect Wallet</button>
                    </div>
                    <div className={styles.modalField}></div>
                </div>
            </div>
        )
    }

    function userSettings(): JSX.Element {
        return (
            <div className={styles.modalInner}>
                <div  className={styles.modalField}>
                    <h4>Refresh JWT (# Days)</h4>
                    <input type="text" onChange={(e) => { updateTime(parseInt(e.target.value)); }}></input><br /><br />
                    <button onClick={() => getUserData(generateToken, [null, props.setJwt], 
                        [props.client, props.jwt, daysToTimestamp(time)])}>Refresh JWT</button>
                </div>
                <div  className={styles.modalField}>
                    <h4>Generate Guest JWT (# Days)</h4>
                    <input type="text" onChange={(e) => { updateTime(parseInt(e.target.value)); }}></input><br /><br />
                    <button onClick={() => getUserData(generateKeyAndJwt, [null, updateGuestJwt], 
                        [props.client, props.hostToken, daysToTimestamp(time)])}>Generate Guest JWT</button>
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