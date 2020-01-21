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
  <div class="wrapper">
    <div class="slots">
      <button
        @click="showModal(slot)"
        class="slot"
        :class="{ selected: isSlotSelected(slot) }"
        v-for="slot of slots"
        :key="slot.id"
      >
        {{ slot.name }}
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
            <li>
              Duration: {{ selectedSlot.duration | secondsToMinutes }} min
            </li>
          </ul>
          <div>
            <button v-if="isSlotSelected(selectedSlot)" @click="remove">
              Remove
            </button>
            <button v-else @click="add">Save</button>
            <button @click="$modal.hide('slot-modal')">Close</button>
          </div>
        </div>
      </modal>
    </div>
    <progress-bar :slots="customWalkpath.composition"></progress-bar>
    <duration
      :total="customWalkpath.duration"
    ></duration>
    <div>
      <button @click="start" :disabled="!isWalkpathReady">
        Start Walkpath!
      </button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 10px;
}

.slots {
  padding: 10px;
  margin: 1em 0;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
}

.slot {
  padding: 10px;
  margin: 10px;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
}

.slot.selected {
  background: #81f495;
}

.modal {
  background-color: var(--white);
  border: 1px solid var(--border-color);
  padding: 10px;
  margin: 10px;
  border-radius: var(--border-radius);
  position: absolute;
  top: 10px;
  left: 0px;
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
