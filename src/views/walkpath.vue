<script>
import { mapState } from "vuex";
import WalkpathProgress from "@/components/walkpath-progress.vue";

export default {
  name: "Walkpath",
  components: {
    WalkpathProgress
  },
  mounted() {
    if (!this.customWalkpath.composition) {
      this.$router.push({ path: '/' });
    }
  },
  computed: {
    ...mapState({
      customWalkpath: state => state.walkpath.walkpathInProgress
    })
  },
};
</script>
<template>
<div>
  <walkpath-progress :walkpath="customWalkpath"></walkpath-progress>
  <b-button-group>
    <b-button>Audio</b-button>
    <b-button>Text</b-button>
  </b-button-group>
  <div class="mt-2 pt-2 border-top">
    <b-button variant="outline-secondary">Stop</b-button>
    <b-button variant="outline-secondary" class="ml-2">Exit</b-button>
  </div>
</div>
</template>
