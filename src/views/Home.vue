<script>
// @ is an alias to /src
import SelectSlots from "@/components/select-slots.vue";

export default {
  name: "home",
  components: {
    "select-slots": SelectSlots
  }
};
</script>

<template>
  <div class="home">
    <select-slots name="SelectSlots" />
  </div>
</template>

<style scoped>
.home {
  position: relative;
  justify-content: center;
  display: flex;
}
</style>
