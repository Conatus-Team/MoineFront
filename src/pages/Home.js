// import { useParams } from "react-router-dom";
import LectureList from "../components/lecture/LectureList";
import GroupList from "../components/lecture/LectureList";
import MyGroupList from "../components/group/MyGroupList";
import RecommendLectureList from "../components/lecture/RecommendLectureList";

import React, {Component, useContext, useEffect, useState} from "react";
// import GroupList from "../components/group/GroupContentList";
import { LectureStateContext } from "../App";
import { GroupStateContext } from "../App";


const Home =() =>{
    const lectureList = useContext(LectureStateContext);
    const [lecture_data, setLectureData] = useState([]);

    const groupList = useContext(GroupStateContext);
    const [group_data, setGroupData] = useState([]);


    useEffect(()=>{
        setLectureData(lectureList);
    },[lectureList]);
        
    useEffect(()=>{
        console.log(lecture_data);
    },[lecture_data]);


    useEffect(()=>{
      setGroupData(groupList);
  },[groupList]);
      
  useEffect(()=>{
      console.log(group_data);
  },[group_data]);
  
        

    return(<div className="home">
      <div className="slogen">
          <p>A good hobby invites friends and makes life enjoyable</p>
      </div>

      <div className="hobby">
        <p  className="hobby_p"> Result and Recommend</p>
        <div className="my_hobby">
          <p>your hobby is ... </p>

        </div>
        <div className="recommended_hobby">
          <p>I recommend you ....</p>

        </div>

      </div>

      <p className='lecture_title'> Recommend Lecture List</p>
      <div className="RecommendLectureList">
        {lectureList.map((it) => (
            <RecommendLectureList key = {it.id} {...it}/>
        ))}
      </div>

      <p className='group_title'> My Group List</p>
        <div className="MyGroupList">
          {groupList.map((it) => (
            <MyGroupList key = {it.id} {...it}/>
          ))}
        </div>
      
    </div>)

}
export default Home;