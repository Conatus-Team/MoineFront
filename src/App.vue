<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  background-color: white;
  box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
}

@media (min-width: 800px){ /*if size> 650 do*/
  .app{
    width:800px;
  }
}

@media (min-width: 1400px){ /*if size> 650 do*/
  .app{
    width:1350px;
  }
}

@media (max-width:650px){
  .app{
    width:90vw;
  }
}


.app {
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  font-family: 'Do Hyeon', sans-serif;
}
</style>
