import React, { useEffect, useState } from 'react';
import { useParams} from "react-router-dom";
import MyButton from '../MyButton';
import { useNavigate } from 'react-router';
import PostTable from './PostTable';
const sortOptionList = [
  {value: "latest", name:"최신순"},
  {value: "oldest", name:"오래된순"},
];


const ControlMenu = ({value, onChange, optionList}) =>{
  return (
  <select
    className="ControlMenu"
    value={value} onChange={(e) => onChange(e.target.value)}>
    {optionList.map((it,idx) =>
     <option key={idx} value={it.value}>
      {it.name}
      </option>)}
  </select>
  );
};


const PostList= ({postList})=> {


  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const groupId = useParams();

  const getProcessdPostList = () => {
  const compare = (a,b) =>{
       if(sortType === "latest"){
               return parseInt(b.date)-parseInt(a.date);
       } else {
         return parseInt(a.date)-parseInt(b.date);
       }
     }
     const copyList = JSON.parse(JSON.stringify(postList));

     const sortedList = copyList.sort(compare);
     return sortedList;
   }

  useEffect(()=>{
    postList.reverse()
  },[sortType, setSortType])


  return (
    <div className='PostList'>
      <div className="menu_wrapper">
        <div className='left_col'>
         <ControlMenu
        value = {sortType}
        onChange = {setSortType}
        optionList = {sortOptionList}/>


        </div>
        <div className='right_col'>
        <MyButton type = {'positive'} text ={'게시글 작성'} onClick={() => navigate(`/group/post/new/${groupId.id}`,"")}>

        </MyButton>

        </div>
      </div>
      <table className="Post_Table">
        <caption> 게시글 목록 </caption>
        <thead>
            <tr>
                <th> 날짜 </th><th> 제목 </th> <th> 작성자 </th>
            </tr>
        </thead>
        <tbody>
      {postList.map((it)=>(
        <PostTable key = {it.id} {...it}/>
      ))}
       </tbody>
    </table>
    </div>
  );

};
PostList.defaultProps = {
  postList: [],
}

export default PostList;
