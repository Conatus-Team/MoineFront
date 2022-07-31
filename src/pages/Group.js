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
        

    return(<div className="group">
        <GroupList groupList = {group_data}/>
    </div>)

}
export default Group;