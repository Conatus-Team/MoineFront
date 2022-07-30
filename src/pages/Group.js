import MyGroup from "../components/MyGroup";
import GroupList from "../components/group/GroupList";
import React, {Component, useContext, useEffect, useState} from "react";
import { GroupStateContext } from "../App";


const Group =() =>{
    const groupList = useContext(GroupStateContext);
    const [group_data, setGroupData] = useState([]);

    useEffect(()=>{
        setGroupData(groupList);
    },[groupList]);
        
    useEffect(()=>{
        console.log(group_data);
    },[group_data]);
        

    return(<div className="group">
        <MyGroup group_info={"Main"} group_post={"Posts"} group_gallery={"Gallery"} group_chatting={"Chatting"}/>
        <GroupList groupList = {group_data}/>
    </div>)

}
export default Group;