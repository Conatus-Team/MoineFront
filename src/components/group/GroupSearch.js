// import PropTypes from "prop-types";

import MyButton from "../MyButton";
import axios from "axios";
import {useState} from 'react';


function GroupSearch() {
    const [keyword, SetKeyword] = useState("");

    const submitSearch = () =>{
        let data = {
            keyword: keyword,
        }
        let url = "http://localhost:3000/group/search";
        axios.post(url,  JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            },
            })
            .then((res) => {
            console.log(res);
        });
            
    }
    
    return (
        <div className="group_search">
            <input className="group_searchBar" type="text" onChange={(e)=>{SetKeyword(e.target.value)}}/>
            <MyButton type = {'default'} text ={'Search'} onClick={() =>submitSearch()}>
          
        </MyButton>
        </div>
    )
}

// GroupSearch.PropTypes={
//     search: PropTypes.any.isRequired,
//     onChange: PropTypes.func.isRequired,
// }

export default GroupSearch;