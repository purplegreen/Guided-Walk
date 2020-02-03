<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "select-walkpath",
  computed: {
    ...mapState({
      walkpaths: state => state.walkpath.walkpaths
    })
  },
  methods: {
    ...mapActions(["setWalkpathInProgress"]),
    select(walkpath) {
      this.setWalkpathInProgress(walkpath);
      this.$router.push("walkpath");
    }
  }
};
</script>
<template>
  <div>
    <a
      class="walkpath card"
      v-for="walkpath in walkpaths"
      :key="walkpath.id"
      @click="select(walkpath)"
    >
      <div>
        {{ walkpath.name }}
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.walkpath {
  cursor: pointer;
  margin-bottom: 1em;
  display: block;
}
</style>
