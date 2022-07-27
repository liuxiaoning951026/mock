<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  created () {
    // axios.defaults.baseURL = 'http://172.21.149.151'
    axios({
      method: 'get',
      // url: 'http://172.21.149.151:8080/aaa'
      url: '/aaa'
    }).then(data => {
      console.log(data)
    })

    // axios({
    //   method: 'get',
    //   url: '/bbb'
    // }).then(data => {
    //   console.log(data)
    // })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
