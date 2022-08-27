<template>
    <div></div>
</template>
<script>
export default {
  name: "enterChatting",
  data() {
    return {
        userId2: 0,
        groupId2: 0,
    };
  },
  created() {
    console.log("=============================")
    console.log("파라미터")
    console.log(this.$route.params)
    console.log("쿼리")
    console.log(this.$route.query)
    
    console.log("=============================")
    const userId = this.$route.params.id
    const groupId = this.$route.query.groupId


    
    sessionStorage.setItem("userId", this.$route.params.id)

    this.$axios.get(`${this.$BASE_URL.chatting}/users/${userId}`, {
        headers: {
        Authorization: sessionStorage.getItem("userId")
        }
      }
      ).then((response) => {
        const userNickname = response.data.userNickname;
        sessionStorage.setItem("userNickname", userNickname)



        // 그룹아이디가 없으면
        console.log("groupId")
        console.log(isNaN(groupId))
        if (isNaN(groupId)){
            this.$router.push({
                name: "RoomList",
            });
            return;
        } 
        
       

        this.$axios.get(`${this.$BASE_URL.chatting}/chattingRooms/search/findByGroupId?groupId=${groupId}`, {
            headers: {
            Authorization: sessionStorage.getItem("userId")
            }
        }
        ).then((response) => {
                console.log("+++++++++++++++++++++++++++++")
                console.log(response.data);
                console.log("+++++++++++++++++++++++++++++")
                const roomId = response.data.id;
                const groupName = response.data.groupName;


                this.$router.push({
                    name: "RoomDetail",
                    params: { nickname: userNickname, roomId, groupName, userId},
                });
            })
        }
  );
    // const nickname = sessionStorage.getItem("userNickname")

    


  }
}
</script>