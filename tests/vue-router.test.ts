import { describe, expect, it } from "vitest";

import { createMountFactory } from "../src/vue";
import Bar from "./feature/demo-router-bar.vue";
import Foo from "./feature/demo-router-foo.vue";

const { TMount, TRouter } = createMountFactory({
  router: {
    routes: [
      {
        path: "/",
        name: "foo",
        component: Foo,
      },
      {
        path: "/bar",
        name: "bar",
        component: Bar,
      },
    ],
  },
});

describe("vue-router", () => {
  it("默认路由是在foo", async () => {
    const wrapper = TMount(Foo);
    expect(wrapper.html()).toContain("Route Foo");
    await TRouter.isReady();
    expect(TRouter.currentRoute.value.name).toBe("foo");
  });
});
