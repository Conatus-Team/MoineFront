// import { useParams } from "react-router-dom";
import GroupListTemp from "../components/group/GroupListTemp";
import LectureListTemp from "../components/lecture/LectureListTemp";
import React, {Component, useContext, useEffect, useState} from "react";
// import GroupList from "../components/group/GroupContentList";
import { BASE_URL, RecommendLectureStateContext } from "../App";
import { GroupStateContext } from "../App";
import axios from "axios";


const Home =() =>{
  //Recommend Hobby
  const [recommendHobbyData, setRecommendHobbyData] = useState([]);
  useEffect(()=>{
    axios.get(`${BASE_URL.recommend}/hobby/recommend`,{
      headers: {
        "Content-Type": `application/json`,
        "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
      }
    })
    .then(response => {
      setRecommendHobbyData(response.data);
    }).catch(error => {
      console.log(error.response)
  });
  }, []);

    const recommendLectureList = useContext(RecommendLectureStateContext);
    const groupList = useContext(GroupStateContext);


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
          <p>I recommend you {recommendHobbyData}</p>

        </div>

      </div>

      <p className='lecture_title'> Recommend Lecture List</p>
      <div className="LectureList">
        {recommendLectureList.map((it) => (
            <LectureListTemp key = {it.id} {...it}/>
        ))}
      </div>

      <p className='group_title'> My Group List</p>
        <div className="GroupList">
          {groupList.map((it) => (
            <GroupListTemp key = {it.id} {...it}/>
          ))}
        </div>
      
    </div>)

}
export default Home;