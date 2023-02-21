<template>
  <div>
    <h1>Route Foo</h1>

    <button id="btn" @click="onClick">to bar</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const onClick = () => {
  router.push({
    path: "/bar",
    query: {
      source: "foo",
    },
  });
};
</script>
