<template>
  <div>
    <button id="btn" @click="onClick">Set Username</button>
  </div>
</template>

<script setup>
import { useUser } from "./store/user.ts";

const store = useUser();

const onClick = () => {
  store.setUsername("John");
};
</script>
