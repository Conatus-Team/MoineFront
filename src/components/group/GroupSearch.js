import MyButton from "../MyButton";
import axios from "axios";
import {useState} from 'react';
import GroupSearched from "./GroupSearched";
import { BASE_URL } from "../../App";


function GroupSearch() {
    const [keyword, SetKeyword] = useState("");
    const [result, setResult] = useState([]);

    const submitSearch = () =>{
        let data = {
            keyword: keyword,
        }
        let url = `${BASE_URL.group}/group/search?keyword=${keyword}`;
        axios.post(url,  JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
                "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
            },
            })
            .then((res) => {
            console.log('result',res);
            setResult(res.data);
        }).catch(error => {
            console.log(error.response)
        });

    }

    return (
        <div className="group_search">
            <input className="group_searchBar" type="text" onChange={(e)=>{SetKeyword(e.target.value)}}/>
            <MyButton type = {'default'} text ={'검색'} onClick={() =>submitSearch()}>

        </MyButton>
        <GroupSearched searchResult = {result}/>
        </div>
    )
}

export default GroupSearch;
