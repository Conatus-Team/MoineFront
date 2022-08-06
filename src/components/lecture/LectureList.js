import React, { useState } from 'react';
import MyButton from '../MyButton';
import { useNavigate } from 'react-router';
import RecommendLectureList from "./RecommendLectureList"
import MyLectureList from './MyLectureList';
import LectureSearch from './LectureSearch';

const LectureList= ({lectureList})=> {

    const navigate = useNavigate();

    return (
      <div className="LectrueList">
        <LectureSearch/>


        <p className='lecture_title'> Recommend Lecture List</p>
        <div className="RecommendLectureList">
        
             {lectureList.map((it) => (
                <RecommendLectureList key = {it.lectureId} {...it}/>
             ))}
        </div>
        <p className='lecture_title'> My Lecture List</p>
        <div className="MyLectureList">
        
        
        {lectureList.map((it) =>(
          <MyLectureList key = {it.lectureId} {...it}/>
          ))}
    
        </div>
      </div>
    );
    
  };
LectureList.defaultProps = {
    lectureList: [],
}

  
export default LectureList;