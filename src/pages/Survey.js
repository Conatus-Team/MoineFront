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
                const data = res.data._embedded.hobby;
                data.sort(function (a, b) {
                    return a["name"].localeCompare(b["name"]);
                });
                setHobbyList(data);
                

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
                const data = res.data._embedded.hobby_type;
                data.sort(function (a, b) {
                    return a["name"].localeCompare(b["name"]);
                });
                setHobbyTypeList(data);

        }).catch(error => {
            console.log(error.response)
        });
    }, []);


    return (<div className="Survey">

        <p>설문조사</p>
            <p>생일: <input className="Survey_Birth" type="date" onChange={(e)=>{setBirth(e.target.value)}}/> </p>
            <p>지역: </p>
                <select name="location" onChange={(e)=>{setLocation(e.target.value)}}>
                <option value="서울" selected>서울</option>
                <option value="부산">부산</option>
                <option value="대구">대구</option>
                <option value="인천">인천</option>
                <option value="광주">광주</option>
                <option value="대전">대전</option>
                <option value="울산">울산</option>
                <option value="세종">세종</option>
                <option value="경기">경기도</option>
                <option value="강원">강원도</option>
                <option value="충청북도">충청북도</option>
                <option value="충청남도">충청남도</option>
                <option value="전라북도">전라북도</option>
                <option value="전라남도">전라남도</option>
                <option value="경상북도">경상북도</option>
                <option value="경상남도">경상남도</option>
                <option value="제주">제주도</option>
                    </select>

            <p>취미 카테고리: </p>
            <div className="hobby_content2">
            {hobbyTypeList.map((it) =>(
                
                <div className="hobbyList">
                    <input className="Survey_hobby_type" type="checkbox" name="hobbyType" value={it.id} 
                    onChange={(e)=>{
                        const idx = hobbyType.indexOf(parseInt(e.target.value));
                        // already exist
                        if (idx !== -1){
                            // delete item witch matches idx
                            hobbyType.splice(idx, 1)
                            setHobbyType([...hobbyType])
                            return;
                        }
                        setHobbyType(hobbyType => [...hobbyType, parseInt(e.target.value)])}}/>
                        <p>{it.name} </p>
                </div>
            ))}
            </div>


            <p>취미: </p>
            <div className="hobby_content1">
            {hobbyList.map((it) =>(
                hobbyType.includes(it.type) ? 
                <div className="hobbyList"><input className="Survey_hobby" type="checkbox" name="hobby" value={it.id} 
                onChange={(e)=>{setHobby(hobby => [...hobby, parseInt(e.target.value)])}}/>
                <p>{it.name} </p>
                </div> : null
            ))}
            </div>


            <MyButton type = {'default'} text ={'제출'} onClick={() =>submit()}>

        </MyButton>

    </div>
    );
};


export default Survey;
