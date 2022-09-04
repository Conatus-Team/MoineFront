import React, { useEffect, useState } from 'react';
import MyButton from '../MyButton';
import { useNavigate } from 'react-router';
import LectureListTemp from './LectureListTemp';
import LectureSearch from './LectureSearch';
import axios from 'axios';
import { BASE_URL } from '../../App';


// const LikeTest = (lectures, lectureLikeList) =>{

//   lectures.map((it)=> it.like = false)

//   lectures.map((it) => (
//     lectureLikeList.map((i)=> {if(it.id === i) it.like = true})
//  ))
//  return lectures;
// }

const LectureList= ({lectureList, recommendLectureList})=> {

    // const navigate = useNavigate();

    const likeIdList = lectureList.map((it)=> {
      // make like key
      it.lectureCrawling.like = true

      // return like id list
      return it.lectureCrawling.lectureId
    })

    // get not liked RrecommendLectureList
    const tmpRrecommendLectureList = []
    recommendLectureList.map((it)=> {
      it.lectureCrawling.like = false
      if (!likeIdList.includes(it.lectureCrawling.lectureId)){
        tmpRrecommendLectureList.push(it)
      }

    });

    recommendLectureList = tmpRrecommendLectureList;



    const [lectureLikeList, setLectureLikeList] = useState([]);
  
    // useEffect(()=>{
    //   axios.get(`${BASE_URL.lecture}/lecture`,{
    //     headers: {
    //       "Content-Type": `application/json`,
    //       "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
    //   },
    //   })
    //   .then(response => {

    //     setLectureLikeList(response);
    //     recommendLectureList = 
    //     }

    //   }).catch(error => {
    //     console.log(error.response)
    // });
    // }, []);


    // console.log(`r lecture list: ${recommendLectureList}`)
    return (
      <div className="LectrueList">
        <LectureSearch/>

        <p className='lecture_title'> Recommend Lecture List</p>
        <div className="lectureList">
             {
              recommendLectureList.length < 1 ? <p>please expect other recommendation</p> :
             recommendLectureList.map((it) => (
                <LectureListTemp key = {it.lectureCrawling.lectureId} {...it.lectureCrawling} />
             ))}
        </div>



        <p className='lecture_title'> My Lecture List</p>
        <div className="lectureList">
        {lectureList.map((it) =>(
          <LectureListTemp key = {it.lectureCrawling.lectureId} {...it.lectureCrawling}/>
          ))}
    
        </div>
      </div>
    );
    
  };
LectureList.defaultProps = {
    lectureList: [],
}

  
export default LectureList;