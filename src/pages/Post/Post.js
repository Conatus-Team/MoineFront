import React, {useContext, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostList from "../../components/group/PostList";
// import { PostStateContext } from "../../App";
import MyGroup from "../../components/MyGroup";
// import { GroupStateContext } from "../../App";
import axios from "axios";

const Post = () => {
    const { id } = useParams(); //groupId
    const navigate = useNavigate();

  
    // const [groupOriginData, setGroupOriginData] = useState();

    // const groupData = useContext(GroupStateContext);
    console.log(id);


    // useEffect(() => {
    //     if(groupData.length >= 1){
    //         const targetPost = postList.find((it)=> parseInt(it.id) === parseInt(id));
    //     // console.log(targetPost);
    //     if(targetPost) {
    //         setGroupOriginData(targetPost);

    //     } else {
    //         navigate("/group",{replace: true});
    //     }
    //     }
    // }, [id, groupData]);
  
    // const postList = useContext(PostStateContext);
    // const [data, setData] = useState([]);

        // Post
        const [postData, setPostData] = useState([]);
        useEffect(()=>{
            axios.get(`http://localhost:8083/${id}`)
            .then(response => {
            setPostData(response.data);
            });
        }, [postData, setPostData]);

    return (
        <div post>
            <MyGroup id={id}/>
            <PostList postList = {postData}/>
                        
        </div>
    )
};

export default Post;