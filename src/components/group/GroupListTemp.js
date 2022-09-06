// import GroupList from "./GroupList";
import { useNavigate } from "react-router-dom";


const GroupListTemp = ({id, name, thumbnail, memberCount}) => {
      const env = process.env;
      env.PUBLIC_URL = env.PUBLIC_URL || "";
      const navigate = useNavigate();
      // console.log('group',id,name, memberCount);

  return (
      <div className="Group" >

        <div onClick={() => navigate(`/group/main/${id}`)}>
        <div className="group_image"
        >
          <img src = {process.env.PUBLIC_URL+ `${thumbnail}`}/>
        </div>
        <div className="Groupcontent">

          <p>{name}</p>
          <p>인원 수: {memberCount}</p>
          </div>
          </div>
      </div>
  )
};

export default GroupListTemp;
