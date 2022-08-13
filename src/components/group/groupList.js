import React, { useState } from 'react';
import MyButton from '../MyButton';
import { useNavigate } from 'react-router';
import GroupListTemp from './GroupListTemp';
import GroupSearch from './GroupSearch';

const GroupList= ({groupList, recommendGroupList})=> {
  const navigate = useNavigate();
  console.log(groupList);

    // const navigate = useNavigate();

    return (
      <div className="GroupList">
        <GroupSearch/>     

        <p className='group_title'> Recommend Group List</p>
        <div className='groupList'>
             {recommendGroupList.map((it) => (
                <GroupListTemp key = {it.id} {...it}/>
             ))}

        </div>
        <p className='group_title'> My Group List</p>



        <div className="groupList">
        {groupList.map((it) =>(
          <GroupListTemp key = {it.id} {...it}/>
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