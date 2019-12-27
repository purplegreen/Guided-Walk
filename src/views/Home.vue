<script>
export default {
  name: "home"
};
</script>

<template>
  <div class="p-4">
    <router-link to="select">
      <b-card border-variant="primary" class="my-2">
        <b-card-title>
          Choose a pre-composed walkpaths
        </b-card-title>
      </b-card>
    </router-link>
    <router-link to="create">
      <b-card border-variant="primary" class="my-2">
        <b-card-title>
          Compose your walkpath
        </b-card-title>
      </b-card>
    </router-link>
  </div>
</template>

<style lang="scss" scoped></style>
