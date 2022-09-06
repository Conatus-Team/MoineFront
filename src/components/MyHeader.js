import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";

const MyHeader = ({head_Home, head_lecture, head_group, head_mypage, head_chatting}) => {
    const navigate = useNavigate();
    //if(JSON.parse(sessionStorage.getItem('user')).userId==0) navigate("/");

    return <header>
        <div className="head_Home" onClick={()=>{  navigate("/home");}}>
            {홈 화면}
        </div>
        <div className="head_lecture" onClick={()=>{ navigate("/lecture");}}>
            {강의}
        </div>
        <div className="head_group" onClick={()=>{ navigate("/group");}}>
            {모임}
        </div>
        <div className="head_mypage" onClick={()=>{ navigate("/mypage");}}>
            {내 정보}
        </div>
        <div className="head_chatting" >
            <a href={`${BASE_URL.chattingFront}/enter/${JSON.parse(sessionStorage.getItem('user')).userId}`}>{채팅}</a>
        </div>

         </header>
}

export default MyHeader;
