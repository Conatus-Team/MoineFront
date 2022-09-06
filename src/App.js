import React, { useEffect, useState } from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios';

//Home
import Home from './pages/Home';

//Default
import Default from './pages/Default';

//Lecture
import Lecture from './pages/Lecture';
import LectureDetail from "./components/lecture/LectureDetail";

//Group
import Group from './pages/Group';
import Group_main from './pages/Group/Group_main';
import Groups from './components/group/Groups';
import GroupEdit from "./pages/Group/GroupEdit";
import GroupNew from "./pages/Group/GroupNew";

//post
import Post from './pages/Post/Post';
import PostItemNew from './pages/Post/PostItemNew';
import PostItemEdit from './pages/Post/PostItemEdit';
import PostItem from './pages/Post/PostItem';

//Gallery
import Gallery from './pages/Gallery/Gallery';
import GalleryNew from './pages/Gallery/GalleryNew';

//components
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';
import Mypage from './pages/Mypage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Survey from './pages/Survey';


//page router
import PageRouter from './components/PageRouter';


//Global Data
export const LectureStateContext = React.createContext();
export const RecommendLectureStateContext = React.createContext();
export const GroupStateContext = React.createContext();
export const RecommendGroupStateContext = React.createContext();

//Base_URL
export const BASE_URL = {

  react: "moine-frontend-svc.moine.svc.cluster.local",
  chatting: "chatting-backend-svc.moine.svc.cluster.local",
  lecture: "lecture-backend-svc.moine.svc.cluster.local",
  group: "group-backend-svc.moine.svc.cluster.local",
  auth: "auth-backend-service.moine.svc.cluster.local",
  // mypage: "http://lecture-backend-svc.moine.svc.cluster.local",
  recommend: "recommend-backend-svc.moine.svc.cluster.local",
  chattingFront: "chatting-frontend-svc.moine.svc.cluster.local"
};


function App() {

  //default header setting
  axios.defaults.headers = {
    "Authorization": 0,
  }
  const defaultUsers = {
      userId: 0,
      userName: "Lee Hyunsun",
      email: "sunnylee7@sookmyung.ac.kr",
      userNickname: "Sunny"
  }
  // user 변경되는 오류 fix
  if (!sessionStorage.getItem('user')){
    sessionStorage.setItem('user',JSON.stringify(defaultUsers));
  }

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
      setLectureData(response.data.likeList);
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
      setRecommendLectureData(response.data.recommendList);
    }).catch(error => {
      console.log(error.response)
  });
  }, []);
  console.log('lecturedata',lectureData);



  // Group
  // my group list
  const [groupData, setGroupData] = useState([]);
  useEffect(()=>{
    axios.get(`${BASE_URL.group}/group/my`,{
      headers: {
        "Content-Type": `application/json`,
        "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
      }
    })
    .then(response => {
      setGroupData(response.data)
    }).catch(error => {
      console.log(error.response);
  });
  }, []);
  // console.log('groupdata',groupData);

  const [recommendGroupData, setRecommendGroupData] = useState([]);
  useEffect(()=>{
    axios.get(`${BASE_URL.group}/group/recommend`,{
      headers: {
        "Content-Type": `application/json`,
        "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
      }
    })
    .then(response => {
      setRecommendGroupData(response.data)
    }).catch(error => {
      console.log(error.response)
  });
  }, []);



  return (
    <RecommendLectureStateContext.Provider value={recommendLectureData}>
    <LectureStateContext.Provider value={lectureData}>
    <RecommendGroupStateContext.Provider value={recommendGroupData}>
    <GroupStateContext.Provider value={groupData}>
    <BrowserRouter>
    <div className="App">
      {/*     <div key = {userData.id} className="App"> */}
      {
         JSON.parse(sessionStorage.getItem('user')).userId !== 0
        ?<MyHeader head_Home={"홈"} head_lecture={"강의"} head_group ={"모임"} head_chatting={"채팅"} head_mypage ={"내 정보"}/>
        : null
      }
      {/* <MyHeader head_Home={"Home"} head_lecture={"lecture"} head_group ={"Group"} head_chatting={"Chatting"} head_mypage ={"MyPage"}/> */}


      <Routes>
        <Route path = '/' element = {<Default/>} />
        <Route path = '/home' element = {<Home/>} />
        <Route path='/lecture' element={<Lecture/>} />
        <Route path='/lecture/:id' element={<LectureDetail/>} />
        <Route path='/group' element={<Group/>} />
        <Route path='/mypage' element={<Mypage/>} />
        <Route path='/login' element={<LogIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/survey' element={<Survey/>} />
        <Route path='/lecture' element={<Lecture/>} />
        <Route path='/group/new' element={<GroupNew/>} />
        <Route path='/group/edit/:groupId' element={<GroupEdit/>} />
        <Route path='/group/main/:id' element={<Group_main/>} />
        <Route path='/group/groups' element={<Groups/>} />
        <Route path='/group/groups/:id' element={<Groups/>} />
        <Route path='/group/gallery/:groupId' element={<Gallery/>}/>
        <Route path='/group/gallery/new/:groupId' element={<GalleryNew/>}/>
        <Route path='/group/post/new/:groupId' element={<PostItemNew/>} />
        <Route path='/group/post/edit/:groupId/:postId' element={<PostItemEdit/>} />
        <Route path='/group/post/:id' element={<Post/>} />
        <Route path='/group/post/:groupId/:postId' element={<PostItem/>} />
        <Route path='/group/post' element={<Post/>} />
        <Route path='/enter/:page/:userId' element={<PageRouter/>}/>

      </Routes>
    </div>
    </BrowserRouter>
  </GroupStateContext.Provider>
  </RecommendGroupStateContext.Provider>
  </LectureStateContext.Provider>
  </RecommendLectureStateContext.Provider>
  );
}

export default App;
