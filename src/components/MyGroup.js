import { useNavigate } from "react-router-dom";

const MyGroup = ({group_info, group_post, group_gallery, group_chatting}) => {
    const navigate = useNavigate();
    return <header className="group_header">
        <div className="group_info" onClick={()=>{ navigate("/group");}}>
            {group_info}
        </div>
        <div className="group_post"  onClick={()=>{ navigate("/group/post");}}>
            {group_post}
        </div>
        <div className="group_gallery"  onClick={()=>{ navigate("/group/gallery");}}>
            {group_gallery}
        </div>
        <div className="head_chatting"  onClick={()=>{ navigate("/chatting");}}>
            {group_chatting}
        </div>
         </header>
}

export default MyGroup;