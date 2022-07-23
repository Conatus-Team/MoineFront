import { useParams } from "react-router-dom";
import MyGroup from "../components/MyGroup";

const Group_search = (props) => {
    const sendGroupName = () =>{
        props.getGroupName('send data to groupList');
    }
    return (
        <div group_search>
            <p></p>
            {props.groupName}
            <a onClick={ sendGroupName}>send</a>
        </div>
    )
};

export default Group_search;