import { useNavigate } from "react-router-dom";
import Moine from "../components/Image/Moine.png";

const Default = () =>{
    const navigate = useNavigate();
   

    return(<div className="default">
        
        <div className="default_component">
            
        <div className="default_login" onClick={()=>{ navigate("/login");}}>
            <p>LogIn</p>
        </div>
        <div className="default_signup" onClick={()=>{ navigate("/signup");}}>
           <p>SignUp</p>
        </div>
        </div>
        <img src = {Moine}/>
    </div>)
}

export default Default;