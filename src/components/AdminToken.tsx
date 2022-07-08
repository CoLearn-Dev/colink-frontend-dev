import React, { useState } from 'react';

interface Props {
    tokenSetter: Function;
}

let adminToken: string = "";

const getAdminToken = async (e: any, cb: Function) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
        if (e == null || e.target == null) {
            return;
        }
        const text = (e.target.result)
        if (text != null) {
            adminToken = text.toString();
        }
    };
    reader.readAsText(e.target.files[0])
}

const setAdminToken = async (cb: Function, toggle: Function) => {
    if(adminToken === "") {
        alert('Error: no file selected for admin token')
    } else {
        cb(adminToken);
        toggle(true);
    }
}

export const AdminToken: React.FC<Props> = (props) => {
    const[isSet, toggleSet] = useState(false);

    const setStatus = () => {
        if (isSet) {
            return <span>Admin token set.</span>
        }
    }

    return (
        <div className="wrapper">
            <h3>Import Host Token:</h3>
            <input type="file" onChange={(e) => getAdminToken(e, props.tokenSetter)} /><br /><br />
            <button onClick={() => setAdminToken(props.tokenSetter, toggleSet)}>Set Host Token</button><br /><br />
            {/* {setStatus()} */}
        </div>
    )    
}