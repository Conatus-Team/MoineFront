import React, { useState, useEffect } from 'react';
import MyButton from '../MyButton';
import { useNavigate } from 'react-router';
import RecommendGroupList from "./RecommendGroupList";
import MyGroupList from './MyGroupList';

const GroupMain= ({originData})=> {
    const [thumbnail, setThumbnail] = useState("");
    const [people, setPeople] = useState("");
    const [title, setTitle] = useState("");
    const [groupName, setGroupName] = useState("");

    // const navigate = useNavigate();
    useEffect(()=>{
        setGroupName(originData.groupName);
        setThumbnail(originData.thumbnail);
        setPeople(originData.people);
        setTitle(originData.title);
    })
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";

    return (
      <div className="group_main">
       <div className='group_content'>
        <div className="group_thumbnail">
        <img src = {process.env.PUBLIC_URL+ `/assets${thumbnail}`}/>        
        </div>
        <MyButton type = {'positive'} text ={'Register'} onClick={() => alert('./new')}></MyButton>
        </div>


        <div className='group_detail'>
            <div className='group_name'>
                <p>[Group Name] </p>
                <p> {groupName}</p>
            </div>
            <div className='group_people'>
                <p>[Group People]</p>
                <p> {people}</p>
            </div>
            <div className='group_main_title'>
                <p>[Group Name]</p>
                <p>{title}</p>
            </div>
        </div>
        
        
        
      </div>
    );
    
  };
// GroupMain.defaultProps = {
//     groupList: [],
// }

  
export default GroupMain;