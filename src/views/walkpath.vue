<script>
import { mapState, mapActions } from "vuex";
import ProgressBar from "@/components/progress-bar.vue";

export default {
  name: "Walkpath",
  components: {
    ProgressBar
  },
  data() {
    return {
      mode: "audio",
      audioPlaying: false,
      audio: {}
    };
  },
  mounted() {
    if (!this.walkpathInProgress.composition) {
      this.$router.push({ path: "/" });
    }
  },
  computed: {
    ...mapState({
      customWalkpath: state => state.walkpath.customWalkpath,
      walkpathInProgress: state => state.walkpath.walkpathInProgress
    })
  },
  methods: {
    ...mapActions(["stopWalkpath"]),
    selectMode(mode) {
      this.mode = mode;
    },
    pause() {
      if (!this.audio.paused) {
        this.audio.pause && this.audio.pause();
      }
    },
    reset(index = 0) {
      // reset progresses on slots
      this.customWalkpath.composition.forEach((element, i) => {
        console.log(i, index, index > i);
        element.progress = index > i ? 100 : 0;
      });
    },
    play(slot, portion, index) {
      this.pause();
      this.audio = new Audio(slot.audio);

      this.audio.onloadedmetadata = () => {
        this.audio.currentTime = portion * this.audio.duration;
        this.audio.play();
      };

      this.audio.ontimeupdate = () => {
        if (this.audio.paused) return;
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
    onBarClicked(slot, index, event) {
      this.reset(index);
      const rect = event.target.getBoundingClientRect();
      const width = rect.right - rect.left;

      const x = event.clientX - rect.left; // x position within the element.
      this.play(slot, x / width, index);
    },
    exit() {
      this.pause();
      this.reset();
      this.stopWalkpath();
      if (this.customWalkpath.composition.length > 0) {
        this.$router.push("create");
      } else {
        this.$router.push("select");
      }
    },
    start() {},
    stop() {}
  }
};
</script>
<template>
  <div>
    <progress-bar
      :slots="walkpathInProgress.composition"
      @onBarClicked="onBarClicked"
    >
    </progress-bar>
    <div class="button-group">
      <a
        class="btn"
        :class="{ selected: mode == 'audio' }"
        @click="selectMode('audio')"
        >Audio</a
      >
      <a
        class="btn"
        :class="{ selected: mode == 'text' }"
        @click="selectMode('text')"
        >Text</a
      >
    </div>
    <div class="bottom-row">
      <button v-if="audioPlaying" @click="stop()">Stop</button>
      <button v-else @click="start()">Start</button>
      <button @click="exit()">Exit</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  border-radius: 8px;
  border: 1px solid blue;
  display: inline-block;
  width: 100px;
  cursor: pointer;

  &.selected {
    color: red;
  }

  &:first-child {
    border-radius: 8px 0 0 8px;
  }

  &:last-child {
    border-radius: 0 8px 8px 0;
    border-left: none;
  }
}

.bottom-row {
  margin-top: 1em;
  padding-top: 1em;
  border-top: 1px solid blue;
}
</style>
