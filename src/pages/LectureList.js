import { useParams } from "react-router-dom";
import Lecture from "./Lecture";

const LectureList = () => {
    const {id} = useParams();
    const data = <div>data</div>;
    return (<div>

        <h1>LectureList</h1>
        <p>This is LectureList page</p>
        <Lecture lecture={data}/>
    </div>
    );
};

export default LectureList;