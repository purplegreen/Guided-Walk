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
    <template v-if="withRemaining">
      {{ passed | secondsToMinutes }}min of
    </template>
    {{ total | secondsToMinutes }}min
  </div>
</template>

<style lang="scss" scoped>
.duration {
  color: var(--fuchsia);
}
</style>
