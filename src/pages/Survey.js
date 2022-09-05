import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from 'react';
import MyButton from "../components/MyButton";
import { BASE_URL } from "../App";


function Survey () {
    alert("survey")
    //DB hobby
    const [hobbyList, setHobbyList] = useState([]);
    const [hobbyTypeList, setHobbyTypeList] = useState([]);


    const [birth, setBirth] = useState(0);
    const [location, setLocation] = useState("???");
    const [hobbyType, setHobbyType] = useState([]);
    const [hobby, setHobby] = useState([]);
    const navigate = useNavigate();
    const signupUserId = sessionStorage.getItem('signupUserId');
    const submit = () =>{
        
        let dummy_data = {
            userId: signupUserId,
            birth: birth,
            location: location,
            hobbyType: hobbyType,
            hobby: hobby,
        }
        let url = `${BASE_URL.recommend}/recommend/survey`;
        axios.post(url,  JSON.stringify(dummy_data), {
            headers: {
                "Content-Type": `application/json`,
                "Authorization" : signupUserId
            },
            })
            .then((res) => {
                navigate('/login', {replace: true});
                console.log(res);
        }).catch(error => {
            console.log(error.response)
        });
            
    }
    useEffect(()=>{
        axios.get(`${BASE_URL.recommend}/recommend/hobby?size=999`, {
            headers: {
                "Content-Type": `application/json`,
                "Authorization" : signupUserId
            },
            })
            .then((res) => {
                setHobbyList(res.data._embedded.hobby);

        }).catch(error => {
            console.log(error.response)
        });
    }, []);

    useEffect(()=>{
        axios.get( `${BASE_URL.recommend}/recommend/hobby_type?size=999`, {
            headers: {
                "Content-Type": `application/json`,
                "Authorization" : signupUserId
            },
            })
            .then((res) => {
                setHobbyTypeList(res.data._embedded.hobby_type);

        }).catch(error => {
            console.log(error.response)
        });
    }, []);


    return (<div className="Survey">

        <p>Survery</p>
            <p>Birth: <input className="Survey_Birth" type="date" onChange={(e)=>{setBirth(e.target.value)}}/> </p>
            <p>Location: </p>
                <select name="location" onChange={(e)=>{setLocation(e.target.value)}}>
                <option value="???" selected>GangNam-Gu</option>
                <option value="???">Gangdong-Gu</option>
                <option value="Gangseo-gu">Gangseo-gu</option>
                <option value="Gangbuk-gu">Gangbuk-gu</option>
                <option value="???">???</option>
                <option value="???" >???</option>
                <option value="???" >???</option>
                <option value="???" >???</option>
                <option value="???" >???</option>
                <option value="???" >???</option>
                <option value="????">????</option>
                <option value="???" >???</option>
                <option value="???" >???</option>
                <option value="????">????</option>
                <option value="???" >???</option>
                <option value="???" >???</option>
                <option value="???" >???</option>
                <option value="???" >???</option>
                <option value="???" >???</option>
                <option value="????">????</option>
                <option value="???" >???</option>
                <option value="???" >???</option>
                <option value="???" >???</option>
                <option value="??" >??</option>
                <option value="???">???</option>

                    </select>

            <p>Hobby Type: </p>
            <div className="hobby_content2">
            {hobbyTypeList.map((it) =>(
                <div className="hobbyList"><input className="Survey_hobby_type" type="checkbox" name="hobbyType" value={it.id} onChange={(e)=>{setHobbyType(hobbyType => [...hobbyType, parseInt(e.target.value)])}}/><p>{it.name} </p></div>
            ))}
            </div>


            <p>Hobby: </p>
            <div className="hobby_content1">
            {hobbyList.map((it) =>(
                <div className="hobbyList"><input className="Survey_hobby" type="checkbox" name="hobby" value={it.id} onChange={(e)=>{setHobby(hobby => [...hobby, parseInt(e.target.value)])}}/><p>{it.name} </p></div>
            ))}
            </div>

            
            <MyButton type = {'default'} text ={'Submit'} onClick={() =>submit()}>
          
        </MyButton>
        
    </div>
    );
};


export default Survey;
