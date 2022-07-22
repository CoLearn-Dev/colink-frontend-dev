/* TEMPORARY FILE - will convert to npm package in the future */

import { CoreInfo, Empty, UserConsent, Jwt, GenerateTokenRequest, StorageEntry, StorageEntries, ReadKeysRequest } from '../proto/colink_pb';
import { CoLinkClient } from '../proto/ColinkServiceClientPb';
import secp256k1 from 'secp256k1';
import crypto from 'crypto';

// Required for grpc-web on SSR
global.XMLHttpRequest = require('xhr2');

/* Utility functions */
function getClient(input: string | CoLinkClient): CoLinkClient {
    if (typeof input === "string") {
        return new CoLinkClient(input);
    } else {
        return input;
    }
}

function getMetadata (jwt: string) {
    // set metadata with admin token
    let meta = {'authorization': jwt};
    return meta
}

/* Handles USER DATA (private keys, Jwts, etc) */
export class UserData {
    privateKey: string;
    userJwt: string;

    constructor(pk: string, jwt: string) {
        this.privateKey = pk;
        this.userJwt = jwt;
    }
}

export async function generateKeyAndJwt(address: string | CoLinkClient, hostToken: string,
    expirationTimestamp?: number): Promise<UserData> {
    let privateKey: string = Buffer.from(crypto.randomBytes(32)).toString('hex');
    return generateJwtFromKey(address, privateKey, hostToken, expirationTimestamp);
}

export async function generateJwtFromKey(address: string | CoLinkClient, privateKey: string, hostToken: string, 
    expirationTimestamp?: number): Promise<UserData> {
    // generate CoLinkClient connection
    let client: CoLinkClient = getClient(address);

    // set metadata with admin token
    let meta = getMetadata(hostToken);

    // generate new (pubKey, privKey) pair with privateKey
    let privKey: Uint8Array = Uint8Array.from(Buffer.from(privateKey, "hex"));
    let pubKey: Uint8Array = secp256k1.publicKeyCreate(privKey, true);

    // get timestamps
    let timestamp: number = parseInt((Date.now() / 1000).toFixed()); // Date.now() returns milliseconds, must convert to seconds
    let timeBuf: Buffer = Buffer.alloc(8);
    timeBuf.writeBigUInt64LE(BigInt(timestamp));

    let exp: number;
    if (typeof expirationTimestamp !== 'undefined') {
        exp = expirationTimestamp;
    } else {
        exp = timestamp + 86400 * 31; // 31 day expiration date by default
    }
    
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
        .then((jwt: Jwt) => {
            jwtToken = jwt.getJwt();
        })
        .catch((err: Error) => {
            alert(err);
        });

    return Promise.resolve(new UserData(privateKey, jwtToken));
}

export async function generateToken(address: string | CoLinkClient, oldJwt: string, expirationTime?: number): Promise<string> {
    // generate CoLinkClient connection
    let client: CoLinkClient = getClient(address);

    let request: GenerateTokenRequest = new GenerateTokenRequest();
    if (typeof expirationTime !== 'undefined') {
        request.setExpirationTime(expirationTime);
    } else {
        request.setExpirationTime(daysToTimestamp(31)); // 31 day default
    }
    
    let meta = getMetadata(oldJwt);

    let newJwt: string = "";
    await client.generateToken(request, meta)
        .then((jwt: Jwt) => {
            newJwt = jwt.getJwt();
        })
        .catch((err: Error) => {
            alert(err);
        });
    return Promise.resolve(newJwt);
}

export function daysToTimestamp(days: number) {
    let currentTime: number = parseInt((Date.now() / 1000).toFixed()); // convert milliseconds to seconds
    return currentTime + 86400 * days;
}

/* Handles STORAGE OPERATIONS (read, write, update, etc.) */
export function storageEntryToJSON(entry: StorageEntry){
    return {name: keyNameFromPath(entry.getKeyPath()), keyPath: entry.getKeyPath(), payload: entry.getPayload_asB64()};
}

