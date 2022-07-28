// import PropTypes from "prop-types";

import MyButton from "../MyButton";


function GroupSearch() {
    return (
        <div className="group_search">
            <input className="group_searchBar" type="text" value = " " />
            <MyButton type = {'default'} text ={'Search'} onClick={() => alert('./new')}>
          
        </MyButton>
        </div>
    )
}

// GroupSearch.PropTypes={
//     search: PropTypes.any.isRequired,
//     onChange: PropTypes.func.isRequired,
// }

export default GroupSearch;