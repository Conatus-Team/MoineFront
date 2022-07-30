import { useNavigate } from "react-router-dom";
const RecommendGroupList = ({id, groupName, thumbnail, people}) => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";
    const navigate = useNavigate();
return (
    <div className="RecommendGroup" onClick={() => navigate(`/group/main/${id}`)}>
      <div className="RecommendGroup_image">
        <img src = {process.env.PUBLIC_URL+ `assets/${thumbnail}`}/>
      </div>
      <div className="RecommendGroupcontent">
        <p>{groupName}</p>
        <p>people: {people}</p>
        </div>

       
    </div>
)
};

export default RecommendGroupList;