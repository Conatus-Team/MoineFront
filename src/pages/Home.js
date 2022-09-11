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
        const likedLectureList = response.data.likeList;
        const receivedRrecommendLectureList = response.data.recommendList;
        const likeIdList = likedLectureList.map((it)=> {
          // return like id list
          return it.lectureCrawling.lectureId
        })
        // get not liked RrecommendLectureList
        const tmpRrecommendLectureList = []
        receivedRrecommendLectureList.map((it)=> {
          it.lectureCrawling.like = false
          if (!likeIdList.includes(it.lectureCrawling.lectureId)){
            tmpRrecommendLectureList.push(it)
          }
        });
        setRecommendLectureList(tmpRrecommendLectureList);
      }).catch(error => {
        console.log(error.response)
    });
    }, []);



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

  // my hobby 
  const [userHobbyList, setHobbyList] = useState([]);
  useEffect(() => {
      axios.get(`${BASE_URL.group}/recommend/user_hobby/search/findByUserId?userId=${JSON.parse(sessionStorage.getItem('user')).userId}`,{
          headers: {
            "Content-Type": `application/json`,
            "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
          }
        })
        .then(response => {
          const hobbyList2 = response.data._embedded.user_hobby
          // setRecommendGroupData(response.data)
          setHobbyList(hobbyList2);
        }).catch(error => {
          console.log(error.response)
          })

  },[]);


    return(<div className="home">
      <div className="slogen">
          <p>A good hobby invites friends and makes life enjoyable</p>
      </div>

      <div className="hobby">
        <p  className="hobby_p"> 취미 정보</p>
        <div className="my_hobby">
           <p>당신의 취미는 
          {userHobbyList.map((it) => (
            <p>{it.hobbyName}</p>
            ))} 
          </p>

        </div>
        <div className="recommended_hobby">
          <p>당신에게 맞는 취미는
          {recommendHobbyData.map((it) => (
            <p>{it.hobby_name}</p>
          ))} 입니다!
            </p>

        </div>

      </div>


      <p className='lecture_title'>추천 강의 목록</p>
      <div className="lectureList">
        {recommendLectureList.length < 1 ? <p>please expect other recommendation</p> :recommendLectureList.map((it) => (
            <LectureListTemp key = {it.lectureCrawling.id} {...it.lectureCrawling}/>
        ))}
      </div>

      <p className='group_title'>가입한 그룹 목록</p>
        <div className="groupList">
          {groupList.map((it) => (
            <GroupListTemp key = {it.id} {...it}/>
          ))}
        </div>

    </div>)

}
export default Home;
