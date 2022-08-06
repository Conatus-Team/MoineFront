// import GroupList from "./GroupList";
import { useNavigate } from "react-router-dom";

const GroupListTemp = ({id, groupName, thumbnail, people}) => {
      const env = process.env;
      env.PUBLIC_URL = env.PUBLIC_URL || "";
      const navigate = useNavigate();

  return (
      <div className="MyGroup" >
         
        <div onClick={() => navigate(`/group/groups/${id}`)}>
        <div className="MyGroup_image" 
        // onClick={() => navigate(`/group/main/${id}`)}
        >
          <img src = {process.env.PUBLIC_URL+ `assets/${thumbnail}`}/>
        </div>
        <div className="MyGroupcontent">
            <div className="lecture_like">
           
            </div>
          <p>{groupName}</p>
          <p>people: {people}</p>
          </div>
          </div>
      </div>
  )
};

export default GroupListTemp;