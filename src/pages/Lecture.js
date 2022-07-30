// import { useParams } from "react-router-dom";
import LectureList from "../components/lecture/LectureList";
import React, {Component, useContext, useEffect, useState} from "react";
// import GroupList from "../components/group/GroupContentList";
import { LectureStateContext } from "../App";

const Lecture =() =>{
    const lectureList = useContext(LectureStateContext);
    const [lecture_data, setLectureData] = useState([]);

    useEffect(()=>{
        setLectureData(lectureList);
    },[lectureList]);
        
    useEffect(()=>{
        console.log(lecture_data);
    },[lecture_data]);
        

    return(<div className="lecture">
        <LectureList lectureList = {lecture_data}/>
    </div>)

}
export default Lecture;