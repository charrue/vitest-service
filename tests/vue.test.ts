import { describe, expect, it } from "vitest";

import { createMountFactory } from "../src/vue";
import Demo2 from "./feature/demo-store.vue";
import Demo from "./feature/demo.vue";
import { useUser } from "./feature/store/user";

const { TMount } = createMountFactory();

describe("vue", () => {
  it("should mount", () => {
    const wrapper = TMount(Demo);
    expect(wrapper.html()).toContain("Vue Test Utils");
  });

  it("test store", async () => {
    const wrapper = TMount(Demo2);
    const store = useUser();

    await store.init();
    expect(store.userInfo.username).toBe("Default");

    const btn = wrapper.find("#btn");
    await btn.trigger("click");

    expect(store.setUsername).toBeCalledWith("John");
    expect(store.userInfo.username).toBe("John");
  });
});
