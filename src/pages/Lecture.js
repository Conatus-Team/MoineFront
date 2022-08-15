// import { useParams } from "react-router-dom";
import LectureList from "../components/lecture/LectureList";
import React, {Component, useContext, useEffect, useState} from "react";
// import GroupList from "../components/group/GroupContentList";
import { LectureStateContext, RecommendLectureStateContext } from "../App";

const Lecture =() =>{
    //My Lecture
    const lectureList = useContext(LectureStateContext);
    const [lecture_data, setLectureData] = useState([]);

    //RecommendLecture
    const recommendLectureList = useContext(RecommendLectureStateContext);
    const [recommend_lecture_data, setRecommendLectureData] = useState([]);

    useEffect(()=>{
        setLectureData(lectureList);
    },[lectureList]);

    useEffect(()=>{
        setRecommendLectureData(recommendLectureList);
    },[recommendLectureList]);
        
    useEffect(()=>{
        // console.log(lecture_data);
    },[lecture_data]);
        

    return(<div className="lecture">
        <LectureList lectureList = {lecture_data} recommendLectureList = {recommend_lecture_data}/>
    </div>)

}
export default Lecture;