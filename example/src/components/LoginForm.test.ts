import { createMountFactory } from "@charrue/vitest-service";
import { test } from "vitest";

import LoginForm from "./LoginForm.vue";

const { TMount } = createMountFactory();

test("mount", () => {
  const wrapper = TMount(LoginForm);

  console.log(wrapper.html());
});
