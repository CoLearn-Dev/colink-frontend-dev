import React, { useEffect, useState } from 'react';
import { CoLinkClient } from '../proto_js/ColinkServiceClientPb';
import { Layout } from './components/Layout/Layout'
import { ServerConfig } from './components/ServerConfig/ServerConfig'
import { StoragePanel } from './components/Storage/StoragePanel'
import { Computation } from './components/Computation/Computation'
import { Settings } from './components/Settings/Settings'
import styles from './App.module.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App(): JSX.Element {
  // reference to DDSClient (note: http://localhost:8000 connects to envoy proxy)
  const[client, setClient] = useState(new CoLinkClient(""));

  const[clientHostname, setClientHostname] = useState("");
  const[hostToken, setHostToken] = useState("");
  const[clientJwt, setClientJwt] = useState("");

  useEffect(() => {
    setClient(new CoLinkClient(clientHostname));
  }, [clientHostname]);

  function clientInitialized(): boolean {
    return clientHostname !== "" && hostToken !== "";
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout />
          }>
            <Route index element={
              <>{clientInitialized() ? 
                <Navigate to="/settings" /> : 
                <ServerConfig clientHostname={clientHostname} setHostname={setClientHostname} hostToken={hostToken} setToken={setHostToken} />}
              </>
            } />
            <Route path="settings" element={<Settings client={client} hostToken={hostToken} jwt={clientJwt} setJwt={setClientJwt} />}></Route>
            <Route path="storage" element={<StoragePanel client={client} hostToken={hostToken} jwt={clientJwt} />}></Route>
            <Route path="computation" element={<></>}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
