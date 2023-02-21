<script lang="ts" setup>
import { ref } from "vue";

const currentDate = ref(new Date("2024/01/01"));

const disabledDate = (date: Date) => {
  return date.getTime() < new Date("2023/02/03").getTime();
};
</script>

<template>
  <LoginForm></LoginForm>
  <el-date-picker v-model="currentDate" :disabled-date="disabledDate"></el-date-picker>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
