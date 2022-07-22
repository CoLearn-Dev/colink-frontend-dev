import React, { useState } from 'react';
import { CoLinkClient } from '../proto/ColinkServiceClientPb';
import { UserPanel } from './components/User/UserPanel'
import { StoragePanel } from './components/Storage/StoragePanel'
import { Computation } from './components/Computation/Computation'
import styles from './App.module.css';
import { DebugPanel } from './components/Debug/DebugPanel';

// reference to DDSClient (hardcoded for now, connects to envoy proxy)
export const client = new CoLinkClient("http://localhost:8000");

function App(): JSX.Element {
  const[hostToken, setHostToken] = useState("");
  const[clientJwt, setClientJwt] = useState("");

  return (
    <div className={styles.App}>
      <h1>CoLearn Client</h1>
      <DebugPanel hostToken={hostToken} setToken={setHostToken} jwt={clientJwt}></DebugPanel>
      <UserPanel hostToken={hostToken} jwt={clientJwt} setJwt={setClientJwt}></UserPanel>
      <StoragePanel hostToken={hostToken} jwt={clientJwt}></StoragePanel>
      
      {/* Computation to be completed in fall semester */}
      {/* <Computation hostToken={hostToken} jwt={clientJwt}></Computation> */}
    </div>
  );
}

export default App;
