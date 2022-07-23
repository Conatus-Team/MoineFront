import { useParams } from "react-router-dom";

const LogIn = () => {
    const {id} = useParams();
    return (<div>
        <h1>Login</h1>
        <p>This is LogIn page</p>
    </div>
    );
};

export default LogIn;