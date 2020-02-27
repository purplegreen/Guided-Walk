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
      <h6>{{ slot.duration | secondsToMinutes }} min</h6>
      <span class="text">{{ slot.name }}</span>
      <span class="progress-overlay" :style="getProgressOverlayStyle(slot)"></span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.text {
  pointer-events: none;
  font-size: 0.5rem;
  z-index: 1; // so that overlay does not cover it
}

.progress {
  cursor: pointer;
  display: flex;
  overflow: hidden;
  font-size: 0.8rem;
  background-color: #e9ecef;
  border-radius: 12px;
  height: 9rem;
  width: 100%;
  margin: 1rem 0;
}

.progress-overlay {
  position: absolute;
  background-color: var(--fuchsia);
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
  color: #fff;
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
