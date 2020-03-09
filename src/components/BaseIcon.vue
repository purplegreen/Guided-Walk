<template>
  <svg class="icon icon-colors">
    <use v-bind="{ 'xlink:href': '/icons-collection.svg#' + name }" />
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: String
  }
};
</script>
<style scoped>
.icon {
  width: 50px;
  height: 50px;
}

.icon-colors {
  --color-i: black;
}

.icon-colors:hover {
  --color-i: #949494;
}

.icon-colors:active {
  --color-i: green;
}
</style>
