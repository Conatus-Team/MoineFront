// import GroupList from "./GroupList";

const MyLectureList = ({id, lectureName, thumbnail, title, content, teacher, count, date, link}) => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";
return (
    <div className="MyLecture">
      <div className="MyLecture_image">
        <img src = {process.env.PUBLIC_URL+ `assets/${thumbnail}`}/>
      </div>
      <div className="MyLecturecontent">
        <p>{lectureName}</p>
        <p>title: {title}</p>
        </div>

       
    </div>
)
};

export default MyLectureList;