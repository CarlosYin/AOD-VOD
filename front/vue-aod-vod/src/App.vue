<template>
  <div id="app">
    <img src="./assets/logo.png">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
};
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
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.2s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>
