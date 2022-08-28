import LectureListTemp from "./LectureListTemp";
import axios from "axios";
import { BASE_URL } from "../../App";
import { useState } from "react";

const LikeTest = (lectures, lectureLikeList) =>{

    lectures.map((it)=> it.like = false)
  
    lectures.map((it) => (
      lectureLikeList.map((i)=> {if(it.id ===i) it.like = true})
   ))
   return lectures;
  }

const LectureSearched = ({searchResult}) =>{
    const [lectureLikeList, setLectureLikeList] = useState([]);
    if (searchResult.length>=1){
        
        axios.get(`${BASE_URL.lecture}/lecture`,{
            headers: {
              "Content-Type": `application/json`,
              "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
          },
          })
          .then(response => {
            setLectureLikeList(response.likeId);
    
            searchResult = LikeTest(searchResult, lectureLikeList);
    
          }).catch(error => {
            console.log(error.response)
        });


        return (
            <div className="lecture_searched">
                {searchResult.map((it) =>(
                <LectureListTemp key = {it.lectureId} {...it}/>
          ))}
            </div>
        )
    }
    return (<div></div>);
}
export default LectureSearched;