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
        let confrim = false;
        axios.post(`${BASE_URL.group}/group/join/${id}`,  null, {
            headers: {
                "Content-Type": `application/json`,
                "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
            },
            })
            .then((res) => {
            console.log(res);
            confrim = res.data.joined;
        }).catch(error => {
            console.log(error.response)
        });

        if (confirm == false){
         
            alert("register successed");
            
        } else{
            alert("you have already registered!");
        }
    }
            

    

    return (
      <div className="group_main">
       <div className='group_content'>
        <div className="group_thumbnail">
        <img src = {process.env.PUBLIC_URL+ `${originData.thumbnail}`}/>        
        </div>

        <MyButton type = {'positive'} text ={'Register'} onClick={() => GroupRegister()}></MyButton>

        {
            originData.leaderId == JSON.parse(sessionStorage.getItem('user')).userId
            ? <MyButton  text="edit" type="default" onClick={()=> navigate(`/group/edit/${id}`)}></MyButton>  
            : null
        }
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