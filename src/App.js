import React, { useEffect, useReducer, useRef } from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

import Home from './pages/Home';

//Lecture
import Lecture from './pages/Lecture';
import LectureDetail from "./components/lecture/LectureDetail";

//Group
import Group from './pages/Group';
import Group_main from './pages/Group_main';
import Groups from './components/group/Groups';
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

export const LectureStateContext = React.createContext();
export const GroupStateContext = React.createContext();
export const PostStateContext = React.createContext();
export const PostDispatchContext = React.createContext();



const lecture_dummy_data = [
  {
    id: 1,
    lectureName: "cooking",
    thumbnail: "/emotion1.png",
    title: "title1",
    content:"this lecture is.....",
    teacher: 7,
    count: 5,
    price:1000,
    date: 1638969241915,
    link: "http://naver.com",
  },
  {
    id: 2,
    lectureName: "cooking",
    thumbnail: "/emotion2.png",
    title: "title2",
    content:"this lecture is.....",
    teacher: 7,
    count: 5,
    price:2000,
    date: 1638969241916,
    link: "http://naver.com",
  },
  {
    id: 3,
    lectureName: "cooking",
    thumbnail: "/emotion3.png",
    title: "title3",
    content:"this lecture is.....",
    teacher: 7,
    count: 5,
    price:50000,
    date: 1638969241917,
    link: "http://naver.com",
  },
  
]


const group_dummy_data = [
  {
    id: 1,
    groupName: "cooking",
    thumbnail: "/emotion1.png",
    title: "Enjoy cooking!",
    people: 7,
  },
  {
    id: 2,
    groupName: "sports",
    thumbnail: "/emotion2.png",
    title: "Enjoy sports!",
    people: 11,
  },
  {
    id: 3,
    groupName: "swimming",
    thumbnail: "/emotion3.png",
    title: "Enjoy cswimming!",
    people: 15,
  },
  {
    id: 4,
    groupName: "yummy",
    thumbnail: "/emotion4.png",
    title: "Enjoy cook",
    people: 9,
  },
  {
    id: 5,
    groupName: "programming",
    thumbnail: "/emotion5.png",
    title: "Enjoy programming!",
    people: 4,
  }
]


const post_dummy_data = [
  {
    id: 1,
    groupId:1,
    groupName: "cooking",
    title: "title1",
    author: "author1",
    content:"content1",
    date: 1638969241915,
  },
  {
    id: 2,
    groupId: 1,
    groupName: "cooking",
    title: "title2",
    author: "author2",
    content:"content2",
    date: 1638969241916,
  },
  {
    id: 3,
    groupName: "yummy",
    groupId:4,
    title: "title3",
    author: "author3",
    content:"content3",
    date: 1638969241917,
  },
  {
    id: 4,
    groupName: "yummy",
    groupId:4,
    content:"content4",
    title: "title4",
    author: "author4",
    date: 1638969241918,
  },
  {
    id: 5,
    groupName: "cooking",
    groupId: 1,
    content:"content5",
    title: "title5",
    author: "author5",
    date: 1638969241919,
  }
];

function App() {
  
  const [data, dispatch] = useReducer(reducer, post_dummy_data);
  const [group_data] = useReducer(reducer, group_dummy_data);
  const [lecture_data] = useReducer(reducer, lecture_dummy_data);


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
    <LectureStateContext.Provider value={lecture_data}>
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
        <Route path='/lecture' element={<Lecture/>} />
        <Route path='/lecture/:id' element={<LectureDetail/>} />
        <Route path='/group' element={<Group/>} />
        <Route path='/mypage' element={<Mypage/>} />
        <Route path='/login' element={<LogIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/lecture' element={<Lecture/>} />
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
  </PostDispatchContext.Provider>
  </PostStateContext.Provider>
  </GroupStateContext.Provider>
  </LectureStateContext.Provider>
  );
}

export default App;
