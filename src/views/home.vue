<script>
export default {
  name: "home"
};
</script>

<template>
  <div class="wrapper">
    <router-link class="link" to="select">
      <div class="card">
        <div>
          <h2>choose a walkpath</h2>
        </div>
      </div>
    </router-link>

    <router-link class="link" to="create">
      <div class="card">
        <div>
          <h2>compose a walkpath</h2>
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
