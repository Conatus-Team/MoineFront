import { useNavigate } from "react-router-dom";

const MyHeader = ({head_Home, head_lecture, head_group, head_mypage, head_chatting, head_login, head_signup}) => {
    const navigate = useNavigate();

    return <header>
        <div className="head_Home" onClick={()=>{  navigate("/home");}}>
            {head_Home}
        </div>
        <div className="head_lecture" onClick={()=>{ navigate("/lecturelist");}}>
            {head_lecture}
        </div>
        <div className="head_group" onClick={()=>{ navigate("/grouplist");}}>
            {head_group}
        </div>
        <div className="head_mypage" onClick={()=>{ navigate("/mypage");}}>
            {head_mypage}
        </div>
        <div className="head_chatting" onClick={()=>{ navigate("/chatting");}}>
            {head_chatting}
        </div>
        <div className="head_login" onClick={()=>{ navigate("/login");}}>
            {head_login}
        </div>
        <div className="head_signup" onClick={()=>{ navigate("/signup");}}>
            {head_signup}
        </div>
         </header>
}

export default MyHeader;