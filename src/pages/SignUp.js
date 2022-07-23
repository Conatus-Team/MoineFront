import { useParams } from "react-router-dom";

const SignUp = () => {
    const {id} = useParams();
    return (<div>
        <h1>SignUp</h1>
        <p>This is SignUp page</p>
    </div>
    );
};

export default SignUp;