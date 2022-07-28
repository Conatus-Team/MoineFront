import React, { useState } from 'react';
import MyButton from '../MyButton';
import { useNavigate } from 'react-router';
import PostTable from './PostTable';
const sortOptionList = [
  {value: "latest", name:"latest"},
  {value: "oldest", name:"oldest"},
];

const filterOptionList = [
  {value: "cooking", name: "cooking"},
  { value: "all", name: "all"}

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
  const [filter, setFilter] = useState("all");
  
  const getProcessdPostList = () => {

    const filterCallBack = (item) =>{
      if(filter === "cooking"){
        return item.groupName === "cooking";
      } else return item.groupName !== "cooking";
    
    }

    const compare = (a,b) =>{
      if(sortType === "latest"){
        return parseInt(b.date)-parseInt(a.date);
      } else {
        return parseInt(a.date)-parseInt(b.date);
      }

    }
    const copyList = JSON.parse(JSON.stringify(postList));

    const filteredList = filter !=='cooking' ? copyList :copyList.filter((it) => filterCallBack(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  }
  
  
  return (
    <div className='PostList'>
      <div className="menu_wrapper">
        <div className='left_col'>
        <ControlMenu 
        value = {sortType} 
        onChange = {setSortType}
        optionList = {sortOptionList}/>
        <ControlMenu 
        value = {filter} 
        onChange = {setFilter}
        optionList = {filterOptionList}/>

        </div>
        <div className='right_col'>
        <MyButton type = {'positive'} text ={'new'} onClick={() => navigate('./new')}>
          
        </MyButton>

        </div>
      </div>
      <table className="Post_Table">
        <caption> Posts </caption>
        <thead> 
            <tr>
                <th> Date </th><th> title </th> <th> author </th> <th> group name </th>
            </tr>
        </thead>
        <tbody>
      {getProcessdPostList().map((it)=>(
           
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