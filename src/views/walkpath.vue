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
      isWalkpathRunning: false,
      slotInProgress: {},
      indexOfLastPlayedSlot: 0,
      audio: {}
    };
  },
  mounted() {
    if (!this.walkpathInProgress || !this.walkpathInProgress.composition) {
      this.$router.push({ path: "/" });
      return;
    }
    this.slotInProgress = this.walkpathInProgress.composition[0];
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
      this.reset();
      this.pause();
      this.isWalkpathRunning = false;
    },
    pause() {
      if (!this.audio.paused) {
        this.audio.pause && this.audio.pause();
      }
    },
    reset(index = 0) {
      // reset progresses on slots
      this.walkpathInProgress.composition.forEach((element, i) => {
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
        this.startSlotAtIndex(index + 1);
      };
    },
    startSlotAtIndex(index, startAudioOn = 0) {
      this.isWalkpathRunning = true;
      if (!this.walkpathInProgress.composition[index]) {
        console.log("walkpath ended");
        this.isWalkpathRunning = false;
        return;
      }
      this.slotInProgress = this.walkpathInProgress.composition[index];
      this.indexOfLastPlayedSlot = index;
      if (this.mode == "audio") {
        this.reset(index);
        this.play(this.slotInProgress, startAudioOn, index);
      }
    },
    onBarClicked(slot, index, event) {
      const rect = event.target.getBoundingClientRect();
      const width = rect.right - rect.left;

      const x = event.clientX - rect.left; // x position within the element.
      this.startSlotAtIndex(index, x / width);
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
    start() {
      if (this.isWalkpathRunning) return;
      this.startSlotAtIndex(
        this.indexOfLastPlayedSlot,
        this.slotInProgress.progress / 100
      );
    },
    stop() {
      this.isWalkpathRunning = false;
      this.pause();
    },
    nextSlot() {
      this.startSlotAtIndex(this.indexOfLastPlayedSlot + 1);
    },
    previousSlot() {
      this.startSlotAtIndex(this.indexOfLastPlayedSlot - 1);
    }
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
    <div v-if="mode == 'text'">
      <div class="text-content">
        {{ slotInProgress.text }}
      </div>
      <div>
        <button
          @click="previousSlot"
          :disabled="indexOfLastPlayedSlot == 0"
        >
          Prev
        </button>
        <button
          @click="nextSlot"
          :disabled="indexOfLastPlayedSlot + 1 == walkpathInProgress.composition.length"
        >
          Next
        </button>
      </div>
    </div>
    <div>

    </div>
    <div class="bottom-row">
      <button v-if="isWalkpathRunning" @click="stop()">Stop</button>
      <button v-else @click="start()">Start</button>
      <button @click="exit()">Exit</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-content {
  height: 200px;
  overflow: auto;
  columns: 100px 3;
  width: 90%;
  margin: auto;
}

.button-group {
  margin: 1em 0;
}
.btn {
  border-radius: 8px;
  border: 1px solid var(--border-color);
  display: inline-block;
  width: 100px;
  cursor: pointer;

  &.selected {
    color: var(--fuchsia);
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
  border-top: 1px solid var(--border-color);
}
</style>