export function keyNameFromPath(keyPath: string): string {
    const pattern = /::(.+)@/;
    let matches = keyPath.match(pattern);
    if (matches != null) {
        return matches[1];
    }
    throw Error("Error in keyPath parsing");
}

function lastKeyNameFromPath(keyPath: string) {
    const pattern = /::(.+)@/;
    let matches = keyPath.match(pattern);
    if (matches != null) {
        let match: string = matches[1];
        if (match.split(":").length == 1) {
            return match;
        }
        return match.split(":").slice(-1)[0];
    }
        
}

export async function createEntry(address: string | CoLinkClient, jwt: string, keyname: string, payload: string): Promise<StorageEntry> {
    let client: CoLinkClient = getClient(address);
    
    let request: StorageEntry = new StorageEntry();
    request.setKeyName(keyname);
    request.setPayload(payload);

    let meta = getMetadata(jwt);

    let newEntry: StorageEntry = new StorageEntry();
    await client.createEntry(request, meta)
        .then((entry: StorageEntry) => {
            newEntry = entry;
        })
        .catch(err => {
            alert(err);
        });
    return Promise.resolve(newEntry);
}

export async function readEntry(address: string | CoLinkClient, jwt: string, entry: StorageEntry): Promise<StorageEntry> {
    let client: CoLinkClient = getClient(address);
    
    let request: StorageEntries = new StorageEntries();
    request.addEntries(entry);
    let meta = getMetadata(jwt);

    let response: StorageEntry = new StorageEntry();
    await client.readEntries(request, meta)
        .then((entriesList: StorageEntries) => {
            response = entriesList.getEntriesList()[0];
        })
        .catch(err => {
            alert(err);
        });
    return Promise.resolve(response);
}

export async function updateEntry(address: string | CoLinkClient, jwt: string, oldEntry: StorageEntry, newContents: string): Promise<StorageEntry> {
    let client: CoLinkClient = getClient(address);
    
    let request: StorageEntry = new StorageEntry();
    request.setKeyName(oldEntry.getKeyName());
    request.setPayload(newContents);
    
    let meta = getMetadata(jwt);

    let response: StorageEntry = new StorageEntry();
    await client.updateEntry(request, meta)
        .then((entry: StorageEntry) => {
            response = entry;
        })
        .catch(err => {
            alert(err);
        });
    return Promise.resolve(response);
}

export async function deleteEntry(address: string | CoLinkClient, jwt: string, oldEntry: StorageEntry) {
    let client: CoLinkClient = getClient(address);
    
    let request: StorageEntry = new StorageEntry();
    request.setKeyName(keyNameFromPath(oldEntry.getKeyPath()));

    let meta = getMetadata(jwt);

    await client.deleteEntry(request, meta)
        .catch((err: Error) => {
            alert(err);
        });
}

export async function getUserStorageEntries(address: string | CoLinkClient, jwt: string) {
    let client: CoLinkClient = getClient(address);

    let encodedId: string = jwt.split(".")[1];
    let userId: string = JSON.parse(Buffer.from(encodedId, "base64").toString()).user_id;

    let entries: StorageEntry[] = []
    let meta = getMetadata(jwt);

    const updateEntries = async (prefix: string) => {
        let req: ReadKeysRequest = new ReadKeysRequest();
        req.setPrefix(prefix);
        req.setIncludeHistory(true);

        await client.readKeys(req, meta)
            .then(response => {
                let newEntries: StorageEntry[] = response.getEntriesList();
                for (let entry of newEntries) {
                    entries.push(entry);
                }
                Promise.all(newEntries.map((entry: StorageEntry) => {updateEntries(prefix + ":" + lastKeyNameFromPath(entry.getKeyPath()))}))
                    .then(() => {
                        entries.sort((a, b) => { return keyNameFromPath(a.getKeyPath()) < keyNameFromPath(b.getKeyPath()) ? -1 : 1 });
                    })
            })
            .catch(err => {
                alert(err);
            });
    }

    updateEntries(userId + ":");
    return Promise.resolve(entries);
}

