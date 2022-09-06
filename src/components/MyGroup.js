import { useContext, useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { BASE_URL, GroupStateContext } from "../App";
const MyGroup = ({id}) => {
    const navigate = useNavigate();

    return <header className="group_header">
        <div className="group_main" onClick={()=>{ navigate(`/group/main/${id}`);}}>
            모임 소개
        </div>
        <div className="group_post"  onClick={()=>{ navigate(`/group/post/${id}`);}}>
            게시판
        </div>
        <div className="group_gallery"  onClick={()=>{ navigate(`/group/gallery/${id}`);}}>
            사진첩
        </div>
        {/* <div className="head_chatting"  onClick={()=>{ navigate(`${BASE_URL.chatting}/chatting/${id}`);}}> */}
        <div className="group_head_chatting">
        <a href={`${BASE_URL.chattingFront}/enter/${JSON.parse(sessionStorage.getItem('user')).userId}?groupId=${id}`}>모임 채팅방</a>
        </div>
         </header>
}

export default MyGroup;
