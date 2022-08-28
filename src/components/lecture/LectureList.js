import React, { useEffect, useState } from 'react';
import MyButton from '../MyButton';
import { useNavigate } from 'react-router';
import LectureListTemp from './LectureListTemp';
import LectureSearch from './LectureSearch';
import axios from 'axios';
import { BASE_URL } from '../../App';


const LikeTest = (lectures, lectureLikeList) =>{

  lectures.map((it)=> it.like = false)

  lectures.map((it) => (
    lectureLikeList.map((i)=> {if(it.id === i) it.like = true})
 ))
 return lectures;
}

const LectureList= ({lectureList, recommendLectureList})=> {

    // const navigate = useNavigate();

    lectureList.map((it)=> it.like = true)

    const [lectureLikeList, setLectureLikeList] = useState([]);
  
    useEffect(()=>{
      axios.get(`${BASE_URL.lecture}/lecture`,{
        headers: {
          "Content-Type": `application/json`,
          "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
      },
      })
      .then(response => {
        setLectureLikeList(response.likeId);

        recommendLectureList = LikeTest(recommendLectureList, lectureLikeList);

      }).catch(error => {
        console.log(error.response)
    });
    }, [recommendLectureList]);


    return (
      <div className="LectrueList">
        <LectureSearch/>

        <p className='lecture_title'> Recommend Lecture List</p>
        <div className="lectureList">
             {recommendLectureList.map((it) => (
                <LectureListTemp key = {it.lectureId} {...it}/>
             ))}
        </div>



        <p className='lecture_title'> My Lecture List</p>
        <div className="lectureList">
        {lectureList.map((it) =>(
          <LectureListTemp key = {it.lectureId} {...it}/>
          ))}
    
        </div>
      </div>
    );
    
  };
LectureList.defaultProps = {
    lectureList: [],
}

  
export default LectureList;