import { useParams } from "react-router-dom";
import MyGroup from "../components/MyGroup";

const Gallery = () => {
    const {id} = useParams();
    return (<div className="gallery">
        <MyGroup group_info={"Main"} group_post={"Posts"} group_gallery={"Gallery"} group_chatting={"Chatting"}/>
        <h1>Gallery</h1>
        <p>This is Gallery page</p>
    </div>
    );
};

export default Gallery;