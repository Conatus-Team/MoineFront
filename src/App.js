import React, { useEffect, useReducer, useRef } from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Post from './pages/Post';

//components
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';
import LectureList from './pages/LectureList';
import Mypage from './pages/Mypage';
import GroupList from './pages/GroupList';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Lecture from './pages/Lecture';
import Group_main from './pages/Group_main';
import Gallery from './pages/Gallery';


//database

const reducer = (state, action) => {
  let newState = [];
  switch (action.type){
    case "INIT":{
      return action.data;
    };
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "EDIT":{
      newState = state.map((it) =>
      it.id === action.data.id ? { ...action.data} : it);
      break;
    }
    default:
      return state;

  }
  return newState;
};
export const PostStateContext = React.createContext();
export const PostDispatchContext = React.createContext();
// const group_dummy_data = [
//   {
//     id: 1,
//     group_name: "cooking",
//     group_thumbnail: " d",
//   },
//   {
//     id: 2,
//     group_name: "tennis",
//     group_thumbnail: " d",
//   },
//   {
//     id: 3,
//     group_name: "piano",
//     group_thumbnail: " d",
//   }
// ];

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  //Database


  //CREATE
const onCreate = (date, content, userName) => {
  dispatch({
    type: "CREATE",
    data:{
      id: DOMMatrixReadOnly.current,
      date: new Date(date).getTime(),
      content,
      userName,
    },
  });
  dataId.current +=1;
}
//REMOVE
const onRemove = (targetId) => {
  dispatch({type: "REMOVE", targetId});
};

//EDIT
const onEdit = (targetId, date, content,userName) =>{
  dispatch({
    type:"EDIT",
    data:{
      id:targetId,
      date: new Date(date).getTime(),
      content,
      userName,
    },
  })
}
 
  return (
    <PostStateContext.Provider value={data}>
      <PostDispatchContext.Provider 
      value={{
        onCreate,
        onEdit,
        onRemove,
      }}>
    <BrowserRouter>
    <div className="App">
      <MyHeader head_Home={"Home"} head_lecture={"lecture"} head_group ={"Group"} head_chatting={"Chatting"} head_mypage ={"MyPage"} head_login={"LogIn"} head_signup = {"SignUp"}/>
      

      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path='/lecturelist' element={<LectureList/>} />
        <Route path='/grouplist' element={<GroupList/>} />
        <Route path='/mypage' element={<Mypage/>} />
        <Route path='/login' element={<LogIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/lecturelist/lecture' element={<Lecture/>} />
        <Route path='/grouplist/info' element={<Group_main/>} />
        <Route path='/grouplist/gallery' element={<Gallery/>} />
        <Route path='/grouplist/post/new' element={<New/>} />
        <Route path='/grouplist/post/edit' element={<Edit/>} />
        <Route path='/grouplist/post/:id' element={<Post/>} />
        <Route path='/grouplist/post' element={<Post/>} />
        {/* <Route path='/db' component = {GroupContent} exact /> */}

      </Routes>
    </div>
    </BrowserRouter>
    </PostDispatchContext.Provider>
    </PostStateContext.Provider>
  );
}

export default App;
