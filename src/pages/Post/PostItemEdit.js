import { useContext, useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { BASE_URL, PostStateContext } from "../../App";
import PostEditor from "../../components/group/PostEditor";
import axios from "axios";
const PostItemEdit = () => {
    const navigate = useNavigate();
    const { postId } = useParams();

    // Post
    const [postData, setPostData] = useState([]);
    useEffect(()=>{
        axios.get(`${BASE_URL.group}/post/${postId}`)
        .then(response => {
        setPostData(response.data);
        }).catch(error => {
            console.log(error.response)
        });
    }, []);
  
    return (<div>
        {postData && <PostEditor isEdit={true} originData={postData} groupId={postData.groupId} />}

    </div>
    );
};

export default PostItemEdit;