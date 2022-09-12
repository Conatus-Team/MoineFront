import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {useState, useEffect} from 'react';
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
            userNickname: userNickName,
        }



        // alert(data);
        let url = `${BASE_URL.auth}/auth/signup`;
        console.log("axios")
        axios.post(url,  JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            },
            })
            .then((res) => {
                // alert("signup success");

                console.log(res.data);
                sessionStorage.setItem("signupUserId", res.data.userId);
                // alert(res)
                navigate('/survey', {replace: true});
        }).catch(error => {
            // alert(error)
            console.log(error.response)
        });

        // alert("axios 끝");

    }

    return (<div className="SignUp">
        <p>회원가입</p>
            <p>이메일: <input className="SignUp_ID" type="text" onChange={(e)=>{setEmail(e.target.value)}}/> </p>
            <p>비밀번호: <input className="SignUp_Password" type="password" onChange={(e)=>{setPasword(e.target.value)}}/> </p>
            <p>이름: <input className="SignUp_Name" type="text" onChange={(e)=>{setUserName(e.target.value)}}/> </p>
            <p>닉네임: <input className="SignUp_NickName" type="text" onChange={(e)=>{setUserNickName(e.target.value)}}/> </p>
            <MyButton type = {'submit'} text ={'회원가입'} onClick={() =>submit()}>

        </MyButton>
    </div>
    );
};

export default SignUp;
/*
userName, e-mail, password, nickname,


adress, sex, age
*/
