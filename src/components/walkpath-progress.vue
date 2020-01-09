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
    getStyle(duration) {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return {
        backgroundColor: color,
        width: `${duration * 100 /this.max}%`
      };
    }
  }
};
</script>
<template>
  <section class="sydra">
    <template v-if="walkpath.composition.length">
      <div class="progress">
        <span
          class="progress-bar"
          v-for="slot in walkpath.composition"
          :key="slot.id"
          :style="getStyle(slot.duration)">
          {{ slot.duration }} min {{ slot.name }}
        </span>
      </div>
      <div>Total {{ walkpath.duration }} min</div>
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

.progress {
  display: flex;
  overflow: hidden;
  font-size: .75em;
  background-color: #e9ecef;
  border-radius: 8px;
  height: 1rem;
}

.progress-bar {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #007bff;
  transition: width .6s ease;
}
</style>
