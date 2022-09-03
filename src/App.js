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

  react: "http://moine-front-service.moine.svc.cluster.local:8080",
  chatting: "http://moine-chatting-backend-service.moine.svc.cluster.local:8080",
  // chatting: "http://112.149.179.238:8083",
  // lecture: "http://moine-lecture-backend-service.moine.svc.cluster.local:8080",
  lecture: "http://192.168.15.209:8082",
  group: "moine-group-backend-service.moine.svc.cluster.local:8080",
  // group: "http://112.149.179.238:8083",

  auth: "http://moine-auth-backend-service.moine.svc.cluster.local:8080",
  // auth: "http://192.168.15.154:8080",
  mypage: "http://moine-mypage-backend-service.moine.svc.cluster.local:8080",
  recommend: "moine-recommend-backend-service.moine.svc.cluster.local:8080",
  chattingFront: "http://localhost:3001",
  // recommend: "http://112.149.179.238:8085",
};


function App() {

  //default header setting
  axios.defaults.headers = {
    "Authorization": 0,
  }
  const defaultUsers = {
      userId: 1,
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
      setLectureData(response.data);
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
      setRecommendLectureData(response.data);
    }).catch(error => {
      console.log(error.response)
  });
  }, []);
  console.log('lecturedata',lectureData);



  // Group
  const [groupData, setGroupData] = useState([]);
  useEffect(()=>{
    axios.get(`${BASE_URL.group}/info?size=999`,{
      headers: {
        "Content-Type": `application/json`,
        "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
      }
    })
    .then(response => {
      setGroupData(response.data._embedded.info)
    }).catch(error => {
      console.log(error.response);
  });
  }, []);
  console.log('groupdata',groupData);

  const [recommendGroupData, setRecommendGroupData] = useState([]);
  useEffect(()=>{
    axios.get(`${BASE_URL.group}/group/recommend`,{
      headers: {
        "Content-Type": `application/json`,
        "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
      }
    })
    .then(response => {
      setRecommendGroupData(response.data._embedded.info)
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
        ?<MyHeader head_Home={"Home"} head_lecture={"lecture"} head_group ={"Group"} head_chatting={"Chatting"} head_mypage ={"MyPage"}/>
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
