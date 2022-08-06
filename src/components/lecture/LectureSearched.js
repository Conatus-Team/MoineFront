import LectureListTemp from "./LectureListTemp";

const LectureSearched = ({searchResult}) =>{
    if (searchResult.length>=1){
        return (
            <div className="lecture_searched">
                {searchResult.map((it) =>(
                <LectureListTemp key = {it.lectureId} {...it}/>
          ))}
            </div>
        )
    }
    return (<div></div>);
}
export default LectureSearched;