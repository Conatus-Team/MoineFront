import { useContext } from "react";
import { useParams } from "react-router-dom";
import PostEditor from "../../components/group/PostEditor";
import { GroupStateContext } from "../../App";
const PostItemNew = () => {
    const {groupId} =useParams();
    const groupList = useContext(GroupStateContext);

    const targetPost = groupList.find(
        (it)=> parseInt(it.id) === parseInt(groupId)
        );
        const groupName = targetPost.groupName;
            

    return (<div>
        <PostEditor groupId={groupId} groupName={groupName}/>
    </div>)
};

export default PostItemNew;