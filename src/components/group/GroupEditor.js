import { useRef, useState, useContext, useEffect } from "react";
import MyGroup from "../MyGroup";
import MyButton from "../MyButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const GroupEditor =({isEdit, originData, groupId}) => {
    const navigate = useNavigate();  
    const [thumbnail, setThumbnail] = useState("");
    const [memberCount, setPeople] = useState("");
    const [explanation, setTitle] = useState("title");
    const [name, setGroupName] = useState("group name");

    let url="";

    const handleSubmit = () => {
        if(window.confirm(isEdit? "Do you want update Post?":"Do you want write new Post")){
            const createData = {
                thumbnail: thumbnail,
                memberCount:memberCount,
                explanation: explanation, 
                name: name,
            }
            const updateData = {
                id: groupId,
                thumbnail: thumbnail,
                memberCount:memberCount,
                explanation: explanation, 
                name: name,
            }
            if(!isEdit){
                url = `http://localhost:8083/info/${groupId}`;
                axios.put(url,  JSON.stringify(createData), {
                    headers: {
                        "Content-Type": `application/json`,
                    },
                    })
                    .then((res) => {
                    // console.log(res);
                    });
                // onCreate(date, author, content, title, groupId, groupName);
            }
        
            else {
                url = "http://localhost:8083/info";
                axios.post(url,  JSON.stringify(updateData), {
                    headers: {
                        "Content-Type": `application/json`,
                    },
                    })
                    .then((res) => {
                    // console.log(res);
                    });
                // onEdit(date, author, content, title, groupName);
            }
        }
        
        navigate(`/group`, {replace: true});
    };
    // console.log(originData);

    useEffect(()=>{
        if(isEdit){
            setThumbnail(originData.thumbnail);
            setPeople(originData.memberCount);
            setGroupName(originData.name);
            setTitle(originData.explanation);
        }
    })


    return (<div className="PostEditor">
        <MyGroup id={parseInt(groupId)}/>
        
        <div className="post_new">
            <section className="post_editor_info">

            <div>
            {/*<input value={date} onChange = {(e) => setDate(e.target.value)} type="date"/>*/}
            </div>
            </section>
            {/* group name */}
            <section>
                <h4>group name </h4>
            <div ><input
            className="post_title"
            value={name} onChange = {(e) => setGroupName(e.target.value)}/>
            </div>
            </section>

            {/* thumbnail */}
            <section>
                <h4>thumbnail </h4>
            <div ><input
            className="post_title"
            value={thumbnail} onChange = {(e) => setThumbnail(e.target.value)}/>
            </div>
            </section>


            {/* title */}
            <section>
                <h4>title </h4>
            <div ><input
            className="post_title"
            value={explanation} onChange = {(e) => setTitle(e.target.value)}/>
            </div>
            </section>

            {/* people */}
            <section>
                <h4>people </h4>
            <div ><input
            className="post_title"
            value={memberCount} onChange = {(e) => setPeople(e.target.value)}/>
            </div>
            </section>
          


            <section>
                <div className="control_box">
                    <MyButton text ={"cancel"} type={"negative"}onClick={()=> navigate(-1)}/>
                    <MyButton text ={"submit"} type={"positive"} onClick={handleSubmit}/>
                </div>
            </section>
        </div>
        
    </div>
    );
};

export default GroupEditor;