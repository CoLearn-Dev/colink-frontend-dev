import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { CoLinkClient } from '../proto_js/ColinkServiceClientPb';
import { Layout } from './components/Layout/Layout'
import { LoginPanel } from './components/LoginPanel/LoginPanel'
import { StoragePanel } from './components/Storage/StoragePanel'
import { Computation } from './components/Computation/Computation'
import { Settings } from './components/Settings/Settings'
import styles from './App.module.css';

import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App(): JSX.Element {
  // reference to DDSClient (note: http://localhost:8000 connects to envoy proxy)
  const[client, setClient] = useState(new CoLinkClient(""));

  const[clientHostname, setClientHostname] = useState(localStorage.getItem("clientHostname") || "");
  const[jwt, setJwt] = useState(localStorage.getItem("jwt") || "");

  const[isAdmin, setAdminStatus] = useState(localStorage.getItem("isAdmin") === "true" || false);

  useEffect(() => {
    setClient(new CoLinkClient(clientHostname));
    localStorage.setItem("clientHostname", clientHostname);
  }, [clientHostname]);

  useEffect(() => {
    localStorage.setItem("jwt", jwt);
  }, [jwt]);

  useEffect(() => {
    localStorage.setItem("isAdmin", String(isAdmin));
  }, [isAdmin]);

  function clientInitialized(): boolean {
    return clientHostname !== "" && jwt !== "";
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout jwt={jwt} setJwt={setJwt} />
          }>
            <Route index element={
              <>
                {clientInitialized() ? 
                  <>{isAdmin ? <Navigate to="/settings" /> : <Navigate to="/storage" />}</> : 
                <LoginPanel setHostname={setClientHostname} setJwt={setJwt} setAdminStatus={setAdminStatus} />}
              </>
            } />
            <Route path="settings" element={<Settings client={client} setClient={setClientHostname} jwt={jwt} setJwt={setJwt} isAdmin={isAdmin} setAdmin={setAdminStatus} />}></Route>
            <Route path="storage" element={<StoragePanel client={client} jwt={jwt} />}></Route>
            <Route path="tasks" element={<></>}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
