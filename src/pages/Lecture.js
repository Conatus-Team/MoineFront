import { useParams } from "react-router-dom";

const Lecture = ({lecture}) => {
    const {id} = useParams();
    return (<div>
        {/* {Lecture.map((it) =>(
            <div key = {it.id}>{it.content}</div>
        ))} */}
        <h1>Lecture</h1>
        <p>This is Lecture page</p>
    </div>
    );
};
Lecture.defaultProps = {
    lecture:[],
}
export default Lecture;