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
    ...mapActions(["startWalkpath"]),
    select(walkpath) {
      this.startWalkpath(walkpath);
      this.$router.push("walkpath");
    }
  }
};
</script>
<template>
  <div>
    <a
      class="walkpath"
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
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1em;
  padding: 1em;
  // width: 120px;
  display: block;
}
</style>
