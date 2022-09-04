import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../App";

const PageRouter = () =>{
    const {userId} = useParams();
    const {page} = useParams(userId);
    const navigate = useNavigate();
    sessionStorage.setItem('user', JSON.stringify(userId));

    // console.log(userId)
    // console.log(page)

    // useEffect(() => {
        let url_like = `${BASE_URL.auth}/auth/mypage`;
        console.log(url_like)
        axios.get(url_like,{
          headers: {
            "Content-Type": `application/json`,
            "Authorization" : userId,
          }
        })
          .then(response => {
            sessionStorage.setItem('user', JSON.stringify(response.data));

            switch (page) {
              case 'home':
                  navigate(`/home`);
                  break;
              case 'group':
                  navigate(`/group`);
                  break;
              case 'lecture':
                  navigate(`/lecture`);
                  break;
              case 'mypage':
                  navigate(`/mypage`);
                  break;
              default:
                  break;
          }
        }).catch(error => {
          console.log(error.response)
      });
    // }, []);
    
};

export default PageRouter;
