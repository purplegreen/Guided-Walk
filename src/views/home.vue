<script>
export default {
  name: "home",
  methods: {
    clearCache() {
      localStorage.clear();
    }
  }
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
    <button @click="clearCache">Clear Cache</button>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 1em;
}

.card {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  margin-bottom: 1em;
  padding: 1em;
}
</style>
