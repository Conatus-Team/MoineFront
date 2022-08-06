import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import MyGroup from '../MyGroup';

const Groups= ()=> {
    const { id } = useParams();
   
    return (<div>
        <MyGroup id={id}/>
        </div>
    );
    
  };

export default Groups;