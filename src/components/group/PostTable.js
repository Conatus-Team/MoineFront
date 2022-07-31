import { useNavigate } from "react-router-dom";
const PostTable = ({id, groupId, groupName,author, title, date}) => {
    
    const strDate = new Date(parseInt(date)).toLocaleDateString();
    const navigate = useNavigate();
    
    return (
        <tr className="Post_Tr" onClick={() => navigate(`/group/post/${groupId}/${id}`)}>
            <td className="Post_Table_Date"> 
                {strDate}
            </td>
            <td className="Post_Table_Title">
            {title}
            </td>
            <td className="Post_Table_Author">
            {author}
            </td>
            <td className="Post_Table_GroupName">
            {groupName}
            </td>
        </tr>
    )
};

export default PostTable;