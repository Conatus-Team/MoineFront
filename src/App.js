import React, { useEffect, useState } from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios';

import Home from './pages/Home';

//Lecture
import Lecture from './pages/Lecture';
import LectureDetail from "./components/lecture/LectureDetail";

//Group
import Group from './pages/Group';
import Group_main from './pages/Group/Group_main';
import Groups from './components/group/Groups';
import GroupEdit from "./pages/Group/GroupEdit"
import GroupNew from "./pages/Group/GroupNew"
import Gallery from './pages/Post/Gallery';

//post
import Post from './pages/Post/Post';
import PostItemNew from './pages/Post/PostItemNew';
import PostItemEdit from './pages/Post/PostItemEdit';
import PostItem from './pages/Post/PostItem';

//components
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';
import Mypage from './pages/Mypage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

export const LectureStateContext = React.createContext();
export const GroupStateContext = React.createContext();
export const PostStateContext = React.createContext();
export const PostDispatchContext = React.createContext();

function App() {

  const [lectureData, setLectureData] = useState([]);
  useEffect(()=>{
    axios.get(" http://localhost:3000/assets/lecture_data.json")
    .then(response => {
      setLectureData(response.data);
    });
  }, [lectureData, setLectureData]);
  // console.log(lectureData);

  const [groupData, setGroupData] = useState([]);
  useEffect(()=>{
    axios.get(" http://localhost:3000/assets/group_data.json")
    .then(response => {
      setGroupData(response.data);
    });
  }, [groupData, setGroupData]);

  const [postData, setPostData] = useState([]);
  useEffect(()=>{
    axios.get(" http://localhost:3000/assets/post_data.json")
    .then(response => {
      setPostData(response.data);
    });
  }, [postData, setPostData]);
  
  return (
    <LectureStateContext.Provider value={lectureData}>
    <GroupStateContext.Provider value={groupData}>
    <PostStateContext.Provider value={postData}>
    <BrowserRouter>
    <div className="App">
      {/*     <div key = {userData.id} className="App"> */}
      <MyHeader head_Home={"Home"} head_lecture={"lecture"} head_group ={"Group"} head_chatting={"Chatting"} head_mypage ={"MyPage"} head_login={"LogIn"} head_signup = {"SignUp"}/>
      

      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path='/lecture' element={<Lecture/>} />
        <Route path='/lecture/:id' element={<LectureDetail/>} />
        <Route path='/group' element={<Group/>} />
        <Route path='/mypage' element={<Mypage/>} />
        <Route path='/login' element={<LogIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/lecture' element={<Lecture/>} />
        <Route path='/group/new' element={<GroupNew/>} />
        <Route path='/group/edit/:groupId' element={<GroupEdit/>} />
        <Route path='/group/main/:id' element={<Group_main/>} />
        <Route path='/group/groups' element={<Groups/>} />
        <Route path='/group/groups/:id' element={<Groups/>} />
        <Route path='/group/gallery' element={<Gallery/>} />
        <Route path='/group/post/new/:groupId' element={<PostItemNew/>} />
        <Route path='/group/post/edit/:groupId/:postId' element={<PostItemEdit/>} />
        <Route path='/group/post/:id' element={<Post/>} /> 
        <Route path='/group/post/:groupId/:postId' element={<PostItem/>} /> 
        <Route path='/group/post' element={<Post/>} />

      </Routes>
    </div>
    </BrowserRouter>
  </PostStateContext.Provider>
  </GroupStateContext.Provider>
  </LectureStateContext.Provider>
  );
}

export default App;
