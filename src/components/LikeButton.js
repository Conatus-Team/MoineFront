//like
import styled from "styled-components";
import starEmpty from "./Image/star_empty.png";
import startLiked from "./Image/star_liked.png";

const Like = styled.img`
    width:25px;
    // display: flex;
    // justify-content: space-between;
    float:right;
    padding-right: 10px;
    padding-top: 5px;
`;

const LikeButton = ({ like, onClick }) => {
    return (
        <Like src={like?startLiked:starEmpty} onClick={onClick} />
    );
};

export default LikeButton;
