import React, { useState } from 'react';
import { CoreInfo, Empty, UserConsent, Jwt } from '../../proto/colink_pb';
import secp256k1 from 'secp256k1';
import crypto from 'crypto';
import { client } from '../App';
import styles from './Login.module.css'

interface Props {
    adminToken: string,
    jwtSetter: Function,
}

const generateNewJWT = async (adminToken: string) => {
    // generate new secp256k1 private key
    let privKeyStr: string = Buffer.from(crypto.randomBytes(32)).toString('hex');

    return generateJWT(privKeyStr, adminToken);
}

const generateJWT = async (privKeyStr: string, adminToken: string) => {
    // set metadata with admin token
    let meta = {'authorization': adminToken};

    // generate new (pubKey, privKey) pair with privKeyStr
    let privKey: Uint8Array = Uint8Array.from(Buffer.from(privKeyStr, "hex"));
    let pubKey: Uint8Array = secp256k1.publicKeyCreate(privKey, true);

    // get timestamps
    let timestamp: number = parseInt((Date.now() / 1000).toFixed()); // Date.now() returns milliseconds, must convert to seconds
    let timeBuf: Buffer = Buffer.alloc(8);
    timeBuf.writeBigUInt64LE(BigInt(timestamp));
    
    let exp: number = timestamp + 86400 * 31; // 31 day expiration date by default
    let expBuf: Buffer = Buffer.alloc(8);
    expBuf.writeBigUInt64LE(BigInt(exp));
    
    // get core public key
    let coreReq: Empty = new Empty();
    let response: CoreInfo = await client.requestCoreInfo(coreReq, meta);
    let corePubKey: Uint8Array = response.getCorePublicKey_asU8();

    // prep signature + request
    let msg: Buffer = Buffer.concat([pubKey, timeBuf, expBuf, corePubKey]);
    let hash = crypto.createHash('sha256').update(msg).digest('hex');
    let signature: Uint8Array = secp256k1.ecdsaSign(Buffer.from(hash, 'hex'), privKey).signature;

    let request: UserConsent = new UserConsent();
    request.setPublicKey(pubKey);
    request.setSignatureTimestamp(timestamp);
    request.setSignature(signature);
    request.setExpirationTimestamp(exp);
    
    // initiate jwt request
    let jwtToken: string = "";
    await client.importUser(request, meta)
        .then(jwt => {
            jwtToken = jwt.getJwt();
        })
        .catch(err => {
            alert(err);
        });

    return Promise.resolve([privKeyStr, jwtToken]);
}

const getExistingJWT = async (e: any, cb: Function, cb2: Function) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
        if (e == null || e.target == null) {
            return;
        }
        const text = (e.target.result)
        if (text != null) {
            let jwt = text.toString();
            cb(jwt);
            cb2(jwt);
        }
    };
    reader.readAsText(e.target.files[0]);
}

const getLink = (contents: string) => {
    let data: Blob = new Blob([contents], { type: 'text/plain' });
    let dataLink = window.URL.createObjectURL(data);
    
    return dataLink;
}

export const Login: React.FC<Props> = (props) => {
    const[privateKey, updateKey] = useState("");
    const[localJwt, updateJwt] = useState("");
    const[displayState, setDisplayState] = useState(true);

    const changeDisplay = () => {
        setDisplayState(!displayState);
    }

    const displayLoginScreen = () => {
        if (displayState) {
            
            const displayInfo = () => {
                if (localJwt != "") {
                    return (
                        <div className={styles.modalField}>
                            <h4>Credentials:</h4>
                            <div className={styles.innerDisplay}>
                                {privateKey == "" ? <span></span> : <span>Private Key: {privateKey}</span>} <br /><br />
                                {localJwt == "" ? <span></span> : <span>Client JWT: {localJwt}</span>}
                            </div>
                            <div className={styles.buttonGroup}>
                                {privateKey == "" ? <span></span> :  <button><a download="private_key.txt" href={getLink(privateKey)}>Download PK</a></button>}
                                {localJwt == "" ? <span></span> :  <button><a download="user_JWT.txt" href={getLink(localJwt)}>Download JWT</a></button>}
                            </div>
                        </div>
                    );
                }
            }

            const getJWT = async () => {
                await generateJWT(privateKey, props.adminToken)
                    .then(res => {
                        updateKey(res[0]);
                        updateJwt(res[1]);
                        props.jwtSetter(res[1]);
                    });
            }

            const getNewJWT = async () => {
                await generateNewJWT(props.adminToken)
                    .then(res => {
                        updateKey(res[0]);
                        updateJwt(res[1]);
                        props.jwtSetter(res[1]);
                    });
            }
    
            return (
                <div className={styles.modal}>
                    <div className={styles.modalInner}>
                        <div className={styles.modalField}>
                            <div>
                                <h4>Use Pre-existing Private Key</h4>
                                <span>Private Key:     </span>
                                <input type="text" onChange={(e) => {updateKey(e.target.value);}}></input><br /><br />
                                <button onClick={() => getJWT()}>Generate JWT</button>
                            </div>
                            <div>
                                <h4>Generate New Private Key + JWT</h4>
                                <button onClick={() => getNewJWT()}>Generate JWT</button>
                            </div>
                            <div>
                                <h4>Use Pre-existing JWT</h4>
                                <input type="file" onChange={(e) => {getExistingJWT(e, updateJwt, props.jwtSetter)}} /><br /><br />
                            </div>
                        </div>
                        {displayInfo()}
                    </div>
                    <button onClick={() => {changeDisplay()}}>Close</button>
                </div>
            );
        } else {
            return <button onClick={() => {changeDisplay()}}>Generate New JWT</button>;
        }
    }

    return (
        <div className="wrapper">
            <h2>User Login:</h2>
            {displayLoginScreen()}
        </div>
    )
}