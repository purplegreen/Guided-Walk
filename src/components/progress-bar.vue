<script>
export default {
  name: "ProgressBar",
  props: {
    slots: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    max() {
      return this.slots.reduce((total, slot) => {
        return total + slot.duration;
      }, 0);
    }
  },
  methods: {
    getProgressBarStyle(slot) {
      return {
        backgroundColor: slot.color,
        width: `${(slot.duration * 100) / this.max}%`
      };
    },
    getProgressOverlayStyle(slot) {
      if (slot.isHighlighted) return { width: "100%" };
      return {
        width: `${(slot.alreadyPlayedInSeconds * 100) / slot.duration}%`
      };
    },
    onClick(slot, index, $event) {
      this.$emit("onBarClicked", slot, index, $event);
    }
  }
};
</script>
<template>
  <div class="progress">
    <span
      class="progress-bar"
      :class="{ highlight: slot.isHighlighted }"
      v-for="(slot, index) in slots"
      :key="slot.id"
      @click.self="onClick(slot, index, $event)"
      :style="getProgressBarStyle(slot)"
    >
      <div class="cont-wrap">
        <span class="num">{{ slot.duration | secondsToMinutes }}</span>
        <span class="min">min</span>
        <span class="rotate-text">{{ slot.name }}</span>
      </div>
      <span class="progress-overlay" :style="getProgressOverlayStyle(slot)"></span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.cont-wrap {
  height: 90%;
  width: 90%;
  margin: auto;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 15% 15% 70%;
  // position: absolute;
  // top: 2%;
  // left: 50%;
  // transform: translate(-50%, -2%);
  pointer-events: none;
}

.num {
  grid-column: 1;
  grid-row: 1;
}

.min {
  font-size: 0.5rem;
  font-weight: bold;
  grid-column: 1;
  grid-row: 2;
  pointer-events: none;
  font-size: 0.5rem;
  z-index: 1;
}

.rotate-text {
  pointer-events: none;
  font-size: 0.5rem;
  font-weight: bold;
  z-index: 1;
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  grid-column: 1;
  grid-row: 3;
  align-self: center;
}

.progress {
  position: relative;
  cursor: pointer;
  display: flex;
  overflow: hidden;
  font-size: 0.8rem;
  background-color: #e9ecef;
  border-radius: 12px;
  height: 6rem;
  width: 99%;
  margin: auto;
}

.progress-overlay {
  position: absolute;
  pointer-events: none;
  background-color: blue;
  opacity: 0.7;
  top: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}

.progress-bar {
  position: relative;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  color: white;
  text-align: center;
  white-space: wrap;
  background-color: #007bff;
  transition: all 0.6s ease;

  &.highlight {
    font-weight: bold;
    font-size: 1.2em;
  }
}
</style>
