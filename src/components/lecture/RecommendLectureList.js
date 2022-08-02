import { useNavigate } from "react-router-dom";

const RecommendLectureList = ({id, lectureName, thumbnail, title}) => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";
    const navigate = useNavigate();
return (
    <div className="RecommendLecture" onClick={() => navigate(`/lecture/${id}`)}>
      <div className="RecommendLecture_image">
        <img src = {process.env.PUBLIC_URL+ `assets/${thumbnail}`}/>
      </div>
      <div className="RecommendLecturecontent">
        <p>{lectureName}</p>
        <p>title: {title}</p>
        </div>

       
    </div>
)
};

export default RecommendLectureList;

/*
lectureName: "cooking",
    thumbnail: "/emotion1.png",
    title: "title1",
    content:"this lecture is.....",
    teacher: 7,
    count: 5,
    date: 1638969241915,
    link: "http://naver.com",
  },
  */