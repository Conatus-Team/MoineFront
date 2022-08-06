import { LectureStateContext } from "../../App";
import { useNavigate, useParams} from "react-router-dom";
import React, { useContext, useEffect,useState } from "react";
import MyButton from "../MyButton";

const LectureDetail = ()=>{
    const { id } = useParams();
    const lectureData = useContext(LectureStateContext);
    const [originData, setOriginData] = useState([]);
    const parse = require('html-react-parser');
    const [curriculum, setCurriculum] = useState([]);

    // console.log('id', id);
  
    const navigate = useNavigate();
    useEffect(() => {
        // console.log("enter");
        if(lectureData.length >= 1){
            const targetLecture = lectureData.find(
                (it) => parseInt(it.lectureId) === parseInt(id)
            );
            // console.log('targetLecture', targetLecture);
            if(targetLecture){
                setOriginData(targetLecture);
                
                setCurriculum(parse(targetLecture.curriculum));
            } else {
                navigate("/lecture", {replace: true});
            }
        }
    }, [id,lectureData, originData, setOriginData, curriculum, setCurriculum]);
     
    return(<div className="lecture_main">
       <div className="lecture_header">
        <div className="lecture_thumbnail">
        <img src = {process.env.PUBLIC_URL+ `/${originData.imagePath}`}/>        
        </div>
        <MyButton type = {'positive'} text ={'More'} onClick={() =>navigate(`/${originData.lectureUrl}`)}></MyButton>
        </div>


        <div className="lecture_content">
            <div className='lecture_name'>
                <p>[Lecture Name] </p>
                <p> {originData.lectureName}</p>
            </div>
            
            <div className='lecture_title'>
                <p>[Lecture Title]</p>
                <p>{originData.instruction}</p>
            </div>
            <div className='lecture_teacher'>
                <p>[Teacher]</p>
                <p> {originData.teacherName}</p>
            </div>
            <div className='lecture_detail'>
                <p>[Detail]</p>
                <p> {curriculum}</p>
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