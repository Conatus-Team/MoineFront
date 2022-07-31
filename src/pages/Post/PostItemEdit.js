import { useContext, useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { PostStateContext } from "../../App";
import PostEditor from "../../components/group/PostEditor";
const PostItemEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [originData, setOriginData] = useState();

    const postList = useContext(PostStateContext);
    console.log(id);


    useEffect(() => {
        if(postList.length >= 1){
            const targetPost = postList.find((it)=> parseInt(it.id) === parseInt(id));
            console.log(targetPost);
            if(targetPost) {
                setOriginData(targetPost);

            } else {
                navigate("/group/post",{replace: true});
            }
        }
    }, [id, postList]);
  
    return (<div>
        {originData && <PostEditor isEdit={true} originData={originData}/>}

    </div>
    );
};

export default PostItemEdit;