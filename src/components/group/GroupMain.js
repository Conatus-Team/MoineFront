import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import MyButton from '../MyButton';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { BASE_URL } from '../../App';
import defaultThumbnail from "./../Image/noimage_darkgreen.png";


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
            confrim = res.data;
            if (confrim === false){

                alert("모임에 가입되었습니다.");

            } else{
                alert("이미 가입한 모임입니다.");
            }
        }).catch(error => {
            console.log(error.response)
        });


    }




    return (
      <div className="group_main">
       <div className='group_content'>
        <div className="group_thumbnail">
        {originData.thumbnail === "" ? <img src = {defaultThumbnail}/>: <img src = {process.env.PUBLIC_URL+ `${originData.thumbnail}`}/>}
        
        </div>

        <MyButton type = {'positive'} text ={'가입하기'} onClick={() => GroupRegister()}></MyButton>

        {
            originData.leaderId == JSON.parse(sessionStorage.getItem('user')).userId
            ? <MyButton  text="수정" type="default" onClick={()=> navigate(`/group/edit/${id}`)}></MyButton>
            : null
        }
        </div>


        <div className='group_detail'>
            <div className='group_name'>
                <p>[모임 이름] </p>
                <p> {originData.name}</p>
            </div>
            <div className='group_people'>
                <p>[인원 수]</p>
                <p> {originData.memberCount}</p>
            </div>
            <div className='group_main_title'>
                <p>[모임 소개]</p>
                <p>{originData.explanation}</p>
            </div>
        </div>



      </div>
    );

  };


export default GroupMain;
