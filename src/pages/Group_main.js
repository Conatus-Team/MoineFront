// import { useParams } from "react-router-dom";
import GroupList from "../components/group/GroupList";
import React, {Component, useContext, useEffect, useState} from "react";
// import GroupList from "../components/group/GroupContentList";
import { GroupStateContext } from "../App";


const Group_main =() =>{
    const groupList = useContext(GroupStateContext);
    const [group_data, setGroupData] = useState([]);

    useEffect(()=>{
        setGroupData(groupList);
    },[groupList]);
        
    useEffect(()=>{
        console.log(group_data);
    },[group_data]);
        

    return(<div group_main>
        <GroupList groupList = {group_data}/>
    </div>)

}
export default Group_main;