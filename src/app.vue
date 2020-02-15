<template>
  <div id="app">
    <img alt="Guided Meditation Walk" class="logo" src="./assets/logo.svg" />
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./style/index";
#app {
  max-width: 414px;
  width: 96vw;
  height: 96vh;
  margin: auto;

  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  border-radius: var(--border-radius);
}

.logo {
  width: 40vw;
  height: auto;
  padding: 10px 3px 30px 3px;
}
</style>
