<script>
export default {
  name: "WalkpathProgress",
  props: {
    walkpath: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
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
    <template v-if="walkpath.composition.length">
      <b-progress show-value :max="max">
        <b-progress-bar
          v-for="slot in walkpath.composition"
          :key="slot.id"
          :style="getRandomBgColor()"
          :value="slot.duration"
          :precision="2"
        >
          {{ slot.duration }} min {{ slot.name }}
        </b-progress-bar>
      </b-progress>
      <div class="my-2">Total {{ walkpath.duration }} min</div>
    </template>
    <template v-else>
      <span>No slots selected yet</span>
    </template>
  </section>
</template>

<style scoped>
.sydra {
  width: 70vw;
  max-width: 450px;
}
</style>
