<script>
import { mapState, mapActions } from "vuex";
import ProgressBar from "@/components/progress-bar.vue";
import Duration from "@/components/duration.vue";
import MapComponent from "@/components/map.vue";

export default {
  name: "Walkpath",
  components: { ProgressBar, Duration, MapComponent },
  data() {
    return {
      mode: "audio",
      isWalkpathRunning: false,
      indexOfLastPlayedSlot: 0,
      audio: {}
    };
  },
  mounted() {
    if (!this.walkpathInProgress.composition.length) {
      this.$router.replace("/");
      return;
    }
    this.setSlotInProgress(this.walkpathInProgress.composition[0]);
  },
  computed: {
    ...mapState({
      walkpathInProgress: state => state.walkpath.walkpathInProgress,
      slotInProgress: state => state.walkpath.slotInProgress
    }),
    durationPassed() {
      if (this.mode == "audio") {
        return this.walkpathInProgress.composition.reduce((total, slot) => {
          return total + slot.alreadyPlayedInSeconds;
        }, 0);
      }

      return this.walkpathInProgress.composition.reduce((total, slot, i) => {
        return i < this.indexOfLastPlayedSlot ? total + slot.duration : total;
      }, 0);
    }
  },
  methods: {
    ...mapActions([
      "setWalkpathInProgress",
      "calculateSlotAudioProgress",
      "highlightSlotAt",
      "setSlotInProgress",
      "resetWalkpath"
    ]),
    selectMode(mode) {
      this.mode = mode;
      this.pause();
      this.resetWalkpath();
      this.isWalkpathRunning = false;
    },
    pause() {
      if (!this.audio.paused) {
        this.audio.pause && this.audio.pause();
      }
    },
    play(slot, startFrom, index) {
      this.pause();
      this.audio = new Audio(slot.audio);

      this.audio.onloadedmetadata = () => {
        this.audio.currentTime = startFrom;
        this.audio.play();
      };

      this.audio.ontimeupdate = () => {
        if (this.audio.paused) return;
        slot.alreadyPlayedInSeconds = parseInt(this.audio.currentTime, 10);
      };

      this.audio.onended = () => {
        slot.alreadyPlayedInSeconds = slot.duration;
        this.startSlotAtIndex(index + 1);
      };
    },
    startSlotAtIndex(index, startAudioOn = 0) {
      this.isWalkpathRunning = true;
      if (!this.walkpathInProgress.composition[index]) {
        // we came to a point where there is no next slot -> finish the walkpath
        this.isWalkpathRunning = false;
        this.$router.push("credits");
        return;
      }

      this.setSlotInProgress(this.walkpathInProgress.composition[index]);
      this.indexOfLastPlayedSlot = index;
      if (this.mode == "audio") {
        this.calculateSlotAudioProgress(index);
        this.play(this.slotInProgress, startAudioOn, index);
      } else {
        // for now highlighting only happens for text mode
        this.highlightSlotAt(index);
      }
    },
    onBarClicked(slot, index, event) {
      // First we calculate the pixels to understand at which
      // time she wants to start playing. If she clicked on 20% from the left,
      // we start playing the track from that exact second.
      const rect = event.target.getBoundingClientRect();
      const width = rect.right - rect.left;

      const x = event.clientX - rect.left; // x position within the element clicked.
      const secondsInTrack = (x / width) * slot.duration;

      this.startSlotAtIndex(index, secondsInTrack);
    },
    exit() {
      this.pause();
      this.resetWalkpath();
      if (this.walkpathInProgress.id) {
        // meaing that the user selected premade walkpath
        this.$router.push("select");
      } else {
        this.$router.push("create");
      }
      this.setWalkpathInProgress({
        composition: []
      });
    },
    start() {
      if (this.isWalkpathRunning) return;
      this.startSlotAtIndex(
        this.indexOfLastPlayedSlot,
        this.slotInProgress.alreadyPlayedInSeconds
      );
    },
    stop() {
      // this only makes sense in audio mode
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
    <duration
      :total="walkpathInProgress.duration"
      :passed="durationPassed"
      :withRemaining="true"
    ></duration>
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
      <div v-if="walkpathInProgress.composition.length > 1">
        <button @click="previousSlot" :disabled="indexOfLastPlayedSlot == 0">
          Prev
        </button>
        <button
          @click="nextSlot"
          :disabled="
            indexOfLastPlayedSlot + 1 == walkpathInProgress.composition.length
          "
        >
          Next
        </button>
      </div>
    </div>
    <map-component></map-component>
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
  border-radius: var(--border-radius);
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
