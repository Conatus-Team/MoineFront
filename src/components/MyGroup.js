import { useContext, useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { BASE_URL, GroupStateContext } from "../App";
const MyGroup = ({id}) => {
    const navigate = useNavigate();

    return <header className="group_header">
        <div className="group_main" onClick={()=>{ navigate(`/group/main/${id}`);}}>
            group_info
        </div>
        <div className="group_post"  onClick={()=>{ navigate(`/group/post/${id}`);}}>
            group_post
        </div>
        <div className="group_gallery"  onClick={()=>{ navigate(`/group/gallery/${id}`);}}>
            group_gallery
        </div>
        {/* <div className="head_chatting"  onClick={()=>{ navigate(`${BASE_URL.chatting}/chatting/${id}`);}}> */}
        <div className="group_head_chatting">
        <a href={`${BASE_URL.chattingFront}/enter/${JSON.parse(sessionStorage.getItem('user')).userId}?groupId=${id}`}>group_chatting</a>
        </div>
         </header>
}

export default MyGroup;

