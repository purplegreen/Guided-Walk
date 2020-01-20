<script>
import { mapState } from "vuex";
import ProgressBar from "@/components/progress-bar.vue";

export default {
  name: "credits",
  components: {
    ProgressBar
  },
  mounted() {
    if (!this.walkpathInProgress || !this.walkpathInProgress.composition) {
      this.$router.push({ path: "/" });
    }
  },
  computed: {
    ...mapState({
      walkpathInProgress: state => state.walkpath.walkpathInProgress
    })
  }
};
</script>
<template>
  <div>
    <progress-bar :slots="walkpathInProgress.composition">
    </progress-bar>
    <div class="duration">
      {{ walkpathInProgress.duration | secondsToMinutes }}min of
      {{ walkpathInProgress.duration | secondsToMinutes }}min
    </div>
    <div>
      END PAGE Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress.
    </div>
  </div>
</template>

<style lang="scss" scoped>
.duration {
  color: var(--fuchsia);
}
</style>
