<script>
import { mapState, mapActions } from "vuex";
import ProgressBar from "@/components/progress-bar.vue";
import Duration from "@/components/duration.vue";

export default {
  name: "credits",
  components: {
    ProgressBar,
    Duration
  },
  mounted() {
    if (!this.walkpathInProgress.composition.length) {
      this.$router.replace("/");
    }
  },
  computed: {
    ...mapState({
      walkpathInProgress: state => state.walkpath.walkpathInProgress
    })
  },
  methods: {
    ...mapActions(["setWalkpathInProgress", "resetWalkpath"]),
    toHome() {
      this.resetWalkpath();
      this.setWalkpathInProgress({
        composition: []
      });
      this.$router.replace("/");
    }
  }
};
</script>
<template>
  <div>
    <progress-bar :slots="walkpathInProgress.composition"></progress-bar>
    <duration
      :total="walkpathInProgress.duration"
      :passed="walkpathInProgress.duration"
      :withRemaining="true"
    ></duration>

    <div>
      END PAGE Turnip greens yarrow ricebean rutabaga endive cauliflower sea
      lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage
      asparagus winter purslane kale. Celery potato scallion desert raisin
      horseradish spinach carrot soko. Lotus root water spinach fennel kombu
      maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea
      gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard
      wakame kohlrabi beetroot carrot watercress.
    </div>

    <div>
      <button @click="toHome">Homepage</button>
    </div>
  </div>
</template>
