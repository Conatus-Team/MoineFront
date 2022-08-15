import { useParams } from "react-router-dom";
import PostEditor from "../../components/group/PostEditor";
const PostItemNew = () => {
    const {groupId} =useParams();

    return (<div>
        {<PostEditor isEdit={false} groupId={groupId} />}
    </div>)
};

export default PostItemNew;