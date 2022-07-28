const PostTable = ({id, groupName,author, title, date}) => {
    
    const strDate = new Date(parseInt(date)).toLocaleDateString();
    
    return (
        <tr className="Post_Tr">
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