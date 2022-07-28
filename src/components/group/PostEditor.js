import { useRef, useState, useContext } from "react";
import MyGroup from "../MyGroup";
import MyButton from "../MyButton";
import { useNavigate } from "react-router-dom";
import { PostDispatchContext } from "../../App";

//return date into string
const getStringDate = (date) => {
    return date.toISOString().slice(0,10);
};


const PostEditor =() => {
    const navigate = useNavigate();
    const contentRef = useRef();
    const [date, setDate] = useState(getStringDate(new Date()));
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("author6");
    const [title, setTitle] = useState("title6");
    const [groupName, setGroupName] = useState("group6");

    const {onCreate} =useContext(PostDispatchContext);


    const handleSubmit = () => {
        if(content.length <1){
            contentRef.current.focus();
            return;
        }
        onCreate(date, author, content, title, groupName);
        navigate("/", { replace: true});
    }


    return (<div className="PostEditor">
        <MyGroup group_info={"Main"} group_post={"Posts"} group_gallery={"Gallery"} group_chatting={"Chatting"}/>
        
        <div className="post_new">
            <section>
            {/*  */}
            {/* group Name */}
            <h4>Group Name: </h4>
            <div>
            <input type="hidden"
            className="post_title"
            value={groupName} onChange = {(e) => setGroupName(e.target.value)}/></div>

            
            
            <h4>User Name: </h4>
            <div>
            <input type="hidden"
            className="post_title"
            value={author} onChange = {(e) => setAuthor(e.target.value)}/></div>
            

            {/* date */}
            <h4>date: {date}  </h4>

            <div>
            <input value={date} onChange = {(e) => setDate(e.target.value)} type="date"/>
            </div>
            </section>

            {/* title */}
            <section>
                <h4>title </h4>
            <div ><input
            className="post_title"
            value={title} onChange = {(e) => setTitle(e.target.value)}/>
            </div>
            </section>
            
            {/* content */}
            <section>
            <h4>content </h4>
            <div className="post_content">
            <textarea 
            placeholder="please enter the content"
            ref={contentRef} 
            value = {content}
            onChange = {(e) => setContent(e.target.value)}/> 
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

export default PostEditor;