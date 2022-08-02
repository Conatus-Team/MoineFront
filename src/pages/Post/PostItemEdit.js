import { useContext, useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { PostStateContext } from "../../App";
import PostEditor from "../../components/group/PostEditor";
const PostItemEdit = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [originData, setOriginData] = useState();

    const postList = useContext(PostStateContext);
    console.log(postId);


    useEffect(() => {
        if(postList.length >= 1){
            const targetPost = postList.find((it)=> parseInt(it.id) === parseInt(postId));
            console.log(targetPost);
            if(targetPost) {
                setOriginData(targetPost);

            } else {
                navigate("/group/post",{replace: true});
            }
        }
    }, [postId, postList]);
  
    return (<div>
        {originData && <PostEditor isEdit={true} originData={originData} groupId={originData.groupId} groupName={originData.groupName}/>}

    </div>
    );
};

export default PostItemEdit;