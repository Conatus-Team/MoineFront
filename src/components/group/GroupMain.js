import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import MyButton from '../MyButton';
import { useNavigate } from 'react-router';
import axios from 'axios';

const GroupMain= ({originData})=> {
    const { id } = useParams();
    const navigate = useNavigate();

    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";


    const GroupRegister = () => {
        if(window.confirm("Do you want regist this group?")){
            const registerData = {
                groupId:originData.id,
                userId: 1,
            }
            alert(registerData.groupId);
            // let url = "http://localhost:3000/group/register";
            // axios.post(url,  JSON.stringify(registerData), {
            //     headers: {
            //         "Content-Type": `application/json`,
            //     },
            //     })
            //     .then((res) => {
            //     console.log(res);
            // });
            
        } else {
            alert("?????.");
        }
            

    }

    return (
      <div className="group_main">
       <div className='group_content'>
        <div className="group_thumbnail">
        <img src = {process.env.PUBLIC_URL+ `/assets${originData.thumbnail}`}/>        
        </div>
        <MyButton type = {'positive'} text ={'Register'} onClick={() => GroupRegister()}></MyButton>
        <MyButton  text="edit" type="default" onClick={()=> navigate(`/group/edit/${id}`)}></MyButton>  
    
        </div>


        <div className='group_detail'>
            <div className='group_name'>
                <p>[Group Name] </p>
                <p> {originData.groupName}</p>
            </div>
            <div className='group_people'>
                <p>[Group People]</p>
                <p> {originData.people}</p>
            </div>
            <div className='group_main_title'>
                <p>[Group Name]</p>
                <p>{originData.title}</p>
            </div>
        </div>
        
        
        
      </div>
    );
    
  };
// GroupMain.defaultProps = {
//     groupList: [],
// }

  
export default GroupMain;