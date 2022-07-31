import GroupMain from "../components/group/GroupMain"
import React, {Component, useContext, useEffect, useState} from "react";
import { GroupStateContext } from "../App";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyGroup from "../components/MyGroup";


const Group_main =() =>{
    const { id } = useParams();
    const groupData = useContext(GroupStateContext);
    const [originData, setOriginData] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        if(groupData.length >= 1){
            const targetGroup = groupData.find(
                (it) => parseInt(it.id) === parseInt(id)
            );
            console.log(targetGroup);
            if(targetGroup){
                setOriginData(targetGroup);
            } else {
                navigate("/group", {replace: true});
            }
        }
    }, [id, groupData]);
        

    return(<div className="group_main">
        <MyGroup id={id}/>
        {originData && <GroupMain originData ={originData}/>}

        
    </div>)
}
export default Group_main;