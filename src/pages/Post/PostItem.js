import React, {useContext, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyButton from "../../components/MyButton";
import { PostStateContext } from "../../App";
import MyGroup from "../../components/MyGroup";
const PostItem = () => {
    console.log("function enter");

    const navigate = useNavigate();
    const {postId } = useParams();
    const {groupId} = useParams(postId);
    const postList = useContext(PostStateContext);
    const [postData, setPostData] = useState([]);

    useEffect (() =>{
        console.log('enter');
        if(postList.length >= 2){
            // console.log(1);

            const targetPost = postList.find(
                (it)=> parseInt(it.id) === parseInt(postId)
                );
                // console.log('postId: ',postId);

            // console.log('targetPost: ',targetPost);
            if(targetPost){
                setPostData(targetPost);
                // console.log(postData);           
            } else {
                navigate(`/group/post${groupId}`);
            }

        }

    }, [postId,groupId,postData, postList, setPostData]);
    

    useEffect(()=>{
        //  console.log(postData);
     }, [postData]);
    // const data = JSON.parse(JSON.stringify(postData));
    
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