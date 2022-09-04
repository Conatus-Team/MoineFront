// import GroupList from "./GroupList";
import { useNavigate } from "react-router-dom";
/*
"category": "string",
        "createdTime": "2022-08-06T10:12:59.702Z",
        "explanation": "string",
        "id": 0,
        "leaderId": 0,
        "likeCount": 0,
        "memberCount": 0,
        "name": "string",
        "updatedTime": "2022-08-06T10:12:59.702Z"
        */



const GroupListTemp = ({id, name, thumbnail, memberCount}) => {
      const env = process.env;
      env.PUBLIC_URL = env.PUBLIC_URL || "";
      const navigate = useNavigate();
      // console.log('group',id,name, memberCount);

  return (
      <div className="Group" >
         
        <div onClick={() => navigate(`/group/main/${id}`)}>
        <div className="group_image"
        // onClick={() => navigate(`/group/main/${id}`)}
        >
          <img src = {process.env.PUBLIC_URL+ `${thumbnail}`}/>
        </div>
        <div className="Groupcontent">
            
          <p>{name}</p>
          <p>people: {memberCount}</p>
          </div>
          </div>
      </div>
  )
};

export default GroupListTemp;