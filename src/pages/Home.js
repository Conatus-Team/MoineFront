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
      const data = response.data._embedded.recommended_hobby
      data.sort(function (a, b) {
        return a["hobby_name"].localeCompare(b["hobby_name"]);
      });
      setRecommendHobbyData(data);
    }).catch(error => {
      console.log(error.response)
  });
  }, []);

    // const recommendLectureListContext = useContext(RecommendLectureStateContext);
    // const [recommendLectureList, setRecommendLectureList] = useState([]);
    // useEffect(() => {setRecommendLectureList(recommendLectureListContext)}, []);

    const [recommendLectureList, setRecommendLectureList] = useState([]);
    const [likedLectureList, setLikedLectureList] = useState([]);
    useEffect(()=>{
      axios.get(`${BASE_URL.lecture}/lecture`,{
        headers: {
          "Content-Type": `application/json`,
          "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
        }
      })
      .then(response => {
        const likedLectureListTmp = response.data.likeList;
        const receivedRrecommendLectureList = response.data.recommendList;
        const likeIdList = likedLectureListTmp.map((it)=> {
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

        tmpRrecommendLectureList.sort(function (a, b) {
            return a.lectureCrawling["lectureName"].localeCompare(b.lectureCrawling["lectureName"]);
        });

        likedLectureListTmp.map((it) =>{
          it.lectureCrawling.like = true
        })
        likedLectureListTmp.sort(function (a, b) {
          return a.lectureCrawling["lectureName"].localeCompare(b.lectureCrawling["lectureName"]);
      });
        setLikedLectureList(likedLectureListTmp);
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

            
            groupList2.sort(function (a, b) {
              return a["name"].localeCompare(b["name"]);
              });

            setGroupList(groupList2);
          }).catch(error => {
            console.log(error.response)
            })

    },[]);

  // my hobby 
  const [userHobbyList, setUserHobbyList] = useState([]);
  useEffect(() => {
      axios.get(`${BASE_URL.recommend}/recommend/user_hobby/search/findByUserId?userId=${JSON.parse(sessionStorage.getItem('user')).userId}`,{
          headers: {
            "Content-Type": `application/json`,
            "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
          }
        })
        .then(response => {
          const hobbyList2 = response.data._embedded.user_hobby
          hobbyList2.sort(function (a, b) {
            return a["hobbyName"].localeCompare(b["hobbyName"]);
          });
          // setRecommendGroupData(response.data)
          setUserHobbyList(hobbyList2);
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
              " '"+it.hobbyName+"'"
            ))} 입니다.
          </p>

        </div>
        <div className="recommended_hobby">
          <p>당신에게 맞는 취미는 
          {recommendHobbyData.map((it) => (
             " '"+it.hobby_name+"'"
          ))} 입니다.
            </p>

        </div>

      </div>


      <p className='lecture_title'>내가 찜한 강의 목록</p>
      <div className="lectureList">
        {likedLectureList.length < 1 ? <p>강의를 찜해주세요</p> :likedLectureList.map((it) => (
            <LectureListTemp key = {it.lectureCrawling.id} {...it.lectureCrawling}/>
        ))}
      </div>

      <p className='group_title'>내 모임 목록</p>
        <div className="groupList">
          {groupList.map((it) => (
            <GroupListTemp key = {it.id} {...it}/>
          ))}
        </div>

    </div>)

}
export default Home;
