import React, {useContext, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyButton from "../../components/MyButton";
// import { PostStateContext } from "../../App";
import MyGroup from "../../components/MyGroup";
import axios from "axios";
import { BASE_URL } from "../../App";
const PostItem = () => {
    console.log("function enter");

    const navigate = useNavigate();
    const {postId } = useParams();
    const {groupId} = useParams(postId);
    // const postList = useContext(PostStateContext);


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
    

    
    return (<div className="post_item">
        <MyGroup id={parseInt(groupId)}/>
            <div className="post_item_header">
                <div className="post_item_author">
                <p>{postData.author}</p>
                <p className="post_item_date">{postData.date}</p>
                </div>
                <div className="post_item_button">
            <MyButton type="defalut" text="edit" onClick={()=>navigate(`/group/post/edit/${groupId}/${postId}`)}/>
            </div>
            </div>
            <div className="post_item_detail">
            <p className="post_item_title">{postData.title}</p>
            <p className="post_item_content">{postData.content}</p>
            </div>
           
        </div>
    
    );
};

export default PostItem;