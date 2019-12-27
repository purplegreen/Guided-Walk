<template>
  <article>
    <walkpath-progress></walkpath-progress>
    <section class="container">
      <button
        @click="showModal(slot)"
        class="slot"
        :class="{ selected: slot.isSelected }"
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
            <li>name: {{ selectedSlot.name }}</li>
            <li>category: {{ selectedSlot.category }}</li>
            <li>duration: {{ selectedSlot.duration }} min</li>
          </ul>
          <div>
            <button v-if="selectedSlot.isSelected" @click="remove">
              Remove
            </button>
            <button v-else @click="add">Save</button>
            <button @click="$modal.hide('slot-modal')">Close</button>
          </div>
        </div>
      </modal>
    </section>
    <b-button
      class="mt-2"
      variant="outline-primary"
      @click="start"
    >
      Start Walkpath!
    </b-button>
  </article>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WalkpathProgress from "@/components/walkpath-progress.vue";

export default {
  data() {
    return {
      selectedSlot: {}
    };
  },
  name: "SelectSlots",
  components: {
    WalkpathProgress
  },
  computed: {
    ...mapState({
      slots: state => state.slot.slots,
      customWalkpath: state => state.walkpath.customWalkpath
    })
  },
  methods: {
    ...mapActions(["addToWalkpath", "removeFromWalkpath", "startWalkpath"]),
    showModal(slot) {
      this.$modal.show("slot-modal", { slot });
    },
    beforeOpen({ params }) {
      this.selectedSlot = params.slot;
    },
    add() {
      this.addToWalkpath(this.selectedSlot);
      this.selectedSlot.isSelected = true;
      this.$modal.hide("slot-modal");
    },
    remove() {
      this.removeFromWalkpath(this.selectedSlot);
      this.selectedSlot.isSelected = false;
      this.$modal.hide("slot-modal");
    },
    start() {
      this.startWalkpath()
    }
  }
};
</script>

<style scoped>
article {
  display: flex;
  border: 1px solid blue;
  border-radius: 8px;
  width: 90vw;
  max-width: 620px;
  border: auto;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: center;
  align-items: flex-start;
  justify-content: space-around;
  padding: 10px;
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid blue;
}

.slot {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  border: 1px solid blue;
}

.slot.selected {
  background: red;
}

.modal {
  background-color: white;
  border: 2px solid blue;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  position: absolute;
  top: 10px;
  left: 0px;
}
</style>

<style>
.v--modal-box {
  border: 2px solid blue;
  border-radius: 8px;
}

.slot-modal-content {
  padding: 10px;
}
</style>
