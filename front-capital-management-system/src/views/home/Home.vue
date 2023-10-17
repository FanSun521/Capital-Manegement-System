<template>
  <div>
    <h2>分析台</h2>
    <button v-debounce="callback">防抖</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {},
  data() {
    return {};
  },
  methods: {
    callback() {
      console.log("防抖函数");
    },
  },
};
</script>

<style scoped></style>
