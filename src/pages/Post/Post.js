import React, {useContext, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostList from "../../components/group/PostList";
import MyGroup from "../../components/MyGroup";
import axios from "axios";
import { BASE_URL } from "../../App";

const Post = () => {
    const { id } = useParams(); //groupId
    const navigate = useNavigate();

        // Post
        const [postData, setPostData] = useState([]);
        useEffect(()=>{
            axios.get(`${BASE_URL.group}/group/${id}/post`,{
                headers: {
                    "Content-Type": `application/json`,
                    "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
                  }
            })
            .then(response => {
                setPostData(response.data);
            }).catch(error => {
                console.log(error.response)
            });
        }, []);

    return (
        <div post>
            <MyGroup id={id}/>
            <PostList postList = {postData}/>       
        </div>
    )
};

export default Post;