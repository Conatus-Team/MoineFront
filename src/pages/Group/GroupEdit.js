import { useContext, useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { GroupStateContext } from "../../App";
import GroupEditor from "../../components/group/GroupEditor";
const GroupEdit = () => {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const [originData, setOriginData] = useState();

    const groupList = useContext(GroupStateContext);
    console.log('groupList', groupList);

    useEffect(() => {
        if(groupList.length >= 1){
            const targetGroup = groupList.find((it)=> parseInt(it.id) === parseInt(groupId));
            console.log(targetGroup);
            if(targetGroup) {
                setOriginData(targetGroup);

            } else {
                navigate(`/group/main/${groupId}`,{replace: true});
            }
        }
    }, [groupId, groupList]);
  
    return (<div>
        {originData && <GroupEditor isEdit={true} originData={originData} groupId={groupId}/>}

    </div>
    );
};

export default GroupEdit;