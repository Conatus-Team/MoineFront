import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import MyGroup from '../MyGroup';
// import MyButton from '../MyButton';
// import { useNavigate } from 'react-router';
// import RecommendGroupList from "./RecommendGroupList";
// import MyGroupList from './MyGroupList';

const Groups= ()=> {
    const { id } = useParams();
    console.log(id);
   
    return (<div>
        <MyGroup id={id}/>
        </div>
    );
    
  };
// GroupMain.defaultProps = {
//     groupList: [],
// }

  
export default Groups;