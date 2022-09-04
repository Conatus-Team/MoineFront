import GroupMain from "./../../components/group/GroupMain"
import React, {Component, useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyGroup from "../../components/MyGroup";
import axios from "axios";
import { BASE_URL } from "../../App";


const Group_main =() =>{
    const { id } = useParams();
    const [originData, setOriginData] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(`${BASE_URL.group}/info/${id}`,{
          headers: {
            "Content-Type": `application/json`,
            "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
          }
        })
        .then(response => {
            setOriginData(response.data)
        }).catch(error => {
          console.log(error.response);
          navigate("/group", {replace: true});
      });
      }, []);
        
    
    return(<div className="group_main">
        <MyGroup id={id}/>
        {originData && <GroupMain originData ={originData}/>}

        
    </div>)
}
export default Group_main;