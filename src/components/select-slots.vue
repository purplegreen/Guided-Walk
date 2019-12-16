<template>
  <article>
    <section class="sydra">...</section>
    <section class="container">
      <button class="slot" v-for="slot of slots" v-bind:key="slot" v-on:click="open">{{ slot.name }}</button>
      <div class="is-open">
        <ul v-for="slot of slots" v-bind:key="slot">
          <li>{{ slot.category }}</li>
          <li>{{ slot.duration }} min</li>
        </ul>
      </div>
    </section>
  </article>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SelectSlots",
  props: ["slots"],
  computed: mapState({
    slots: "slots"
  })
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

.is-open {
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
