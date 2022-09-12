import { useNavigate } from "react-router-dom";
import Moine from "../components/Image/Moine.png";
import Logo from "../components/Image/Logo396x196.png"

const Default = () =>{
    const navigate = useNavigate();


    return(<div className="default">

        <div className="default_component">

        <div className="default_login" onClick={()=>{ navigate("/login");}}>
            <p>로그인</p>
        </div>
        <div className="default_signup" onClick={()=>{ navigate("/signup");}}>
           <p>회원가입</p>
        </div>
        </div>
        <img src = {Moine}/>
        <div className="moine_logo">
         <img src = {Logo}/>
        </div>
    </div>)
}

export default Default;
