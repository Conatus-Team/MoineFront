import { useNavigate } from "react-router-dom";
const PostTable = ({id, groupId,groupName,author, title, date}) => {

    const navigate = useNavigate();
    
    return (
        <tr className="Post_Tr" onClick={() => navigate(`/group/post/${groupId}/${id}`)}>
            <td className="Post_Table_Date">{date}</td>
            <td className="Post_Table_Title">{title}</td>
            <td className="Post_Table_Author">{author}</td>
            <td className="Post_Table_GroupName">{groupName}</td>
        </tr>
    )
};

export default PostTable;

/*
author: "???"
content: "????? ?????"
createdTime: "2022-08-09T10:03:17"
groupId: 1
id: 1
likeCount: 0
title: "??? ??"
updatedTime: "2022-08-09T10:03:17"
userId: 1
*/