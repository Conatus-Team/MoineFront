// import { useParams } from "react-router-dom";
import LectureList from "../components/lecture/LectureList";
import React, {Component, useContext, useEffect, useState} from "react";
// import GroupList from "../components/group/GroupContentList";
import { LectureStateContext, RecommendLectureStateContext } from "../App";
import { BASE_URL } from "../App";
import axios from "axios";
const Lecture =() =>{
    //My Lecture
    
    // const lectureList = useContext(LectureStateContext);
    // const [lectureData, setLectureData] = useState([]);

    // //RecommendLecture
    // const recommendLectureList = useContext(RecommendLectureStateContext);
    // const [recommendLectureData, setRecommendLectureData] = useState([]);

    // useEffect(()=>{
    //     setLectureData(lectureList);
        
    // },[lectureList]);

    // useEffect(()=>{
    //     setRecommendLectureData(recommendLectureList);
    // },[recommendLectureList]);
        
    // useEffect(()=>{
    //     // console.log(lecture_data);
    // },[lectureData]);
        
     //Lecture
  const [lectureData, setLectureData] = useState([]);

  useEffect(()=>{
    axios.get(`${BASE_URL.lecture}/lecture`,{
      headers: {
        "Content-Type": `application/json`,
        "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
    },
    })
    .then(response => {
      // console.log(response)
      // setLectureData(response.data);
      const data = response.data.likeList;
      data.sort(function (a, b) {
        return a.lectureCrawling["lectureName"].localeCompare(b.lectureCrawling["lectureName"]);
        });
    console.log(data)
      setLectureData(data);
    }).catch(error => {
      console.log(error.response)
  });
  }, []);

  const [recommendLectureData, setRecommendLectureData] = useState([]);
  useEffect(()=>{
    axios.get(`${BASE_URL.lecture}/lecture`,{
      headers: {
        "Content-Type": `application/json`,
        "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
      }
    })
    .then(response => {
        const data = response.data.recommendList;
        data.sort(function (a, b) {
            return a.lectureCrawling["lectureName"].localeCompare(b.lectureCrawling["lectureName"]);
        });
        setRecommendLectureData(data);
    }).catch(error => {
      console.log(error.response)
  });
  }, []);
//   console.log('lecturedata',lectureData);

    return(<div className="lecture">
        <LectureList lectureList = {lectureData} recommendLectureList = {recommendLectureData}/>
    </div>)

}
export default Lecture;