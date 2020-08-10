<script>
import { mapState, mapActions } from "vuex";
import ProgressBar from "@/components/progress-bar.vue";
import Duration from "@/components/duration.vue";
import MapComponent from "@/components/map.vue";

const R = 6378137; // Radius of earth in meters

export default {
  name: "Walkpath",
  components: { ProgressBar, Duration, MapComponent },
  data() {
    return {
      mode: "audio",
      isWalkpathRunning: false,
      indexOfLastPlayedSlot: 0,
      audio: new Audio(""),
      locationAcquired: false
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
    },
    markers() {
      return [
        {
          position: this.slotInProgress.location,
          text: this.slotInProgress.name
        }
      ];
      // return this.walkpathInProgress.composition
      //   .filter(s => !!s.location)
      //   .map(s => ({ position: s.location, text: s.name }));
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
      // check if it is different file. If not, no need to load again
      if (!this.audio.src.includes(slot.audio)) {
        this.pause();
        this.audio.src = `./${slot.audio}`;
        this.audio.load();

        this.audio.onloadedmetadata = () => {
          this.audio.currentTime = startFrom;
          this.audio.play();
        };
      } else {
        this.audio.currentTime = startFrom;
        this.audio.play();
      }

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
        this.$router.push("credits");
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
    onLocationAcquired(value) {
      this.locationAcquired = value;
    },
    onLocationChange(location) {
      if (!location) return;
      // find the nearest slot
      let nearestDistance = Number.POSITIVE_INFINITY;
      let nearestSlot = null;
      let nearestSlotIndex = -1;
      this.walkpathInProgress.composition.forEach((slot, index) => {
        if (!slot.location) return;
        const dLat = ((location.lat - slot.location.lat) * Math.PI) / 180;
        const dLon = ((location.lng - slot.location.lng) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((location.lat * Math.PI) / 180) *
            Math.cos((slot.location.lat * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        if (d < nearestDistance) {
          nearestDistance = d;
          nearestSlot = slot;
          nearestSlotIndex = index;
        }
      });

      if (nearestDistance < process.env.VUE_APP_LOCATION_LIMIT) {
        if (this.slotInProgress.id != nearestSlot.id) {
          this.startSlotAtIndex(nearestSlotIndex);
        }
      }
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
    },
    showModal1() {
      this.$modal.show("audioModal");
    },
    hideModal1() {
      this.$modal.hide("audioModal");
    },
    showModal2() {
      this.$modal.show("textModal");
    },
    hideModal2() {
      this.$modal.hide("textModal");
    }
  }
};
</script>
<template>
  <div>
    <progress-bar :slots="walkpathInProgress.composition" @onBarClicked="onBarClicked"></progress-bar>

    <duration :total="walkpathInProgress.duration" :passed="durationPassed" :withRemaining="true"></duration>

    <div class="audio-text-sw">
      <div class="audio-text-btns">
        <a
          class="audio-btn"
          :class="{ selected: mode == 'audio' }"
          @click="
            selectMode('audio');
            showModal1();
          "
        >
          <BaseIcon alt="Sound" name="sound" />
        </a>

        <modal name="audioModal" transition="nice-modal-fade" :adaptive="true">
          <div class="side-el">
            <button @click="$modal.hide('audioModal')">
              <BaseIcon alt="Close Slot" name="close" />
            </button>
          </div>

          <button v-if="isWalkpathRunning" @click="stop()">
            <BaseIcon class="stop-open" alt="Stop" name="stop" />
          </button>
          <button v-else @click="start()">
            <BaseIcon class="play-open" alt="Play" name="play" />
          </button>
        </modal>

        <a
          class="text-btn"
          :class="{ selected: mode == 'text' }"
          @click="
            selectMode('text');
            showModal2();
          "
        >
          <BaseIcon alt="Text" name="text" />
        </a>

        <modal name="textModal" transition="nice-modal-fade" :adaptive="true">
          <div class="side-el">
            <button @click="$modal.hide('textModal')">
              <BaseIcon alt="Close Slot" name="close" />
            </button>
          </div>

          <div class="text-card">
            <div class="text-content">{{ slotInProgress.text }}</div>
            <div v-if="walkpathInProgress.composition.length > 1">
              <div class="low-btn">
                <button @click="previousSlot" :disabled="indexOfLastPlayedSlot == 0">
                  <BaseIcon alt="Previous" name="prev" />
                </button>

                <button
                  @click="nextSlot"
                  :disabled="
                    indexOfLastPlayedSlot + 1 ==
                      walkpathInProgress.composition.length
                  "
                >
                  <BaseIcon alt="Next" name="next" />
                </button>
              </div>
            </div>
          </div>
        </modal>
      </div>
    </div>
    <div class="map">
      <img v-if="!slotInProgress.location || !locationAcquired" :src="slotInProgress.image" />
      <map-component
        v-if="slotInProgress.location"
        :markers="markers"
        @locationAcquired="onLocationAcquired"
        @locationChanged="onLocationChange"
      ></map-component>
    </div>
    <div class="margin">
      <button @click="exit()">
        <BaseIcon alt="Exit" name="exit" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  border-radius: var(--border-radius);
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

.margin {
  margin: 20px;
}

.audio-text-sw {
  height: 20em;
  display: block;
  position: relative;
}

.audio-text-btns {
  height: 60px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.audio-btn {
  padding-right: 10px;

  &.icon:active {
    --color-i: palegreen;
  }
}

.text-btn {
  padding-left: 1px;
}

.text-card {
  position: absolute;
  top: 40px;
  bottom: 3px;
  left: 3px;
  right: 3px;
  background-color: pink;
}

.text-content {
  height: 160px;
  grid-row-end: 3;
  overflow: scroll;
  columns: 100vw 6;
  text-align: left;
  padding-bottom: 20px;
  margin: 20px;
}
.v--modal {
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
  padding: 0;
}

.v--modal-box {
  position: relative;
  border-radius: var(--border-radius);
  max-width: 414px;
  width: 96vw;
  height: 96vh;
  padding: 20px;
}

.v--modal-overlay .v--modal-box {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.play-open,
.stop-open {
  &.icon {
    width: 120px;
    height: auto;
    align-self: center;
    --color-i: #53c6e3;
    padding-top: 6em;
    z-index: 3;
  }
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease-out;
  background-color: #53c6e3;
}

.fade-leave-to {
  opacity: 0.9;
  background-color: blue;
}

.isaudio > .icon,
.istext > .icon {
  --color-i: #808000;
}

.side-el {
  position: absolute;
  width: 18px;
  height: 18px;
  right: 18px;
  top: 10px;
  width: 3rem;
  height: auto;
}

.low-btn {
  border: 1px solid red;
  margin: auto;
  text-align: center;
}

.map {
  height: 400px;

  img {
    min-height: 350px;
  }
}
</style>
