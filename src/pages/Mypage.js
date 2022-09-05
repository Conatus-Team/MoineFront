import { useParams } from "react-router-dom";
import userThumb from "../components/Image/user_thumb.png"
const Mypage = () => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    return (<div className="mypage">
        <h1>MyPage</h1>
        <div className="user_default">
            <div className="user_image">
            <img src={userThumb}/>
            </div>
            <div className="user_data">
            <p>{userData.userName}</p>
            <p>- {userData.userNickname} -</p>
            <p>{userData.email}</p>
            </div>

        </div>
        <div className="user_content">
            {/* user survey data */}
        </div>
        
    </div>
    );
};

export default Mypage;