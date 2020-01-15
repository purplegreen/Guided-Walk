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
      audio: {}
    };
  },
  methods: {
    getProgressBarStyle(slot) {
      return {
        backgroundColor: slot.color,
        width: `${(slot.duration * 100) / this.max}%`
      };
    },
    play(slot, portion, index) {
      if (!this.audio.paused) {
        this.audio.pause && this.audio.pause();
      }
      this.audio = new Audio(slot.audio);

      this.audio.onloadedmetadata = () => {
        this.audio.currentTime = portion * this.audio.duration;
        this.audio.play();
      };

      this.audio.ontimeupdate = () => {
        slot.progress = parseInt(
          (this.audio.currentTime / this.audio.duration) * 100,
          10
        );
      };

      this.audio.onended = () => {
        slot.progress = 100;
        if (!this.walkpath.composition[index + 1]) {
          console.log("walktpath ended");
          return;
        }
        this.play(this.walkpath.composition[index + 1], 0, index + 1);
      };
    },
    onClick(slot, index, event) {
      // reset progresses on slots
      this.walkpath.composition.forEach((element, i) => {
        element.progress = index > i ? 100 : 0;
      });

      const rect = event.target.getBoundingClientRect();
      const width = rect.right - rect.left;

      const x = event.clientX - rect.left; // x position within the element.
      this.play(slot, x / width, index);
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
          v-for="(slot, index) in walkpath.composition"
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
      <div>Total {{ walkpath.duration }} min</div>
    </template>
    <template v-else>
      <span>No slots selected yet</span>
    </template>
  </section>
</template>

<style lang="scss" scoped>
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
  transition: width 0.6s ease;
}
</style>
