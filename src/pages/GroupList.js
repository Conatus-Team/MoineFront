import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { PostStateContext } from "../App";
import MyGroup from "../components/MyGroup";
import React from "react";
import Groups from "./Group_main";
import Group_search from "./Group_search";

const GroupList = (text) => {
    const {id} = useParams();
    const [groupName, setGroupName] = useState([]);
    // useEffect(() => {
    //     getGroupList().then(docs => {

    //     })
    // })
    // const groups = useContext(PostStateContext);
    const getGroupName = (text) => {
        setGroupName(text);
    }
    
    return (
        <div className="GroupList">
        <MyGroup group_info={"Main"} group_post={"Posts"} group_gallery={"Gallery"} group_chatting={"Chatting"}/>
        <div className="groups">
            <Groups value = {text} getGroupName = {getGroupName} />
            {groupName}
        </div>
    </div>
    );
};


// class GroupLists extends Component {
//     id=2
//     state = {
//         information: [
//             {

//             }
//         ]
//     }
// }


export default GroupList;