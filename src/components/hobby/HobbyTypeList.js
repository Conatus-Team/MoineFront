const HobbyTypeList= ({hobbyTypeList})=> {
    // const navigate = useNavigate();
  
      // const navigate = useNavigate();
  
      return (<div>
         <input className="Survey_hobby_type" type="checkbox" name="hobbyType" value={hobbyTypeList.id}/><p>{hobbyTypeList.name} </p>
        
      </div>)
}
export default HobbyTypeList;
