import React, { useState } from 'react';
import { CoLinkClient } from '../proto/ColinkServiceClientPb';
import { AdminToken } from './components/AdminToken'
import { Login } from './components/Login'
import { Storage } from './components/Storage'
import { Computation } from './components/Computation'
import styles from './App.module.css';

// reference to DDSClient (hardcoded for now, connects to envoy proxy)
export const client = new CoLinkClient("http://localhost:8000");

function App() {
  const[adminToken, setAdminToken] = useState(""); // Admin Token
  const[clientJwt, setClientJwt] = useState("");

  const tokenSet = () => {
    if (adminToken != "") {
      return <span>Host Token: Set</span>
    } else {
      return <span>Host Token: Not set</span>
    }
  }

  const jwtSet = () => {
    if (clientJwt != "") {
      return <span>JWT Token: Set</span>
    } else {
      return <span>JWT Token: Not set</span>
    }
  }

  return (
    <div className={styles.App}>
      <h1>CoLearn Client</h1>
      <h2>Debug Panel:</h2>
      <div className={styles.statusPanel}>
        <div className={styles.statusInner}>
          <div className={styles.statusField}>
            <h3>Components:</h3>
            {tokenSet()}<br />
            {jwtSet()}
          </div>
          <div className={styles.statusField}>
            <AdminToken tokenSetter={setAdminToken}></AdminToken>
          </div>
        </div>
      </div><br />

      <Login adminToken={adminToken} jwtSetter={setClientJwt}></Login><br></br>
      <Storage adminToken={adminToken} jwt={clientJwt}></Storage><br></br>
      <Computation adminToken={adminToken} jwt={clientJwt}></Computation>
    </div>
  );
}

export default App;
