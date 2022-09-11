import { useParams } from "react-router-dom";
import userThumb from "../components/Image/user_thumb.png"
const Mypage = () => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    return (<div className="mypage">
        <h1>내 정보</h1>
        <div className="user_default">
            <div className="user_image">
            <img src={userThumb}/>
            </div>
            <div className="user_data">
            <p>이름: {userData.userName}</p>
            <p>닉네임: {userData.userNickname}</p>
            <p>이메일: {userData.email}</p>

            </div>

        </div>
        <div className="user_content">
            {/* user survey data */}
        </div>

    </div>
    );
};

export default Mypage;
