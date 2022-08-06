import { useNavigate } from "react-router-dom";
const MyLectureList = ({id, lectureName, imagePath, introduction}) => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";
    const navigate = useNavigate();
return (
    <div className="MyLecture" onClick={() => navigate(`/lecture/${id}`)}>
      <div className="MyLecture_image">
        <img src = {process.env.PUBLIC_URL+ `/${imagePath}`}/>
      </div>
      <div className="MyLecturecontent">
        <p>{lectureName}</p>
        <p>introduction: {introduction}</p>
        </div>

       
    </div>
)
};

export default MyLectureList;

/*
"categoryName": "string",
"clickCount": 0,
"createdDate": "2022-08-05T02:47:10.921Z",
"deleted": true,
"id": 0,
"lectureCrawling": {
"amount": "string",
"categoryName": "string",
"createdDate": "2022-08-05T02:47:10.921Z",
"curriculum": "string",
"deleted": true,
"imagePath": "string",
"introduction": "string",
"lectureId": 0,
"lectureName": "string",
"lectureUrl": "string",
"originLikeCount": 0,
"price": "string",
"siteName": "string",
"teacherName": "string",
"updatedDate": "2022-08-05T02:47:10.921Z",
"userLikeCount": 0

*/