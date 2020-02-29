<script>
export default {
  name: "home",
  created() {
    setTimeout(() => this.$router.push({ path: "/enter" }), 5000);
  }
};
</script>

<template>
  <div class="wrapper">
    <img alt="Guided Meditation Walk" class="guidedwalk-logo" src="../assets/guidedwalk.svg" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 1em;
}

.guidedwalk-logo {
  width: 80vw;
  margin: auto;
  padding-top: 20vh;
}

.card {
  margin-bottom: 1em;
}
</style>
