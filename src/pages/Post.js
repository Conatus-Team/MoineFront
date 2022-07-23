import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import Tr from './Post/Tr';
import Modal from './Post/Modal';
import { useParams } from "react-router-dom";
import MyGroup from "../components/MyGroup";

const Post = ({}) => {
    
    // const {id} = useParams();
    const [info, setInfo] = useState([]);
    const [selected, setSelected] = useState('');
    const [modalOn, setModalOn] = useState(false);

    const nextId = useRef(11);
    useEffect(()=>{
        axios.get('../../public/assets')
    .then(res => setInfo(res.data))
    .catch(err => console.log(err));
    }, []);

    const handleSave = (data) =>{
        if(data.id){
            setInfo(
                info.map(row => data.id === row.id ? {
                    id: data.id,
                    groupName: data.groupName,
                    thumbnail: data.thumbnail,
                    author: data.author,
                    content: data.content,
                } :  row)
            )
        } else{
            setInfo(info => info.concat(
                {
                    id: nextId.current,
                    groupName: data.groupName,
                    thumbnail: data.thumbnail,
                    author: data.author,
                    content: data.content,

                }
            ))
            nextId.current +=1;
        }
    }

    const handleRemove = (id) => {
        setInfo(info => info.filter(item => item.id !== id));
    }

    const handleEdit = (item) => {
        setModalOn(true);
        const selectedData = {
            id: item.id,
            groupName: item.groupName,
            thumbnail: item.thumbnail,
            author: item.author,
            content: item.content,
        };
        console.log(selectedData);
        setSelected(selectedData);
    };

    const handleCancel = () =>{
        setModalOn(false);
    }
    const handleEditSubmit = (item) => {
        console.log(item);
        handleSave(item);
        setModalOn(false);
    }


    return (<div className="Post">
        <MyGroup group_info={"Main"} group_post={"Posts"} group_gallery={"Gallery"} group_chatting={"Chatting"}/>
        <div className="post">
            <table className="post_table">
                <thead>
                <tr>
                    <th>id</th>
                    <th>group name</th>
                    <th>thumbnail</th>
                    <th>author</th>
                    <th>content</th>
                </tr>
                </thead>
                <Tr info = {info} handleRemove={handleRemove} handleEdit={handleEdit} />
            </table>
            <Post onSaveData={handleSave} />
            {modalOn && <Modal selectedData={selected} handleCancel={handleCancel}
            handleEditSubmit={handleEditSubmit}/>}
        </div>
    </div>
    );
};

export default Post;