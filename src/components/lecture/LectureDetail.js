import { BASE_URL, LectureStateContext } from "../../App";
import { useNavigate, useParams} from "react-router-dom";
import React, { useContext, useEffect,useState } from "react";
import MyButton from "../MyButton";
import axios from "axios";
const parse = require('html-react-parser');


const LectureDetail = ()=>{
    const { id } = useParams();
    const [originData, setOriginData] = useState([]);
    const parse = require('html-react-parser');
    // const [curriculum, setCurriculum] = useState([]);

    // console.log('id', id);
  
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(`${BASE_URL.lecture}/lecture/${id}`,{
          headers: {
            "Content-Type": `application/json`,
            "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
          }
        })
        .then(response => {
            let responseData = response.data;
            responseData.introduction = parse(responseData.introduction)
            responseData.curriculum = parse(responseData.curriculum)
            setOriginData(responseData)
        }).catch(error => {
          console.log(error.response);
          navigate("/lecture", {replace: true});
      });
      }, []);
     
    return(<div className="lecture_main">
       <div className="lecture_header">
        <div className="lecture_thumbnail">
        <img src = {process.env.PUBLIC_URL+ `${originData.imagePath}`}/>        
        </div>
        <MyButton type = {'positive'} text ={'More'} onClick={() =>window.location.href = `${originData.lectureUrl}`}>

        </MyButton>
        </div>


        <div className="lecture_content">
            <div className='lecture_name'>
                <p>[Lecture Name] </p>
                <p> {originData.lectureName}</p>
            </div>
            
            <div className='lecture_title'>
                <p>[Lecture introduction]</p>
                <p>{originData.introduction}</p>
            </div>

            <div className='lecture_teacher'>
                <p>[Teacher]</p>
                <p> {originData.teacherName}</p>
            </div>
            <div className='lecture_detail'>
                <p>[Detail]</p>
                <p> {originData.curriculum}</p>
            </div>

            <div className='lecture_price'>
                <p>[Price]</p>
                <p> {originData.price}</p>
            </div>
            <div className='lecture_amount'>
                <p>[Period]</p>
                <p> {originData.amount}</p>
            </div>
            <div className='lecture_siteName'>
                <p>[siteName]</p>
                <p> {originData.siteName}</p>
            </div>
        </div>
        
        
        
    </div>)

}

export default LectureDetail;

/*amount": "string",
"categoryName": "string",
"curriculum": "string",
"imagePath": "string",
"introduction": "string",
"lectureName": "string",
"lectureUrl": "string",
"originLikeCount": 0,
"price": "string",
"siteName": "string",
"teacherName": "string"
*/