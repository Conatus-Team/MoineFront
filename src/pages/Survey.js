import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from 'react';
import MyButton from "../components/MyButton";
import { BASE_URL } from "../App";
<<<<<<< Updated upstream
import HobbyList from "../components/hobby/HobbyList";
import HobbyTypeList from "../components/hobby/HobbyTypeList";

function SignUp () {
=======

function Survey () {
>>>>>>> Stashed changes
    //DB hobby
    const [hobbyList, setHobbyList] = useState([]);
    const [hobbyTypeList, setHobbyTypeList] = useState([]);


    const [birth, setBirth] = useState(0);
<<<<<<< Updated upstream
    const [location, setLocation] = useState("");
    const [hobbyType, setHobbyType] = useState([]);
    const [hobby, setHobby] = useState([]);
    const navigate = useNavigate();
    const getStringDate = (date) => {
        return date.toISOString().slice(0,10);
    };
    const submit = () =>{
        console.log("enter")
        // let data = {
        //     userId: JSON.parse(sessionStorage.getItem('user')).userId,
        //     birth: birth,
        //     location: location,
        //     hobby_type: parseInt(hobbyType),
        //     hobby: hobby,
        // }
        
        let dummy_data = {
            userId: JSON.parse(sessionStorage.getItem('user')).userId,
            birth: getStringDate(birth),
            location: location,
            hobbyType: [1,4,6,7],
            hobby: [1,2,3],
        }
        console.log("dummy_data", dummy_data);
=======
    const [location, setLocation] = useState("???");
    const [hobbyType, setHobbyType] = useState([]);
    const [hobby, setHobby] = useState([]);
    const navigate = useNavigate();

    const submit = () =>{
        let dummy_data = {
            userId: JSON.parse(sessionStorage.getItem('user')).userId,
            birth: birth,
            location: location,
            hobbyType: hobbyType,
            hobby: hobby,
        }
>>>>>>> Stashed changes

        let url = `${BASE_URL.recommend}/recommend/survey`;
        axios.post(url,  JSON.stringify(dummy_data), {
            headers: {
                "Content-Type": `application/json`,
                "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
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
                "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
            },
            })
            .then((res) => {
                setHobbyList(res.data._embedded.hobby);
<<<<<<< Updated upstream
                console.log("hobby",res.data._embedded.hobby);
=======
                // console.log("hobby",res.data._embedded.hobby);
>>>>>>> Stashed changes
        }).catch(error => {
            console.log(error.response)
        });
    }, []);

    useEffect(()=>{
        axios.get( `${BASE_URL.recommend}/recommend/hobby_type?size=999`, {
            headers: {
                "Content-Type": `application/json`,
                "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
            },
            })
            .then((res) => {
                setHobbyTypeList(res.data._embedded.hobby_type);
<<<<<<< Updated upstream
                console.log("hobbyList",res.data._embedded.hobby_type);
=======
                // console.log("hobbyList",res.data._embedded.hobby_type);
>>>>>>> Stashed changes
        }).catch(error => {
            console.log(error.response)
        });
    }, []);


    return (<div className="Survey">
<<<<<<< Updated upstream
        <p>SignUp</p>
        <form>
=======
        <p>Survery</p>
>>>>>>> Stashed changes
            <p>Birth: <input className="Survey_Birth" type="date" onChange={(e)=>{setBirth(e.target.value)}}/> </p>
            <p>Location: </p>
                <select name="location" onChange={(e)=>{setLocation(e.target.value)}}>
                <option value="???" selected>GangNam-Gu</option>
<<<<<<< Updated upstream
                <option value="???" selected>Gangdong-Gu</option>
                <option value="???" selected>???</option>
                <option value="???" selected>???</option>
                <option value="???" selected>???</option>
                <option value="???" selected>???</option>
                <option value="???" selected>???</option>
                <option value="???" selected>???</option>
                <option value="???" selected>???</option>
                <option value="???" selected>???</option>
                <option value="????" selected>????</option>
                <option value="???" selected>???</option>
                <option value="???" selected>???</option>
                <option value="????" selected>????</option>
                <option value="???" selected>???</option>
                <option value="???" selected>???</option>
                <option value="???" selected>???</option>
                <option value="???" selected>???</option>
                <option value="???" selected>???</option>
                <option value="????" selected>????</option>
                <option value="???" selected>???</option>
                <option value="???" selected>???</option>
                <option value="???" selected>???</option>
                <option value="??" selected>??</option>
                <option value="???" selected>???</option>

                    </select>
            <p>Hobby Category: </p>
            {/* {hobbyList.map((it) =>(
                <HobbyList key = {it.id} {...it}/>
            ))} */}

            <p>Hobby: </p>
            {/* {hobbyTypeList.map((it) =>(
                <HobbyTypeList key = {it.id} {...it}/>
            ))} */}
            {/* <input className="Survey_hobby" type="text" />  */}
            <MyButton type = {'default'} text ={'Submit'} onClick={() =>submit()}>
            {/* <button type="submit">submit</button> */}
          
        </MyButton>
        </form>
=======
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
        
>>>>>>> Stashed changes
    </div>
    );
};

<<<<<<< Updated upstream
export default SignUp;
/*
userName, e-mail, password, nickname,


adress, sex, age
*/
=======
export default Survey;
>>>>>>> Stashed changes
