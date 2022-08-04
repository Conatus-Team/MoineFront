import React, { useState } from 'react';
import MyButton from '../MyButton';
import { useNavigate } from 'react-router';
import RecommendGroupList from "./RecommendGroupList";
import MyGroupList from './MyGroupList';
import GroupSearch from './GroupSearch';

const GroupList= ({groupList})=> {
  const navigate = useNavigate();

    // const navigate = useNavigate();

    return (
      <div className="GroupList">
        <GroupSearch/>     


        <p className='group_title'> Recommend Group List</p>
        <div className="RecommendGroupList">
        
             {groupList.map((it) => (
                <RecommendGroupList key = {it.id} {...it}/>
             ))}
        </div>
        <p className='group_title'> My Group List</p>
        <div className="MyGroupList">
        
        
        {groupList.map((it) =>(
          <MyGroupList key = {it.id} {...it}/>
          ))}
          <div className="group_list_new">
          <MyButton  text="new" type="default" onClick={()=> navigate("./new")}></MyButton>   

          </div>
          
    
        </div>
      </div>
    );
    
  };
GroupList.defaultProps = {
    groupList: [],
}

  
export default GroupList;