import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {useState} from 'react';
import MyButton from "../components/MyButton";
import { BASE_URL } from "../App";


function SignUp () {
    const [userName, setUserName] = useState("");
    const [userNickName, setUserNickName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
    const navigate = useNavigate();

    const submit = () =>{
        let data = {
            email: email,
            password: password,
            userName: userName,
            userNickname: userNickName
        }
        let url = `${BASE_URL.auth}/auth/signup`;
        axios.post(url,  JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            },
            })
            .then((res) => {
                navigate('/survey', {replace: true});
                console.log(res);
        }).catch(error => {
            console.log(error.response)
        });
            
    }

    return (<div className="SignUp">
        <p>SignUp</p>
        <form>
            <p>EMAIL: <input className="SignUp_ID" type="text" onChange={(e)=>{setEmail(e.target.value)}}/> </p>
            <p>PW: <input className="SignUp_Password" type="text" onChange={(e)=>{setPasword(e.target.value)}}/> </p>
            <p>userName: <input className="SignUp_Name" type="text" onChange={(e)=>{setUserName(e.target.value)}}/> </p>
            <p>userNickName: <input className="SignUp_NickName" type="text" onChange={(e)=>{setUserNickName(e.target.value)}}/> </p>
            <MyButton type = {'default'} text ={'SignUp'} onClick={() =>submit()}>
          
        </MyButton>
        </form>
    </div>
    );
};

export default SignUp;
/*
userName, e-mail, password, nickname,


adress, sex, age
*/