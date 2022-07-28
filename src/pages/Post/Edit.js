import { useNavigate,useSearchParams } from "react-router-dom";
const Edit = () => {
    const navigate = useNavigate();
    const [ searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");

    const content = searchParams.get("content");
    return (<div>

        <button onClick = {() => setSearchParams({who:'winterlood'})}>Change QS</button>
        <button onClick={()=>{
            navigate("/home"); //?? ? ?? ????? ???? ????? ?
        }}
        >back to the HOME </button>
        <button
        onClick={()=>{
            navigate(-1);
        }}> back</button>
    </div>
    );
};

export default Edit;