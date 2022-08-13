import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import MyButton from '../MyButton';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { BASE_URL } from '../../App';

const GroupMain= ({originData})=> {
    const { id } = useParams();
    const navigate = useNavigate();

    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";


    const GroupRegister = () => {
        if(window.confirm("Do you want regist this group?")){
            const registerData = {
                groupId:originData.id,
                userId: 3,
            }
            let url = `${BASE_URL.group}/group/join`;
            axios.post(url,  JSON.stringify(registerData), {
                headers: {
                    "Content-Type": `application/json`,
                },
                })
                .then((res) => {
                console.log(res);
            }).catch(error => {
                console.log(error.response)
            });
            
        } else {
            alert("?????.");
        }
            

    }

    return (
      <div className="group_main">
       <div className='group_content'>
        <div className="group_thumbnail">
        <img src = {process.env.PUBLIC_URL+ `${originData.thumbnail}`}/>        
        </div>
        <MyButton type = {'positive'} text ={'Register'} onClick={() => GroupRegister()}></MyButton>
        <MyButton  text="edit" type="default" onClick={()=> navigate(`/group/edit/${id}`)}></MyButton>  
    
        </div>


        <div className='group_detail'>
            <div className='group_name'>
                <p>[Group Name] </p>
                <p> {originData.name}</p>
            </div>
            <div className='group_people'>
                <p>[Group People]</p>
                <p> {originData.memberCount}</p>
            </div>
            <div className='group_main_title'>
                <p>[Group Detail]</p>
                <p>{originData.explanation}</p>
            </div>
        </div>
        
        
        
      </div>
    );
    
  };

  
export default GroupMain;