import { useParams } from "react-router-dom";

const Mypage = () => {
    const {id} = useParams();
    return (<div>
        <h1>MyPage</h1>
        <p>This is My page</p>
    </div>
    );
};

export default Mypage;