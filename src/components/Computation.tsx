import React, { useState } from 'react';
import { Decision, Participant, Task } from '../../proto/colink_pb';
import { client } from '../App';
import secp256k1 from 'secp256k1';
import crypto from 'crypto';
import styles from './Computation.module.css'

interface Props {
    adminToken: string,
    jwt: string
}

// let initTasks: string[] = ["199e0a83-27c1-4812-97a5-863365224fed", "7fb59d3b-ea14-4c43-b066-c9e5d63ae0cc", "07447baa-9ce6-455b-8fdb-1fe564cabf67"];

let initTasks = (jwt: string) => {
    let encodedId: string = jwt.split(".")[1];
    let userId: string = JSON.parse(Buffer.from(encodedId, "base64").toString()).user_id;
    let exp_date: number = parseInt((Date.now() / 1000).toFixed()) + 86400; // Date.now() returns milliseconds, must convert to seconds
    return [
        new Task()
            .setTaskId("199e0a83-27c1-4812-97a5-863365224fed")
            .setProtocolName("privacy-preserving-inference")
            .setProtocolParam("...")
            .setParticipantsList(
                [new Participant()
                    .setUserId("A9eNam3OI87WvtxlZnTvBsUO2OoHzqIgZoKxrGhT2Oh2")
                    .setPtype("data instance provider"),
                new Participant()
                    .setUserId(userId)
                    .setPtype("model provider")])
            .setParentTask("")
            .setExpirationTime(exp_date - 45670)
            .setDecisionsList([
                new Decision()
                    .setIsApproved(true)
                    .setIsRejected(false)
                    .setReason("...")
                    .setSignature("...")
                    .setCorePublicKey("..."),
                new Decision()   
            ])
            .setRequireAgreement(true)
            .setStatus("approved"),
        new Task()
            .setTaskId("7fb59d3b-ea14-4c43-b066-c9e5d63ae0cc")
            .setProtocolName("federated-learning-fedavg")
            .setProtocolParam("...")
            .setParticipantsList(
                [new Participant()
                    .setUserId("A9eNam3OI87WvtxlZnTvBsUO2OoHzqIgZoKxrGhT2Oh2")
                    .setPtype("aggregator"),
                new Participant()
                    .setUserId(userId)
                    .setPtype("client"),
                new Participant()
                    .setUserId("Ahj0fs7tEDlL/bLv/6QU29Dj5E7PjGYOfOBMj+dgP/Zg")
                    .setPtype("client")
                ])  
            .setParentTask("")
            .setExpirationTime(exp_date - 12424)
            .setDecisionsList([
                new Decision()
                    .setIsApproved(true)
                    .setIsRejected(false)
                    .setReason("...")
                    .setSignature("...")
                    .setCorePublicKey("..."),
                new Decision(),
                new Decision()
            ])
            .setRequireAgreement(true)
            .setStatus("approved")
    ]
}

export const Computation: React.FC<Props> = (props) => {
    const[tasks, updateTasks] = useState([new Task()]);
    const[selIndex, updateIndex] = useState(0);

    // Variables to initialize entries
    const[hasInit, updateInit] = useState(false);

    const acceptTask = () => {
        tasks.splice(selIndex, 1);
        updateIndex(Math.max(0, selIndex - 1));
        updateTasks([...tasks]);
    }

    const ignoreTask = () => {
        tasks.splice(selIndex, 1);
        updateIndex(Math.max(0, selIndex - 1));
        updateTasks([...tasks]);
    }

    const rejectTask = () => {
        tasks.splice(selIndex, 1);
        updateIndex(Math.max(0, selIndex - 1));
        updateTasks([...tasks]);
    }

    if (props.jwt == "") {
        return (<div></div>)
    }

    if (!hasInit) {
        updateTasks(initTasks(props.jwt));
        updateInit(true);
    }
    

    return (
        <div>
            <h2>Computation:</h2>
            <div className={styles.modal}>
                <div className={styles.modalInner}>
                    <div className={styles.modalField} style={{width: "35%"}}>
                        <h3>Pending Tasks</h3>
                        <table style={tasks.length > 0 ? {border: "1px solid black", fontSize: "15px"} : {fontSize: "15px"}}>
                            <tbody>
                            {tasks.map((task: Task, index: number) => {
                                    let fragment = task.getTaskId();
                                    return (<tr key={fragment} 
                                                onClick={() => {
                                                    updateIndex(index);
                                                }}><th style={index == selIndex ? {backgroundColor: "#DDDDDD"} : {}}>{fragment}</th></tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.modalField} style={{width: "65%"}}>
                        <h3>Task Info</h3>
                        <div className={styles.innerDisplay}>
                            <div style={{whiteSpace: "pre-wrap", textAlign: "left", overflowWrap: "break-word", width: "100%"}}>{tasks.length > 0 ? JSON.stringify(tasks[selIndex].toObject(), null, 2) : ""}</div>
                        </div>
                        <div className={styles.buttonGroup}>
                            <button onClick={acceptTask}>Accept</button>
                            <button onClick={ignoreTask}>Ignore</button>
                            <button onClick={rejectTask}>Reject</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}