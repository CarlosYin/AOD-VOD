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
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.2s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>
