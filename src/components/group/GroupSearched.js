import GroupListTemp from "./GroupListTemp";
const GroupSearched = ({searchResult}) =>{
    console.log('searchPage', searchResult);
    if (searchResult.length>=1){
        return (
            <div className="group_searched">
                {searchResult.map((it) =>(
          <GroupListTemp key = {it.id} {...it}/>
          ))}
            </div>
        )
    }
    return (<div></div>);
}
export default GroupSearched;