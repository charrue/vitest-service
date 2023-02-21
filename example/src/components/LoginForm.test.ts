import { createMountFactory } from "@charrue/test-vue";
import { test } from "vitest";

import LoginForm from "./LoginForm.vue";

const { TMount } = createMountFactory();

test("mount", () => {
  const wrapper = TMount(LoginForm);

  console.log(wrapper.html());
});
