<script>
export default {
  name: "WalkpathProgress",
  props: {
    walkpath: {
      type: Object,
      default: () => ({
        composition: [],
        duration: 0
      })
    }
  },
  computed: {
    max() {
      return this.walkpath.composition.reduce((total, slot) => {
        return total + slot.duration;
      }, 0);
    }
  },
  data() {
    return {
      audioPlaying: false,
      audio: {},
    };
  },
  methods: {
    // just for fun
    getStyle(slot) {
      return {
        backgroundColor: slot.color,
        width: `${(slot.duration * 100) / this.max}%`
      };
    },
    onClick(slot, e) {
      if (!this.audio.paused) {
        this.audio.pause && this.audio.pause();
      }
      this.audio = new Audio(slot.audio);
      const rect = e.target.getBoundingClientRect();
      const width = rect.right - rect.left;

      const x = e.clientX - rect.left; // x position within the element.
      this.audio.onloadedmetadata = () => {
        this.audio.currentTime = (x * this.audio.duration) / width;
        this.audio.play();
      };
      // this.audio.ontimeupdate = () => {
      //   this.progress = this.audio.currentTime;
      // };
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
          @click="onClick(slot, $event)"
          :style="getStyle(slot)"
        >
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
  width: 100%;
}

.progress {
  cursor: pointer;
  display: flex;
  overflow: hidden;
  font-size: 0.75em;
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
  transition: width 0.6s ease;
}
</style>
