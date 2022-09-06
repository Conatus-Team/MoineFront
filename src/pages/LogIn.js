import { useNavigate, useParams } from "react-router-dom";

// import PropTypes from "prop-types";

import MyButton from "../components/MyButton";
import axios from "axios";
import {useState} from 'react';
import { BASE_URL } from "../App";


function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");

    const [userData, setUserData] = useState([]);

    const submit = () =>{
        let data = {
            email: email,
            password: password
        }
        let url = `${BASE_URL.auth}/auth/login`;
        let loginSuccess = false;
        axios.post(url,  JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            },
            })
            .then((res) => {
                setUserData(res.data);
            console.log(res.data);

            // post 안에 있어야 실행 잘 됨
            // userData가 페이지 바뀌기 전에 데이터가 안 들어가는 것 같음
            if (res.data) loginSuccess = true;
            if(loginSuccess){
                sessionStorage.setItem('user', JSON.stringify(res.data));
                navigate('/home', {replace: true});
                window.location.reload();
            } else {
                alert("fail to LogIn");
            }
        }).catch(error => {
            console.log(error.response)
        });



    }

    return (
        <div className="LogIn">
            <p>로그인</p>
            <p>E-mail: <input className="LogIn_ID" type="text" onChange={(e)=>{setEmail(e.target.value)}}/> </p>
            <p>비밀번호: <input className="LogIn_Password" type="password" onChange={(e)=>{setPasword(e.target.value)}}/> </p>
            <MyButton type = {'default'} text ={'로그인'} onClick={() =>submit()}>

        </MyButton>
        </div>
    )
}

export default LogIn;

/*
{
"userId": 1,
"userName": "??",
"email": "hello@test.com",
"userNickname": null
}
*/
