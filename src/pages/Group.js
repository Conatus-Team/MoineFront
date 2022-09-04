import MyGroup from "../components/MyGroup";
import GroupList from "../components/group/GroupList";
import React, {Component, useContext, useEffect, useState} from "react";
import { GroupStateContext } from "../App";
// import { RecommendGroupStateContext } from "../App";
import axios from "axios";
import { BASE_URL } from "./../App";


const Group =() =>{
    const groupList = useContext(GroupStateContext);
    const [group_data, setGroupData] = useState([]);
    

    useEffect(() => {
        axios.get(`${BASE_URL.group}/group/my`,{
            headers: {
              "Content-Type": `application/json`,
              "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
            }
          })
          .then(response => {
            const groupList2 = response.data
            // setRecommendGroupData(response.data)
            setGroupData(groupList2);
          }).catch(error => {
            console.log(error.response)
            })
        
    },[]);


    // recommend group list
    const [recommendData, setRecommendData] = useState([]);
    useEffect(() => {
        axios.get(`${BASE_URL.group}/group/recommend`,{
            headers: {
              "Content-Type": `application/json`,
              "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
            }
          })
          .then(response => {
            const recommendGroupList2 = response.data
            // setRecommendGroupData(response.data)
            setRecommendData(recommendGroupList2);
          }).catch(error => {
            console.log(error.response)
            })
        
    }, []);
        

    return(<div className="group">
        <GroupList groupList = {group_data} recommendGroupList={recommendData}/>
    </div>);
    
}
export default Group;