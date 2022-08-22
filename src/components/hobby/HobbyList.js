const HobbyList= ({hobbyList})=> {
  
      return (<div>
         <input className="Survey_hobby_type" type="checkbox" name="hobbyType" value={hobbyList.id}/><p>{hobbyList.name} </p>
        
      </div>)
}
export default HobbyList;
