import { useParams } from "react-router-dom";

// import PropTypes from "prop-types";

import MyButton from "../components/MyButton";
import axios from "axios";
import {useState} from 'react';


function LogIn() {
    const [ID, setID] = useState("");
    const [password, setPasword] = useState("");

    const submit = () =>{
        let data = {
            ID: ID,
            Password: password
        }
        let url = "http://localhost:3000/group/search";
        axios.post(url,  JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            },
            })
            .then((res) => {
            console.log(res);
        });
            
    }
    
    return (
        <div className="LogIn">
            <input className="LogIn_ID" type="text" onChange={(e)=>{setID(e.target.value)}}/>
            <input className="LogIn_Password" type="text" onChange={(e)=>{setPasword(e.target.value)}}/>
            <MyButton type = {'default'} text ={'Search'} onClick={() =>submit()}>
          
        </MyButton>
        </div>
    )
}

export default LogIn;