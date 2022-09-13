import { useRef, useState, useContext, useEffect } from "react";
import MyGroup from "../MyGroup";
import MyButton from "../MyButton";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../App";

//return date into string
const getStringDate = (date) => {
    return date.toISOString().slice(0,10);
};


const PostEditor =({isEdit, originData, groupId}) => {
    const navigate = useNavigate();
    const contentRef = useRef();

    const [date, setDate] = useState(getStringDate(new Date()));
    const [content, setContent] = useState("");
    const author = JSON.parse(sessionStorage.getItem('user')).userNickname;
    // const [author, setAuthor] = useState(`${sessionStorage.getItem("user").userNickname}`);
    const [title, setTitle] = useState("제목");
    //const [groupName, setGroupName] =useState(originData.groupName);
    let id=0;

    if(isEdit) id = originData.id;


    let url="";


    const handleSubmit = () => {
        if(content.length <1){
            contentRef.current.focus();
            return;
        }
        if(window.confirm(isEdit? "게시글을 수정할까요?":"게시글을 생성할까요?")){

            if(!isEdit){
                const createData = {
                    date: date,
                    author: author,
                    content: content,
                    title: title,
                    groupId: groupId,
                    groupName: "", // do not delete
                    userId: 0 // do not delete
                }
                url = `${BASE_URL.group}/group/post/create`;
                // console.log('createData', createData, url);
                axios.post(url,  (createData), {
                    headers: {
                        "Content-Type": `application/json`,
                        "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
                    },
                    })
                    .then((res) => {
                    console.log(res);
                    }).catch(error => {
                        console.log(error.response)
                    });
            }

            else {
                const updateData = {
                    id: parseInt(originData.id),
                    date: date,
                    author: author,
                    content: content,
                    title: title,
                    groupId: groupId,
                    //groupName: groupName,
                }
                url = `${BASE_URL.group}/post/${originData.id}`;
                axios.patch(url,  JSON.stringify(updateData), {
                    headers: {
                        "Content-Type": `application/json`,
                        "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
                    },
                    })
                    .then((res) => {
                    console.log(res);
                    }).catch(error => {
                        console.log(error.response)
                    });
            }
        }

        navigate(`/group/post/${groupId}`, {replace: true});
    };


    useEffect(()=>{
        if(isEdit){
            setDate(originData.createdTime);
            setContent(originData.content);
            setTitle(originData.title);
        }
    },id);



    return (<div className="PostEditor">
        <MyGroup id={parseInt(groupId)}/>

        <div className="post_new">
            <section className="post_editor_info">

            <p>작성자: {author}</p>

            {/* date */}
            <p>날짜: {date}  </p>

            <div>
            {/*<input value={date} onChange = {(e) => setDate(e.target.value)} type="date"/>*/}
            </div>
            </section>

            {/* title */}
            <section>
                <h4>제목 </h4>
            <div ><input
            className="post_title"
            value={title} onChange = {(e) => setTitle(e.target.value)}/>
            </div>
            </section>

            {/* content */}
            <section>
            <h4>내용 </h4>
            <div className="post_content">
            <textarea
            placeholder="내용을 입력해 주세요"
            ref={contentRef}
            value = {content}
            onChange = {(e) => setContent(e.target.value)}/>
            </div>
            </section>


            <section>
                <div className="control_box">
                    <MyButton text ={"취소"} type={"negative"}onClick={()=> navigate(-1)}/>
                    <MyButton text ={"제출"} type={"positive"} onClick={handleSubmit}/>
                </div>
            </section>
        </div>

    </div>
    );
};

export default PostEditor;
