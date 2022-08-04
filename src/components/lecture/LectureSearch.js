// import PropTypes from "prop-types";

import MyButton from "../MyButton";
import {useState} from 'react';
import axios from "axios";


function LectureSearch() {
    const [keyword, SetKeyword] = useState("");

    const submitSearch = () =>{
        let data = {
            keyword: keyword,
        }
        let url = "http://localhost:3000/lecture/search";
        axios.post(url,  JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            },
            })
            .then((res) => {
            console.log(res);
        });
        // console.log("finish search");
            
    }
    return (
        <div className="lecture_search">
            <input className="lecture_searchBar" type="text" onChange={(e)=>{SetKeyword(e.target.value)}}/>
            <MyButton type = {'default'} text ={'Search'} onClick={() =>submitSearch()}>
          
        </MyButton>
        </div>
    )
}

// GroupSearch.PropTypes={
//     search: PropTypes.any.isRequired,
//     onChange: PropTypes.func.isRequired,
// }

export default LectureSearch;