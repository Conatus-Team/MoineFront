import React, { useEffect, useState } from 'react';
import MyButton from '../MyButton';
import { useNavigate } from 'react-router';
import LectureListTemp from './LectureListTemp';
import LectureSearch from './LectureSearch';
import axios from 'axios';
import { BASE_URL } from '../../App';

const LectureList= ({lectureList, recommendLectureList})=> {

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

    return (
      <div className="LectrueList">
        <LectureSearch/>

        <p className='lecture_title'> 추천 강의 목록</p>
        <div className="lectureList">
             {
              recommendLectureList.length < 1 ? <p>내일의 추천을 기대해주세요</p> :
             recommendLectureList.map((it) => (
                <LectureListTemp key = {it.lectureCrawling.lectureId} {...it.lectureCrawling} />
             ))}
        </div>



        <p className='lecture_title'>찜한 강의 목록</p>
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
