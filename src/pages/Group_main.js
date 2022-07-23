import { useParams } from "react-router-dom";
import MyGroup from "../components/MyGroup";
import React, {Component} from "react";

const Group_main = (props) => {
    const sendGroupName = () =>{
        props.getGroupName('send data to groupList');
    }
    return (
        <div group_main>
            <p></p>
            {props.groupName}
            <a onClick={ sendGroupName}>send</a>
        </div>
    )
};

export default Group_main;