<script>
export default {
  name: "home"
};
</script>

<template>
  <div class="wrapper">
    <router-link to="select">
      <div class="card">
        <div>
          Choose a pre-composed walkpaths
        </div>
      </div>
    </router-link>
    <router-link to="create">
      <div class="card">
        <div>
          Compose your walkpath
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 1em;
}

.card {
  margin-bottom: 1em;
}
</style>
