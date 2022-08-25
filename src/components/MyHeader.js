import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";

const MyHeader = ({head_Home, head_lecture, head_group, head_mypage, head_chatting}) => {
    const navigate = useNavigate();
    //if(JSON.parse(sessionStorage.getItem('user')).userId==0) navigate("/");

    return <header>
        <div className="head_Home" onClick={()=>{  navigate("/home");}}>
            {head_Home}
        </div>
        <div className="head_lecture" onClick={()=>{ navigate("/lecture");}}>
            {head_lecture}
        </div>
        <div className="head_group" onClick={()=>{ navigate("/group");}}>
            {head_group}
        </div>
        <div className="head_mypage" onClick={()=>{ navigate("/mypage");}}>
            {head_mypage}
        </div>
        <div className="head_chatting" >
            <a href={`${BASE_URL.chatting}/room`}>{head_chatting}</a>
        </div>
        
         </header>
}

export default MyHeader;