import React, {useContext, useEffect, useState} from "react";
import PostList from "../../components/group/PostList";
import { PostStateContext } from "../../App";
import MyGroup from "../../components/MyGroup";

const Post = () => {
    const postList = useContext(PostStateContext);
    const [data, setData] = useState([]);

    useEffect(()=>{
        setData(postList);
    },[postList]);

    useEffect(()=>{
        console.log(data);
    },[data]);

    return (
        <div post>
            <MyGroup group_info={"Main"} group_post={"Posts"} group_gallery={"Gallery"} group_chatting={"Chatting"}/>
            <PostList postList = {data}/>
            
            <p></p>
            
        </div>
    )
};

export default Post;