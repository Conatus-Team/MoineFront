import { useRef, useState, useContext, useEffect } from "react";
import MyGroup from "../MyGroup";
import MyButton from "../MyButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../App";

const GroupEditor =({isEdit, originData, groupId}) => {
    const navigate = useNavigate();
    const [thumbnail, setThumbnail] = useState("");
    const [explanation, setTitle] = useState("모임 설명");
    const [name, setGroupName] = useState("모임 이름");
    const [category, setCategory] = useState("ex) 요리");

    let url="";

    const handleSubmit = () => {
        if(window.confirm(isEdit? "모임 설정을 적용하시겠습니까?":"새로운 모임을 만드시겠습니까?")){
            if(!isEdit){
                const createData = {
                    thumbnail: thumbnail,
                    explanation: explanation,
                    name: name,
                }
                url = `${BASE_URL.group}/group/create`;
                axios.post(url,  JSON.stringify(createData), {
                    headers: {
                        "Content-Type": `application/json`,
                        "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
                    },
                    })
                    .then((res) => {
                    }).catch(error => {
                        console.log(error.response)
                    });
            }

            else {
                const updateData = {
                    id: groupId,
                    thumbnail: thumbnail,
                    explanation: explanation,
                    category: category,
                    name: name,
                }
                url = `${BASE_URL.group}/info/${groupId}`;
                axios.patch(url,  JSON.stringify(updateData), {
                    headers: {
                        "Content-Type": `application/json`,
                        "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
                    },
                    })
                    .then((res) => {
                    }).catch(error => {
                        console.log(error.response)
                    });
            }
        }

        navigate(`/group`, {replace: true});
        window.location.reload();
    };

    useEffect(()=>{
        if(isEdit){
            setThumbnail(originData.thumbnail);
            setGroupName(originData.name);
            setTitle(originData.explanation);
            setCategory(originData.category);
        }
    },groupId)


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
                <h4>모임 이름 </h4>
            <div ><input
            className="post_title"
            value={name} placeholder ={name} onChange = {(e) => setGroupName(e.target.value)}/>
            </div>
            </section>

            {/* thumbnail */}
            <section>
                <h4>썸네일 </h4>
            <div ><input
            className="post_title"
            value={thumbnail} onChange = {(e) => setThumbnail(e.target.value)}/>
            </div>
            </section>


            {/* title */}
            <section>
                <h4>모임 설명</h4>
            <div ><input
            className="post_title"
            value = {explanation} placeholder ={explanation} onChange = {(e) => setTitle(e.target.value)}/>
            </div>
            </section>

            {/* category */}
            <section>
                <h4>취미 분야</h4>
            <div ><input
            className="post_title"
            value = {category} placeholder = {category} onChange = {(e) => setCategory(e.target.value)}/>
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

export default GroupEditor;
