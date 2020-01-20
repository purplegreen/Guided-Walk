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
      :class="{ active: slot.isActive }"
      v-for="(slot, index) in slots"
      :key="slot.id"
      @click.self="onClick(slot, index, $event)"
      :style="getProgressBarStyle(slot)"
    >
      <span class="text">
        {{ slot.duration | secondsToMinutes }} min {{ slot.name }}
      </span>
      <span
        class="progress-overlay"
        :style="getProgressOverlayStyle(slot)"
      ></span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.text {
  pointer-events: none;
  z-index: 1; // so that overlay does not cover it
}

.progress {
  cursor: pointer;
  display: flex;
  overflow: hidden;
  font-size: 0.75em;
  background-color: #e9ecef;
  border-radius: var(--border-radius);
  height: 1rem;
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
  white-space: nowrap;
  background-color: #007bff;
  transition: all 0.6s ease;

  &.active {
    font-weight: bold;
    font-size: 1.2em;
  }
}
</style>
