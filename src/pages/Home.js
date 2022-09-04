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
    axios.get(`${BASE_URL.recommend}/recommend/recommended_hobby/search/findByUserId?userId=${JSON.parse(sessionStorage.getItem('user')).userId}`,{
      headers: {
        "Content-Type": `application/json`,
        "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
      }
    })
    .then(response => {
      setRecommendHobbyData(response.data._embedded.recommended_hobby);
    }).catch(error => {
      console.log(error.response)
  });
  }, []);

    // const recommendLectureListContext = useContext(RecommendLectureStateContext);
    // const [recommendLectureList, setRecommendLectureList] = useState([]);
    // useEffect(() => {setRecommendLectureList(recommendLectureListContext)}, []);

    const [recommendLectureList, setRecommendLectureList] = useState([]);
    useEffect(()=>{
      axios.get(`${BASE_URL.lecture}/lecture`,{
        headers: {
          "Content-Type": `application/json`,
          "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
        }
      })
      .then(response => {
        setRecommendLectureList(response.data.recommendList);
      }).catch(error => {
        console.log(error.response)
    });
    }, [recommendLectureList]);
    console.log('lecturedata',recommendLectureList);
  
    // my group list 새로고침
    const [groupList, setGroupList] = useState([]);
    useEffect(() => {
        axios.get(`${BASE_URL.group}/group/my`,{
            headers: {
              "Content-Type": `application/json`,
              "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
            }
          })
          .then(response => {
            const groupList2 = response.data
            // setRecommendGroupData(response.data)
            setGroupList(groupList2);
          }).catch(error => {
            console.log(error.response)
            })
        
    },[]);


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
          <p>I recommend you 
          {recommendHobbyData.map((it) => (
            <p>{it.category}</p>
          ))}
            </p>

        </div>

      </div>

      
      <p className='lecture_title'> Recommend Lecture List</p>
      <div className="lectureList">
        {recommendLectureList.map((it) => (
            <LectureListTemp key = {it.id} {...it}/>
        ))}
      </div>

      <p className='group_title'> My Group List</p>
        <div className="groupList">
          {groupList.map((it) => (
            <GroupListTemp key = {it.id} {...it}/>
          ))}
        </div>
      
    </div>)

}
export default Home;