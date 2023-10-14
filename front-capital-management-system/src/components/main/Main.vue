<template>
  <div>
    <h2>Main</h2>
    <button @click="sendAxios">发送axios请求</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Main",
  props: {},
  methods: {
    async sendAxios() {
      console.log(this.$http);
      const res = await this.$http.login({
        id: "2021005820",
        password: "1234567",
      });
      console.log(res);
    },
  },
};
</script>

<style scoped></style>
