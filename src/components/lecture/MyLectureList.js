import { useNavigate } from "react-router-dom";
const MyLectureList = ({id, lectureName, thumbnail, title}) => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";
    const navigate = useNavigate();
return (
    <div className="MyLecture" onClick={() => navigate(`/lecture/${id}`)}>
      <div className="MyLecture_image">
        <img src = {process.env.PUBLIC_URL+ `assets/${thumbnail}`}/>
      </div>
      <div className="MyLecturecontent">
        <p>{lectureName}</p>
        <p>title: {title}</p>
        </div>

       
    </div>
)
};

export default MyLectureList;