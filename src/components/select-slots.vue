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
    }
  }
};
</script>

<template>
  <div class>
    <progress-bar :slots="customWalkpath.composition"></progress-bar>
    <duration :total="customWalkpath.duration"></duration>
    <div>
      <button class="a-button" @click="start" :disabled="!isWalkpathReady">Start</button>
    </div>
    <div class="slots">
      <button
        @click="showModal(slot)"
        class="slot"
        :class="{ selected: isSlotSelected(slot) }"
        v-for="slot of slots"
        :key="slot.id"
      >
        <h3 class="centered">{{ slot.name }}</h3>
      </button>
      <modal
        name="slot-modal"
        transition="nice-modal-fade"
        :adaptive="true"
        @before-open="beforeOpen"
      >
        <div class="slot-modal-content">
          <ul>
            <li>
              <h4>{{ selectedSlot.name }}</h4>
            </li>
            <li>
              <h5>{{ selectedSlot.category }}</h5>
            </li>
            <li>
              <h5>{{ selectedSlot.duration | secondsToMinutes }} min</h5>
            </li>
            <li>
              <h6 class="with-padding">{{ selectedSlot.shortText }}</h6>
            </li>
          </ul>
          <div class="wrap-buttons">
            <button class="a-button" v-if="isSlotSelected(selectedSlot)" @click="remove">Remove</button>
            <button class="a-button" v-else @click="add">
              <img alt="Insert Slot" class src="../../public/img/t_icons/insert.svg" />
            </button>
            <button class="a-button" @click="$modal.hide('slot-modal')">Close</button>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<style scoped>
.slots {
  padding-top: 20px;
}

.slot {
  background-color: whitesmoke;
  border-radius: var(--border-radius);
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  padding: 20px;
  margin: 8px;
}

.slot.selected {
  background: gainsboro;
}

.slot-modal-content {
  padding: 10px;
}
</style>

<style>
.v--modal {
  border: 2px solid var(--border-color);
  border-radius: 12px;
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
  padding-top: 20px;
  padding-bottom: 20px;
}

.wrap-buttons {
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
}
</style>
