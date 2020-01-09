<script>
import { mapState, mapActions } from "vuex";
import WalkpathProgress from "@/components/walkpath-progress.vue";

export default {
  name: "Walkpath",
  components: {
    WalkpathProgress
  },
  data() {
    return {
      mode: 'audio'
    }
  },
  mounted() {
    if (!this.walkpathInProgress.composition) {
      this.$router.push({ path: "/" });
    }
  },
  computed: {
    ...mapState({
      customWalkpath: state => state.walkpath.customWalkpath,
      walkpathInProgress: state => state.walkpath.walkpathInProgress
    })
  },
  methods: {
    ...mapActions(["stopWalkpath"]),
    selectMode(mode) {
      this.mode = mode
    },
    exit() {
      this.stopWalkpath();
      if (this.customWalkpath.composition.length > 0) {
        this.$router.push("create");
      } else {
        this.$router.push("select");
      }
    }
  }
};
</script>
<template>
  <div>
    <walkpath-progress :walkpath="walkpathInProgress"></walkpath-progress>
    <div class="button-group">
      <a
        class="btn"
        :class="{ 'selected': mode == 'audio' }"
        @click="selectMode('audio')">Audio</a>
      <a
        class="btn"
        :class="{ 'selected': mode == 'text' }"
        @click="selectMode('text')">Text</a>
    </div>
    <div class="bottom-row">
      <button>Stop</button>
      <button @click="exit()">Exit</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  border-radius: 8px;
  border: 1px solid blue;
  display: inline-block;
  width: 100px;
  cursor: pointer;

  &.selected {
    color: red;
  }

  &:first-child {
    border-radius: 8px 0 0 8px;
  }

  &:last-child {
    border-radius: 0 8px 8px 0;
    border-left: none;
  }
}

.bottom-row {
  margin-top: 1em;
  padding-top: 1em;
  border-top: 1px solid blue;
}
</style>
