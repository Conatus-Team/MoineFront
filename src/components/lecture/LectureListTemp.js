import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LikeButton from "../LikeButton";
import axios from "axios";
import { BASE_URL } from "../../App";




const LikeTest = (lectures, lectureLikeList) =>{
  console.log(`like test: lectures - ${lectures}`)
  console.log(lectures)
  console.log(lectureLikeList)
  lectures.map((it)=> it.like = false)

  lectures.map((it) => {
      console.log(`${it.lectureId} map 들어옴!`)
      if(lectureLikeList.includes(it.lectureId)){
          it.like = true;
          console.log(`${it.lectureId} true로 바뀜!`)
      }

})

 return lectures;
}

const LectureListTemp = ({lectureId, lectureName, imagePath, like}) => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";
    const navigate = useNavigate();
    const [like_data, setLike] = useState(false);
    // console.log(`lecture list temp: ${lectureId}`)
    // const lectureId = id
    const likeData = {
      //userId: JSON.parse(sessionStorage.getItem('user')).userId,
      lectureId: lectureId,
    }

    useEffect(()=>{
      if(like===true) setLike(true)
      else setLike(false)
    }, []);
    

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
      console.log(`toggle like to: ${!like_data} lectureId: ${lectureId}`)

      

      let url_liked = `${BASE_URL.lecture}/lecture/like/${lectureId}`;
      // true로 바꾸기
      if (like_data === false) {
      
      axios.post(url_liked,  null, {
        headers:{
          "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
        },
      }
      ).then((res)=>{
        console.log(res)
        console.log("별표시 채워요")
        setLike(!like_data);
          // setLike(!like_data);
      }).catch(error => {
        console.log(error.response)
    });}else{ //like를 false로 바꾸기
      axios.delete(url_liked, {
        headers:{
          "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
        },
        data:{}
      }
      ).then((res)=>{
        console.log(res)
        console.log("별표시 없애기")
        setLike(!like_data);
      }).catch(error => {
        console.log(error.response)
    });
    }
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