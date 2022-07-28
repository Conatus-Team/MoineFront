import React, { useEffect, useReducer, useRef } from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import PostItemNew from './pages/Post/PostItemNew';
import Edit from './pages/Post/Edit';

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
import Gallery from './pages/Post/Gallery';
import Post from './pages/Post/Post';


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
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    default:
      return state;

  }
  return newState;
};


export const GroupStateContext = React.createContext();
export const PostStateContext = React.createContext();
export const PostDispatchContext = React.createContext();


const group_dummy_data = [
  {
    id: 1,
    groupName: "cooking",
    thumbnail: "/emotion1.png",
    people: 7,
  },
  {
    id: 2,
    groupName: "sports",
    thumbnail: "/emotion2.png",
    people: 11,
  },
  {
    id: 3,
    groupName: "swimming",
    thumbnail: "/emotion3.png",
    people: 15,
  },
  {
    id: 4,
    groupName: "yummy",
    thumbnail: "/emotion4.png",
    people: 9,
  },
  {
    id: 5,
    groupName: "programming",
    thumbnail: "/emotion5.png",
    people: 4,
  }
]


const post_dummy_data = [
  {
    id: 1,
    groupName: "cooking",
    title: "title1",
    author: "author1",
    content:"content1",
    date: 1638969241915,
  },
  {
    id: 2,
    groupName: "cooking",
    title: "title2",
    author: "author2",
    content:"content2",
    date: 1638969241916,
  },
  {
    id: 3,
    groupName: "yummy",
    title: "title3",
    author: "author3",
    content:"content3",
    date: 1638969241917,
  },
  {
    id: 4,
    groupName: "yummy",
    content:"content4",
    title: "title4",
    author: "author4",
    date: 1638969241918,
  },
  {
    id: 5,
    groupName: "cooking",
    content:"content5",
    title: "title5",
    author: "author5",
    date: 1638969241919,
  }
];

function App() {
  
  const [data, dispatch] = useReducer(reducer, post_dummy_data);
  const [group_data] = useReducer(reducer, group_dummy_data);

  const dataId = useRef(0);

  //Database


    // CREATE
  const onCreate = (date, author, content, title, groupName) => {
    dispatch({
      type: "CREATE",
      data:{
        id: DOMMatrixReadOnly.current,
        date: new Date(date).getTime(),
        author,
        title,
        content,
        groupName,
      },
    });
    dataId.current +=1;
  }
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId});
  };

  //EDIT
  const onEdit = (targetId, date, author, content, title, groupName) =>{
    dispatch({
      type:"EDIT",
      data:{
        id:targetId,
        date: new Date(date).getTime(),
        author,
        title,
        content,
        groupName,
      },
    })
  }
  
  return (
    <GroupStateContext.Provider value={group_data}>
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
        <Route path='/lecture' element={<LectureList/>} />
        <Route path='/group' element={<GroupList/>} />
        <Route path='/mypage' element={<Mypage/>} />
        <Route path='/login' element={<LogIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/lecture' element={<Lecture/>} />
        <Route path='/group/info' element={<Group_main/>} />
        <Route path='/group/gallery' element={<Gallery/>} />
        <Route path='/group/post/new' element={<PostItemNew/>} />
        <Route path='/group/post/edit' element={<Edit/>} />
        {/* <Route path='/grouplist/post/:id' element={<Post/>} /> */}
        <Route path='/group/post' element={<Post/>} />

      </Routes>
    </div>
    </BrowserRouter>
  </PostDispatchContext.Provider>
  </PostStateContext.Provider>
  </GroupStateContext.Provider>
  );
}

export default App;
