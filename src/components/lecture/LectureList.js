import React, { useState } from 'react';
import MyButton from '../MyButton';
import { useNavigate } from 'react-router';
import LectureListTemp from './LectureListTemp';
import LectureSearch from './LectureSearch';

const LectureList= ({lectureList, recommendLectureList})=> {

    const navigate = useNavigate();

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