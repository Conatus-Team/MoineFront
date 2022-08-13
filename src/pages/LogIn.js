import { useParams } from "react-router-dom";

// import PropTypes from "prop-types";

import MyButton from "../components/MyButton";
import axios from "axios";
import {useState} from 'react';
import { BASE_URL } from "../App";


function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");

    const submit = () =>{
        let data = {
            email: email,
            Password: password
        }
        let url = `${BASE_URL.auth}/auth/login`;
        axios.post(url,  JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            },
            })
            .then((res) => {
            console.log(res);
        }).catch(error => {
            console.log(error.response)
        });
            
    }
    
    return (
        <div className="LogIn">
            <p>LogIn</p>
            <p>E-mail: <input className="LogIn_ID" type="text" onChange={(e)=>{setEmail(e.target.value)}}/> </p>
            <p>PW: <input className="LogIn_Password" type="text" onChange={(e)=>{setPasword(e.target.value)}}/> </p>
            <MyButton type = {'default'} text ={'LogIn'} onClick={() =>submit()}>
          
        </MyButton>
        </div>
    )
}

export default LogIn;