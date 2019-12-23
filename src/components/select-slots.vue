<template>
  <article>
    <section class="sydra">...</section>
    <section class="container">
      <button
        @click="showModal(slot)"
        class="slot"
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
            <button @click="$emit('saveSlot')">Save</button>
            <button @click="$modal.hide('slot-modal')">Close</button>
          </div>
        </div>
      </modal>
    </section>
  </article>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      selectedSlot: {}
    };
  },
  name: "SelectSlots",
  computed: {
    ...mapState({
      slots: state => state.slot.slots
    })
  },
  methods: {
    showModal(slot) {
      this.$modal.show("slot-modal", { slot });
    },
    beforeOpen({ params }) {
      this.selectedSlot = params.slot;
    },
    addToWalkpath() {}
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

.sydra {
  width: 70vw;
  max-width: 450px;
  height: 20px;
  padding: 4px;
  margin: 20px;
  border-radius: 8px;
  background-color: dodgerblue;
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
