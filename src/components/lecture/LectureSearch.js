// import PropTypes from "prop-types";

import MyButton from "../MyButton";
import {useEffect, useState} from 'react';
import axios from "axios";
import LectureSearched from "./LectureSearched";
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

function LectureSearch() {
    const [keyword, SetKeyword] = useState("");
    let [result, setResult] = useState([]);
    const [lectureLikeList, setLectureLikeList] = useState([]);


    const submitSearch = (e) =>{

        // useEffect(() => {
        let url = `${BASE_URL.lecture}/lecture/search?keyword=${keyword}`;
        axios.post(url, null, {
            headers: {
                "Content-Type": `application/json`,
                "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
            },
        }).then((res) => {
            console.log(res.data);
            const resultTmp = res.data.data;
            const lectureLikeListTmp = res.data.likeId;
            // setResult(resultTmp);
            setLectureLikeList(lectureLikeListTmp);
            console.log("resultTmp")
            console.log(resultTmp)
            setResult(LikeTest(resultTmp, lectureLikeListTmp));
            console.log(result)
        }).catch(error => {
            console.log("에러")
            console.log(error)
        });
    // }, []);
        console.log('result',result);

    }
    return (
        <div className="lecture_search">
            <input className="lecture_searchBar" type="text" onChange={(e)=>{SetKeyword(e.target.value)}}/>
            <MyButton type = {'default'} text ={'검색'} onClick={(e) =>submitSearch()}>
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
