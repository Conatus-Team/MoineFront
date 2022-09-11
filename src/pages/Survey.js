import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from 'react';
import MyButton from "../components/MyButton";
import { BASE_URL } from "../App";


function Survey () {
    // alert("survey")
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

        <p>설문조사</p>
            <p>생일: <input className="Survey_Birth" type="date" onChange={(e)=>{setBirth(e.target.value)}}/> </p>
            <p>지역: </p>
                <select name="location" onChange={(e)=>{setLocation(e.target.value)}}>
                <option value="강남구" selected>강남구</option>
                <option value="강동구">강동구</option>
                <option value="강북구">강북구</option>
                <option value="강서구">강서구</option>
                <option value="관악구">관악구</option>
                <option value="광진구">광진구</option>
                <option value="구로구">구로구</option>
                <option value="금천구">금천구</option>
                <option value="노원구">노원구</option>
                <option value="도봉구">도봉구</option>
                <option value="동대문구">동대문구</option>
                <option value="동작구">동작구</option>
                <option value="마포구">마포구</option>
                <option value="서대문구">서대문구</option>
                <option value="서초구">서초구</option>
                <option value="성동구">성동구</option>
                <option value="성북구">성북구</option>
                <option value="송파구">송파구</option>
                <option value="양천구">양천구</option>
                <option value="영등포구">영등포구</option>
                <option value="용산구">용산구</option>
                <option value="은평구">은평구</option>
                <option value="종로구">종로구</option>
                <option value="중구">중구</option>
                <option value="중랑구">중랑구</option>

                    </select>

            <p>취미 카테고리: </p>
            <div className="hobby_content2">
            {hobbyTypeList.map((it) =>(
                <div className="hobbyList"><input className="Survey_hobby_type" type="checkbox" name="hobbyType" value={it.id} onChange={(e)=>{setHobbyType(hobbyType => [...hobbyType, parseInt(e.target.value)])}}/><p>{it.name} </p></div>
            ))}
            </div>


            <p>취미: </p>
            <div className="hobby_content1">
            {hobbyList.map((it) =>(
                <div className="hobbyList"><input className="Survey_hobby" type="checkbox" name="hobby" value={it.id} onChange={(e)=>{setHobby(hobby => [...hobby, parseInt(e.target.value)])}}/><p>{it.name} </p></div>
            ))}
            </div>


            <MyButton type = {'default'} text ={'제출'} onClick={() =>submit()}>

        </MyButton>

    </div>
    );
};


export default Survey;
