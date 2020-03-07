<script>
import { mapState, mapActions } from "vuex";
import ProgressBar from "@/components/progress-bar.vue";
import Duration from "@/components/duration.vue";

export default {
  data() {
    return {
      selectedSlot: {}
    };
  },
  name: "SelectSlots",
  components: {
    ProgressBar,
    Duration
  },
  computed: {
    ...mapState({
      slots: state => state.slot.slots,
      customWalkpath: state => state.walkpath.customWalkpath
    }),
    isWalkpathReady() {
      return this.customWalkpath.composition.length > 0;
    }
  },
  methods: {
    ...mapActions([
      "addToWalkpath",
      "removeFromWalkpath",
      "setWalkpathInProgress"
    ]),
    showModal(slot) {
      this.$modal.show("slot-modal", { slot });
    },
    beforeOpen({ params }) {
      this.selectedSlot = params.slot;
    },
    add() {
      this.addToWalkpath(this.selectedSlot);
      this.$modal.hide("slot-modal");
    },
    remove() {
      this.removeFromWalkpath(this.selectedSlot);
      this.$modal.hide("slot-modal");
    },
    start() {
      this.setWalkpathInProgress(this.customWalkpath);
      this.$router.push("walkpath");
    },
    isSlotSelected(slot) {
      const index = this.customWalkpath.composition.findIndex(
        e => e.id == slot.id
      );
      return index != -1;
    },
    isSlotSelectedColor(slot) {
      return {
        backgroundColor: slot.color
      };
    }
  }
};
</script>

<template>
  <div class>
    <div class="wrap-title">
      <h1 class="with-padding">Create your Custom Walk by adding Meditations to your Composition</h1>
    </div>
    <progress-bar :slots="customWalkpath.composition"></progress-bar>
    <duration :total="customWalkpath.duration"></duration>
    <div>
      <button @click="start" :disabled="!isWalkpathReady">
        <BaseIcon alt="Start Walk" name="next" />
      </button>
    </div>
    <div class="slots">
      <button
        @click="showModal(slot)"
        class="slot"
        :class="{ selected: isSlotSelected(slot) }"
        v-for="slot of slots"
        :key="slot.id"
        :style="isSlotSelectedColor(slot)"
      >
        <h6 class="centered">{{ slot.name }}</h6>
      </button>
      <modal
        name="slot-modal"
        transition="nice-modal-fade"
        :adaptive="true"
        @before-open="beforeOpen"
      >
        <div class="slot-modal-content">
          <div class="side-el">
            <button @click="$modal.hide('slot-modal')">
              <BaseIcon alt="Close Slot" name="close" />
            </button>
          </div>
          <ul>
            <li>
              <h2 class="with-padding">{{ selectedSlot.name }}</h2>
            </li>
            <li>
              <h3>{{ selectedSlot.category }}</h3>
            </li>
            <li>
              <h3 class="with-padding-10">{{ selectedSlot.duration | secondsToMinutes }} min</h3>
            </li>
            <li>
              <h4 class="with-padding">{{ selectedSlot.shortText }}</h4>
            </li>
          </ul>
          <div class="wrap-buttons">
            <button v-if="isSlotSelected(selectedSlot)" @click="remove">
              <BaseIcon alt="Remove Slot" name="remove" />
            </button>
            <button v-else @click="add">
              <BaseIcon alt="Insert Slot" name="insert" />
            </button>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<style scoped>
.slots {
  padding-top: 12px;
  padding-bottom: 40px;
}

.slot {
  width: 22%;
  color: white;
  border-radius: var(--border-radius);
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  padding: 19px 0px;
  margin: 3px;
}

.slot.selected {
  background: #add8e6;
}

.slot-modal-content {
  padding: 10px;
}

.wrap-title {
  width: 90%;
  margin: auto;
}
</style>

<style lang="scss">
.v--modal {
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
  padding: 0;
}

.v--modal-box {
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

.centered {
  text-align: center;
  margin: auto;
}
.with-padding {
  padding-bottom: 20px;
}

.with-padding-10 {
  padding-bottom: 10px;
}

.wrap-buttons {
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
}

.t-icon {
  width: 50px;
  height: auto;

  &:hover {
    fill: red;
  }
}

.side-el {
  position: absolute;
  width: 38px;
  height: 38px;
  right: 10px;
  top: 10px;
  width: 3rem;
  height: auto;
}
</style>
