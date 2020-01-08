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
  <div>Hey</div>
</div>
</template>
