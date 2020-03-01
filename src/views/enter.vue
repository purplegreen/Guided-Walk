<script>
export default {
  name: "enter"
};
</script>

<template>
  <div class="wrapper">
    <router-link class="link" to="select">
      <div class="button-card">
        <div>
          <h1>Choose a Walk</h1>
        </div>
      </div>
    </router-link>

    <router-link class="link" to="create">
      <div class="button-card">
        <div>
          <h1>Compose a walk</h1>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 1em;
}

.button-card {
  border: 1px solid var(--border-color);
  background-color: whitesmoke;
  border-radius: var(--border-radius);
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  padding: 7px;
  margin-bottom: 20px;
}
</style>
