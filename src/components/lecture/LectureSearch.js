// import PropTypes from "prop-types";

import MyButton from "../MyButton";


function LectureSearch() {
    return (
        <div className="lecture_search">
            <input className="lecture_searchBar" type="text" value = " " />
            <MyButton type = {'default'} text ={'Search'} onClick={() => alert('./new')}>
          
        </MyButton>
        </div>
    )
}

// GroupSearch.PropTypes={
//     search: PropTypes.any.isRequired,
//     onChange: PropTypes.func.isRequired,
// }

export default LectureSearch;