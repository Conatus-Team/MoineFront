import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LikeButton from "../LikeButton";
import axios from "axios";

const LectureListTemp = ({lectureId, lectureName, imagePath}) => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";
    const navigate = useNavigate();
    const [like, setLike] = useState(false);

    useEffect(() => {
      let url_like = "http://localhost:3000/assets/like_data.json";
      axios.get(url_like)
        .then(response => {
          if (response.like === 'liked') setLike(true);
      });
      }, [like, setLike]);

   
    const toggleLike =(e) => {
      let url_liked = "http://localhost:8082/lecturelist/liked";
      axios.post(url_liked, JSON.stringify(e.target.data)
      ).then((res)=>{
          setLike(!like);
      })
       // [POST] ???? ???? ?? -> DB ??
      
    }

return (
    <div className="RecommendLecture" >
      <LikeButton like={like} onClick={toggleLike}/>
    <div onClick={() => navigate(`/lecture/${lectureId}`)}>
      <div className="RecommendLecture_image">
        <img src = {process.env.PUBLIC_URL+ `${imagePath}`}/>
      </div>
      <div className="RecommendLecturecontent">
        <p>{lectureName}</p>
        </div>
        </div>
    </div>
)
};

export default LectureListTemp;

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