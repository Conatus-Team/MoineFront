// import GroupList from "./GroupList";
import { useNavigate } from "react-router-dom";
const MyGroupList = ({id, groupName, thumbnail, people}) => {
      const env = process.env;
      env.PUBLIC_URL = env.PUBLIC_URL || "";
      const navigate = useNavigate();
  return (
      <div className="MyGroup">
        <div className="MyGroup_image" onClick={() => navigate(`/group/main/${id}`)}>
          <img src = {process.env.PUBLIC_URL+ `assets/${thumbnail}`}/>
        </div>
        <div className="MyGroupcontent">
          <p>{groupName}</p>
          <p>people: {people}</p>
          </div>

         
      </div>
  )
};

export default MyGroupList;