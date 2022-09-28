import React, { useEffect, useState } from 'react';
import { CoLinkClient } from '../proto_js/ColinkServiceClientPb';
import { UserPanel } from './components/User/UserPanel'
import { StoragePanel } from './components/Storage/StoragePanel'
import { Computation } from './components/Computation/Computation'
import styles from './App.module.css';
import { DebugPanel } from './components/Debug/DebugPanel';

function App(): JSX.Element {
  // reference to DDSClient (note: http://localhost:8000 connects to envoy proxy)
  const[client, setClient] = useState(new CoLinkClient(""));

  const[clientHostname, setClientHostname] = useState("");
  const[hostToken, setHostToken] = useState("");
  const[clientJwt, setClientJwt] = useState("");

  useEffect(() => {
    setClient(new CoLinkClient(clientHostname));
  }, [clientHostname]);

  return (
    <div className={styles.App}>
      <h1>CoLearn Client</h1>
      <DebugPanel clientHostname={clientHostname} setHostname={setClientHostname} 
        hostToken={hostToken} setToken={setHostToken} jwt={clientJwt}></DebugPanel>
      <UserPanel client={client} hostToken={hostToken} jwt={clientJwt} setJwt={setClientJwt}></UserPanel>
      <StoragePanel client={client} hostToken={hostToken} jwt={clientJwt}></StoragePanel>
      
      {/* Computation to be completed in fall semester */}
      {/* <Computation hostToken={hostToken} jwt={clientJwt}></Computation> */}
    </div>
  );
}

export default App;
