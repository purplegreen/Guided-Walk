<script>
import { mapState } from "vuex";

export default {
  name: "Walkpath",

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
  <div>Hey</div>
</template>
