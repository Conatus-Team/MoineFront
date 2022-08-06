import MyGroup from "../components/MyGroup";
import GroupList from "../components/group/GroupList";
import React, {Component, useContext, useEffect, useState} from "react";
import { GroupStateContext } from "../App";
import { RecommendGroupStateContext } from "../App";



const Group =() =>{
    const groupList = useContext(GroupStateContext);
    const [group_data, setGroupData] = useState([]);

    useEffect(()=>{
        setGroupData(groupList);
    },[groupList]);


    const recommendGroupList = useContext(RecommendGroupStateContext);
    const [recommendData, setRecommendData] = useState([]);
    useEffect(() => {
        setRecommendData(recommendGroupList);
    }, [recommendGroupList]);
        

    return(<div className="group">
        <GroupList groupList = {group_data} recommendGroupList={recommendData}/>
    </div>)

}
export default Group;