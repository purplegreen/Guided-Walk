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
  min-height: 90vh;
  height: auto;
  margin: 7px auto;
  overflow: scroll;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  border-radius: var(--border-radius);
}

.logo {
  width: 20vw;
  height: auto;
  padding: 10px 3px 30px 3px;
}

@media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
  #app {
    max-width: 90vw;
    width: 90vw;
    width: 96vw;
    background-color: aqua;
  }
  .logo {
    width: 16vw;
  }
}

@media only screen and (min-width: 600px) and (min-device-width: 1024px) {
  .logo {
    width: 8vw;
  }
}
</style>
