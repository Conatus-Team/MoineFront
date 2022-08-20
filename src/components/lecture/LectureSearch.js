// import PropTypes from "prop-types";

import MyButton from "../MyButton";
import {useEffect, useState} from 'react';
import axios from "axios";
import LectureSearched from "./LectureSearched";
import { BASE_URL } from "../../App";

function LectureSearch() {
    const [keyword, SetKeyword] = useState("");
    const [result, setResult] = useState([]);
        

    const submitSearch = (e) =>{
      
        // useEffect(() => {
        let url = `${BASE_URL.lecture}/lecture/search?keyword=${keyword}`;
        axios.post(url, null, {
            headers: {
                "Content-Type": `application/json`,
                "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
            },
            })
            .then((res) => {
            console.log(res.data);
            setResult(res.data);
        }).catch(error => {
            console.log(error.response)
        });
    // }, []);
        console.log('result',result);
            
    }
    return (
        <div className="lecture_search">
            <input className="lecture_searchBar" type="text" onChange={(e)=>{SetKeyword(e.target.value)}}/>
            <MyButton type = {'default'} text ={'Search'} onClick={(e) =>submitSearch()}>
            </MyButton>
            <LectureSearched searchResult = {result}/>
        </div>
    )
}

// GroupSearch.PropTypes={
//     search: PropTypes.any.isRequired,
//     onChange: PropTypes.func.isRequired,
// }

export default LectureSearch;