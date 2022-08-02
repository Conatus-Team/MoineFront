import { useRef, useState, useContext, useEffect } from "react";
import MyGroup from "../MyGroup";
import MyButton from "../MyButton";
import { useNavigate, useParams } from "react-router-dom";
import { PostDispatchContext } from "../../App";

//return date into string
const getStringDate = (date) => {
    return date.toISOString().slice(0,10);
};


const PostEditor =({isEdit, originData, groupId, groupName}) => {
    const navigate = useNavigate();
    const contentRef = useRef();
  
    const [date, setDate] = useState(getStringDate(new Date()));
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("author6");
    const [title, setTitle] = useState("title6");

    const {onCreate, onEdit} =useContext(PostDispatchContext);


    const handleSubmit = () => {
        if(content.length <1){
            contentRef.current.focus();
            return;
        }
        if(window.confirm(isEdit? "Do you want update Post?":"Do you want write new Post")){
            if(!isEdit){
                onCreate(date, author, content, title, groupId, groupName);
            }
        
            else {
                onEdit(date, author, content, title, groupName);
            }
        }
        
        navigate(`/group/post/${originData.groupId}`, {replace: true});
    };

    useEffect(()=>{
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setAuthor(originData.author);
            setContent(originData.content);
            setTitle(originData.title);
        }
    })


    return (<div className="PostEditor">
        <MyGroup id={parseInt(groupId)}/>
        
        <div className="post_new">
            <section className="post_editor_info">
            {/* group Name */}
            <p>Group Name: {groupName}</p>
               
            <p>User Name: {author}</p>
           
            {/* date */}
            <p>date: {date}  </p>

            <div>
            {/*<input value={date} onChange = {(e) => setDate(e.target.value)} type="date"/>*/}
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