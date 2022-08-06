// import PropTypes from "prop-types";

import MyButton from "../MyButton";
import {useState} from 'react';
import axios from "axios";
import LectureSearched from "./LectureSearched";

function LectureSearch() {
    const [keyword, SetKeyword] = useState("");
    const [result, setResult] = useState([]);

    const submitSearch = () =>{
        let data = {
            keyword: keyword,
            userId: 1
        }
        let url = "http://localhost:8082/lecturelist/search";
        axios.post(url,  JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            },
            })
            .then((res) => {
            console.log(res);
            setResult(res);
        });
        console.log('data',data);
            
    }
    return (
        <div className="lecture_search">
            <input className="lecture_searchBar" type="text" onChange={(e)=>{SetKeyword(e.target.value)}}/>
            <MyButton type = {'default'} text ={'Search'} onClick={() =>submitSearch()}>
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