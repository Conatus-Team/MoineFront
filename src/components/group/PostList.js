import React, { useEffect, useState } from 'react';
import { useParams} from "react-router-dom";
import MyButton from '../MyButton';
import { useNavigate } from 'react-router';
import PostTable from './PostTable';
const sortOptionList = [
  {value: "latest", name:"latest"},
  {value: "oldest", name:"oldest"},
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
        <MyButton type = {'positive'} text ={'new'} onClick={() => navigate(`/group/post/new/${groupId.id}`,"")}>
          
        </MyButton>

        </div>
      </div>
      <table className="Post_Table">
        <caption> Posts </caption>
        <thead> 
            <tr>
                <th> Date </th><th> title </th> <th> author </th>
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