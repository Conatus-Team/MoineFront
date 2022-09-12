import { useNavigate, useParams } from "react-router-dom";
import MyButton from "../components/MyButton";
import userThumb from "../components/Image/user_thumb.png"
const Mypage = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem('user'));


    const logout = ()=>{
        const defaultUsers = {
            userId: 0,
            userName: "Lee Hyunsun",
            email: "sunnylee7@sookmyung.ac.kr",
            userNickname: "Sunny"
        }
        sessionStorage.setItem('user', JSON.stringify(defaultUsers));
        navigate('/', {replace: true});
        window.location.reload();
    }
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
        <div className="logout">
            <MyButton type = {'default'} text ={'로그아웃'} onClick={() =>logout()}></MyButton>
        </div>

    </div>
    );
};

export default Mypage;
