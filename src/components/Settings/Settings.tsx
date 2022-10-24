import React, { useState } from 'react';
import { UserData, generateKeyAndJwt, generateJwtFromKey, generateToken, daysToTimestamp } from '../../lib';
import { readFromFile, createDownloadHref, copyText } from '../../utils';
import { ethers } from 'ethers';
import styles from './Settings.module.css';
import '../../global.css';
import { CoLinkClient } from '../../../proto_js/ColinkServiceClientPb';
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';

interface Props {
    client: CoLinkClient,
    setClient: Function,
    hostToken: string,
    setHostToken: Function,
    jwt: string,
    setJwt: Function,
    isAdmin: boolean
}

declare let window: any;

async function getUserData(method: Function, callbacks: [Function | null, Function | null], args: Array<any>) {
    await method(...args)
        .then((res: string | UserData) => {
            let setPrivateKey: Function | null = callbacks[0];
            let setJwt: Function | null = callbacks[1];
            
            // Refresh JWT
            if (typeof res === 'string') {
                if (setJwt !== null) {
                    setJwt(res);
                }
            }

            // Guest JWT
            else {
                if (setPrivateKey !== null) {
                    setPrivateKey(res.privateKey);
                }
    
                if (setJwt !== null) {
                    setJwt(res.userJwt);
                }
            }
        });
}

