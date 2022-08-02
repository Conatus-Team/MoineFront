import { LectureStateContext } from "../../App";
import { useNavigate, useParams} from "react-router-dom";
import React, { useContext, useEffect,useState } from "react";
import MyButton from "../MyButton";

const LectureDetail = ()=>{
    const { id } = useParams();
    const lectureData = useContext(LectureStateContext);
    const [originData, setOriginData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if(lectureData.length >= 1){
            const targetLecture = lectureData.find(
                (it) => parseInt(it.id) === parseInt(id)
            );
            if(targetLecture){
                setOriginData(targetLecture);
            } else {
                navigate("/lecture", {replace: true});
            }
        }
    }, [id, lectureData, setOriginData]);
    
        

    return(<div className="lecture_main">
       <div className="lecture_header">
        <div className="lecture_thumbnail">
        <img src = {process.env.PUBLIC_URL+ `/assets${originData.thumbnail}`}/>        
        </div>
        <MyButton type = {'positive'} text ={'More'} onClick={() =>navigate(`/${originData.link}`)}></MyButton>
        </div>


        <div className="lecture_content">
            <div className='lecture_name'>
                <p>[Lecture Name] </p>
                <p> {originData.lectureName}</p>
            </div>
            
            <div className='lecture_title'>
                <p>[Lecture Title]</p>
                <p>{originData.title}</p>
            </div>
            <div className='lecture_teacher'>
                <p>[Teacher]</p>
                <p> {originData.teacher}</p>
            </div>
            <div className='lecture_detail'>
                <p>[Detail]</p>
                <p> {originData.content}</p>
            </div>

            <div className='lecture_price'>
                <p>[Price]</p>
                <p> {originData.price}</p>
            </div>
        </div>
        
        
        
    </div>)

}

export default LectureDetail;

//content, teacher, count, date, link