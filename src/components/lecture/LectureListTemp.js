import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LikeButton from "../LikeButton";
import axios from "axios";
import { BASE_URL } from "../../App";

const LectureListTemp = ({lectureId, lectureName, imagePath, like}) => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";
    const navigate = useNavigate();
    const [like_data, setLike] = useState(false);
    console.log(`lecture list temp: ${lectureId}`)
    // const lectureId = id
    const likeData = {
      //userId: JSON.parse(sessionStorage.getItem('user')).userId,
      lectureId: lectureId,
    }

    useEffect(()=>{
      if(like===true) setLike(true)
      else setLike(false)
    }, [like, setLike]);
    

    // useEffect(() => {
    //   let url_like = `${BASE_URL.lecture}/lecture/like`;
    //   axios.get(url_like,{
    //     headers: {
    //       "Content-Type": `application/json`,
    //       "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
    //     }
    //   })
    //     .then(response => {
    //       if (response.like === 'liked') setLike(true);
    //   }).catch(error => {
    //     console.log(error.response)
    // });
    //   }, [like, setLike]);

   
    const toggleLike =() => {
      console.log("toggle like")
      setLike(!like_data);
      console.log(like_data)
      let url_liked = `${BASE_URL.lecture}/lecture/like/${lectureId}`;
      axios.post(url_liked,  null, {
        headers:{
          "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
        },
      }
      ).then((res)=>{
        
          // setLike(!like_data);
      }).catch(error => {
        console.log(error.response)
    });
       // [POST] ???? ???? ?? -> DB ??
      
    }

return (
    <div className="Lecture" >
      <LikeButton like={like_data} onClick={toggleLike}/>
    <div onClick={() => navigate(`/lecture/${lectureId}`)}>
      <div className="Lecture_image">
        <img src = {process.env.PUBLIC_URL+ `${imagePath}`}/>
      </div>
      <div className="Lecturecontent">
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