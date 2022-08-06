import { useContext, useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { PostStateContext } from "../../App";
import PostEditor from "../../components/group/PostEditor";
import axios from "axios";
const PostItemEdit = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    // const [originData, setOriginData] = useState();

    // const postList = useContext(PostStateContext);
    // console.log(postId);

    // Post
    const [postData, setPostData] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:8083/group/post/${postId}`)
        .then(response => {
        setPostData(response.data);
        });
    }, []);



    // useEffect(() => {
    //     if(postList.length >= 1){
    //         const targetPost = postList.find((it)=> parseInt(it.id) === parseInt(postId));
    //         console.log(targetPost);
    //         if(targetPost) {
    //             setOriginData(targetPost);

    //         } else {
    //             navigate("/group/post",{replace: true});
    //         }
    //     }
    // }, [postId, postList]);
  
    return (<div>
        {postData && <PostEditor isEdit={true} originData={postData} groupId={postData.groupId} groupName={postData.groupName}/>}

    </div>
    );
};

export default PostItemEdit;