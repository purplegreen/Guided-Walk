<script>
import { mapState } from "vuex";

export default {
  name: "hede",
  computed: {
    ...mapState({
      walkpath: state => state.walkpath.customWalkpath
    }),
    max() {
      return this.walkpath.composition.reduce((total, slot) => {
        return total + slot.duration;
      }, 0);
    }
  },
  methods: {
    // just for fun
    getRandomBgColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return {
        backgroundColor: color
      };
    }
  }
};
</script>
<template>
  <section class="sydra">
    <b-progress show-value :max="max" v-if="walkpath.composition.length">
      <b-progress-bar
        v-for="slot in walkpath.composition"
        :key="slot.id"
        :style="getRandomBgColor()"
        :value="slot.duration"
        :precision="2"
      >
      </b-progress-bar>
    </b-progress>
    <span v-else>No slots selected yet</span>
  </section>
</template>

<style scoped>
.sydra {
  width: 70vw;
  max-width: 450px;
  height: 20px;
  padding: 4px;
  margin: 20px;
  border-radius: 8px;
  /* background-color: dodgerblue; */
}
</style>
