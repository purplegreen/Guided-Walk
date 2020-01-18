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
      :class="{ 'active': slot.isActive }"
      v-for="(slot, index) in slots"
      :key="slot.id"
      @click.self="onClick(slot, index, $event)"
      :style="getProgressBarStyle(slot)"
    >
      {{ slot.duration }} min {{ slot.name }}
      <span
        class="progress-overlay"
        :style="{ width: slot.progress + '%' }"
      ></span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.progress {
  cursor: pointer;
  display: flex;
  overflow: hidden;
  font-size: 0.75em;
  background-color: #e9ecef;
  border-radius: 8px;
  height: 1rem;
  width: 100%;
  margin: 1rem 0;
}

.progress-overlay {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
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
