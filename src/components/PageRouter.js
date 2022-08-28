import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";

const PageRouter = () =>{
    const {userId} = useParams();
    const {page} = useParams(userId);
    const navigate = useNavigate();
    sessionStorage.setItem('user', JSON.stringify(userId));

    useEffect(() => {
        let url_like = `${BASE_URL.auth}/auth/mypage`;
        axios.get(url_like,{
          headers: {
            "Content-Type": `application/json`,
            "Authorization" : JSON.parse(sessionStorage.getItem('user')).userId,
          }
        })
          .then(response => {
            sessionStorage.setItem('user', JSON.stringify(response.data));
        }).catch(error => {
          console.log(error.response)
      });
    }, []);
    switch (page) {
        case 'home':
            navigate(`${BASE_URL.react}/home`);
            break;
        case 'group':
            navigate(`${BASE_URL.group}/group`);
            break;
        case 'lecture':
            navigate(`${BASE_URL.lecture}/lecture`);
            break;
        case 'mypage':
            navigate(`${BASE_URL.react}/mypage`);
            break;
        default:
            break;
    }
};

export default PageRouter;
