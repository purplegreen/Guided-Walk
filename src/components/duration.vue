<script>
export default {
  name: "Duration",
  props: {
    total: {
      type: Number,
      default: 0
    },
    passed: {
      type: Number,
      default: 0
    },
    withRemaining: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<template>
  <div class="duration">
    <template v-if="withRemaining">{{ passed | secondsToMinutes }}min of</template>
    {{ total | secondsToMinutes }}min
  </div>
</template>

<style lang="scss" scoped>
.duration {
  color: white;
  font-size: 0.8rem;
  display: inline-block;
  position: relative;
  background-color: #8fd478;
  background-size: contain;
  padding: 8px;
  margin: 8px 5px 20px 5px;
  border-radius: var(--border-radius);
}
</style>
