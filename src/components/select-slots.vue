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
        <h3>{{ slot.name }}</h3>
      </button>
      <modal
        name="slot-modal"
        transition="nice-modal-fade"
        :adaptive="true"
        width="90%"
        @before-open="beforeOpen"
      >
        <div class="slot-modal-content">
          <ul>
            <li>Name: {{ selectedSlot.name }}</li>
            <li>Category: {{ selectedSlot.category }}</li>
            <li>Duration: {{ selectedSlot.duration | secondsToMinutes }} min</li>
          </ul>
          <div>
            <button class="a-button" v-if="isSlotSelected(selectedSlot)" @click="remove">Remove</button>
            <button class="a-button" v-else @click="add">Add</button>
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
</style>

<style>
.v--modal-box {
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
}

.slot-modal-content {
  padding: 10px;
}
</style>