/* test function to simulate signing message --> will convert to metamask login */
async function signMessage(address: string | CoLinkClient, hostToken: string) {
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

export const Settings: React.FC<Props> = (props) => {
    const [privateKey, updateKey] = useState("");
    const [refreshTime, updateRefreshTime] = useState(0);
    const [guestTime, updateGuestTime] = useState(0);
    const [guestJwt, updateGuestJwt] = useState("");

    const [displayHost, toggleHost] = useState(false);
    const [displayJwt, toggleJwt] = useState(false);
    const [displayPk, togglePk] = useState(false);

    const [displayGen, toggleGen] = useState(false);

    const [triggerLogout, updateLogoutTrigger] = useState(false);

    function getServerStatus(): JSX.Element {
        return (
            <>
                <div className={styles.settingsPanel}>
                    <div className={styles.settingsHeader}>
                        <h1>Server Status</h1>
                    </div>
                    <div className={styles.settingsOptions}>
                        <h3>Server Host:</h3> 
                            {props.client.hostname_ != "" ? 
                                <span>{props.client.hostname_}</span> :
                                <span>Not Configured</span>
                            }<br />

                        {props.isAdmin ? 
                            <>
                                <h3>Host Token:</h3>
                                {props.hostToken != "" ? 
                                    <>
                                        <span>Set</span>
                                        <button
                                            onClick={() => toggleHost(!displayHost)}
                                            aria-controls="collapse"
                                            aria-expanded={displayHost}
                                        >
                                            Display
                                        </button>
                                        <button><a download="host_token.txt"
                                            href={createDownloadHref(props.hostToken)}>Download</a></button>
                                        <button onClick={() => copyText(props.hostToken)}>Copy to Clipboard</button>
                                        <Collapse in={displayHost}>
                                            <div className={styles.collapse}>
                                                {props.hostToken}
                                            </div>
                                        </Collapse><br />
                                        <button onClick={logout}>Logout</button>
                                    </> 
                                    : <span>Not Configured</span>}<br />
                            </>
                            : <></>}
                        
                        
                        
                    </div>
                </div>
            </>
        )
    }

    function getLoginConfig(): JSX.Element {
        return (
            <>
                <div className={styles.settingsPanel}>
                    <div className={styles.settingsHeader}>
                        <h1>User Actions</h1>
                    </div>
                    <div className={styles.settingsOptions}>
                        { !props.isAdmin ? 
                            <>
                                <h3>User JWT:</h3>
                                    {props.jwt != "" ? 
                                        <>
                                            <span>Set</span>
                                            <button
                                                onClick={() => toggleJwt(!displayJwt)}
                                                aria-controls="collapse"
                                                aria-expanded={displayJwt}
                                            >
                                                Display
                                            </button>
                                            <button><a download="user_jwt.txt"
                                                href={createDownloadHref(props.jwt)}>Download</a></button>
                                            <button onClick={() => copyText(props.jwt)}>Copy to Clipboard</button>
                                            <Collapse in={displayJwt}>
                                                <div className={styles.collapse}>
                                                    {props.jwt}
                                                </div>
                                            </Collapse><br />
                                            <button onClick={logout}>Logout</button>
                                        </> 
                                        : <span>Not Logged In</span>}<br />
                            </> : <></>}

                        {props.isAdmin ?
                            <>
                                <h3>Create a New JWT:</h3>
                                <button
                                    onClick={() => toggleGen(!displayGen)}
                                    aria-controls="collapse"
                                    aria-expanded={displayGen}
                                >
                                    Toggle
                                </button>
                                <Collapse in={displayGen}>
                                    <div>
                                        {generateJWTPanel()}
                                    </div>
                                </Collapse><hr />
                                <h3>Generated JWT:</h3>
                                    {props.jwt != "" ? 
                                        <>
                                            <span>Set</span>
                                            <button
                                                onClick={() => toggleJwt(!displayJwt)}
                                                aria-controls="collapse"
                                                aria-expanded={displayJwt}
                                            >
                                                Display
                                            </button>
                                            <button><a download="user_jwt.txt"
                                                href={createDownloadHref(props.jwt)}>Download</a></button>
                                            <button onClick={() => copyText(props.jwt)}>Copy to Clipboard</button>
                                            <Collapse in={displayJwt}>
                                                <div className={styles.collapse}>
                                                    {props.jwt}
                                                </div>
                                            </Collapse><br />
                                        </> 
                                        : <span>None generated</span>}
                                {privateKey != "" ?
                                    <>
                                        <h3>Private Key:</h3>
                                        <span>Set</span>
                                        <button
                                            onClick={() => togglePk(!displayPk)}
                                            aria-controls="collapse"
                                            aria-expanded={displayPk}
                                        >
                                            Display
                                        </button>
                                        <button><a download="private_key.txt"
                                            href={createDownloadHref(privateKey)}>Download</a></button>
                                        <button onClick={() => copyText(privateKey)}>Copy to Clipboard</button>
                                        <Collapse in={displayPk}>
                                            <div className={styles.collapse}>
                                                {privateKey}
                                            </div>
                                        </Collapse>
                                    </>
                            : <></>}
                            </> 
                            : <></>
                        }
                    </div>
                </div>
            </>
        )
    }

    function generateJWTPanel(): JSX.Element {
        
        return (
            <div className={styles.modal}>
                <div className={styles.UserPanel}>
                    <div className={styles.modalInner}>
                        <div className={styles.modalField}>
                            <h4>Use Pre-existing Private Key</h4>
                            <input type="file" id="selectPK" style={{display: "none"}} onChange={(e) => { 
                                readFromFile(e, updateKey); 
                                }} />
                            <button onClick={() => {
                                let element = document.getElementById('selectPK');
                                if (element !== null) {
                                    element.click();
                                }
                            }}>
                                Import PK From File
                            </button>
                            <textarea value={privateKey} onChange={(e) => { updateKey(e.target.value); }} />
                            <button onClick={() => {
                               getUserData(generateJwtFromKey, [null, props.setJwt], [props.client, privateKey, props.hostToken]);
                            }}>Generate JWT</button>
                        </div>
                        <div className={styles.modalField}>
                            <h4>Generate New Private Key + JWT</h4>
                            <button onClick={() => getUserData(generateKeyAndJwt, [updateKey, props.setJwt],
                                [props.client, props.hostToken])}>Generate JWT</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function userActions(): JSX.Element {
        return (
            <>
                {props.jwt != "" ? 
                <>
                    <div className={styles.settingsPanel}>
                        <div className={styles.settingsHeader}>
                            <h1>User Actions</h1>
                        </div>
                        <div className={styles.settingsOptions}>
                            <h3>Refresh JWT (# Days)</h3> 
                            <input type="text" value={refreshTime === 0 ? '' : refreshTime.toString()} onChange={(e) => { updateRefreshTime(parseInt(e.target.value)); }}></input>
                            <button onClick={() => getUserData(generateToken, [null, props.setJwt], 
                                [props.client, props.jwt, daysToTimestamp(refreshTime)]).then(() => updateRefreshTime(0))}>Refresh JWT</button><br />
                            <h3>Generate Guest JWT (# Days)</h3>
                            <input type="text" value={guestTime === 0 ? '' : guestTime.toString()} onChange={(e) => { updateGuestTime(parseInt(e.target.value)); }}></input>
                            <button onClick={() => getUserData(generateKeyAndJwt, [null, updateGuestJwt], 
                                [props.client, props.hostToken, daysToTimestamp(guestTime)]).then(() => updateGuestTime(0))}>Generate Guest JWT</button><br />
                            {guestJwt != "" ? <>Guest JWT: {guestJwt}</> : <></>}
                        </div>
                    </div>
                </> : <></>}
            </>
            
        )
    }

    function logout(): void {
        updateKey("");
        updateGuestJwt("");
        
        props.setClient("");
        props.setJwt("");
        props.setHostToken("");

        toggleHost(false);
        toggleJwt(false);
        togglePk(false);
        toggleGen(false);

        updateLogoutTrigger(true);
        setTimeout(() => 
        {
            updateLogoutTrigger(false);
        },
        100);
    }

    return (
        <Container>
            <div className={styles.Settings}>
                <h1>Settings</h1>
                {getServerStatus()}
                {getLoginConfig()}
                {!props.isAdmin ? userActions() : <></>}
                { triggerLogout ? <Navigate to="/" /> : <></> }
            </div>
        </Container>
        
    );
}