import MyGroup from "../../components/MyGroup";
import MyButton from "../../components/MyButton";
import { useNavigate } from "react-router-dom";
const PostItem = () => {
    return (<div>
        <MyGroup group_info={"Main"} group_post={"Posts"} group_gallery={"Gallery"} group_chatting={"Chatting"}/>
        <h1>New</h1>
        <p>This is Post Item page</p>
    </div>
    );
};

export default PostItem;