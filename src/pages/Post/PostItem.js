import React, {useContext, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyButton from "../../components/MyButton";
import { PostStateContext } from "../../App";
import MyGroup from "../../components/MyGroup";
const PostItem = () => {
    const navigate = useNavigate();
    const {postId } = useParams();
    const {groupId} = useParams(postId);
    const postList = useContext(PostStateContext);
    const [postData, setPostData] = useState();
    // console.log( 'groupId', groupId, 'postId', postId);

    useEffect(() => {
        console.log('enter');
        if(postList.length >= 1){
            const targetPost = postList.find((it)=> parseInt(it.id) === parseInt(postId));
            console.log('targetPost: '.targetPost);
            if(targetPost) {
                setPostData(targetPost);

            } else {
                navigate(-1);
            }
        }
    }, [postId, postList]);
    
    console.log(postData);
    const data = JSON.parse(JSON.stringify(postData));

    return (<div className="post_item">
        <MyGroup id={parseInt(groupId)}/>
        <div className="author">
            <p>{data.author}</p>
            <p>{data.date}</p>
            <p>{data.title}</p>
            <p>{data.content}</p>
        </div>
    </div>
    );
};

export default PostItem;