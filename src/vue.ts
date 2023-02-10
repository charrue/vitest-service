import { TestingOptions, createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import EP from "element-plus";
import { vi } from "vitest";
import { RouterOptions, createRouter, createWebHashHistory } from "vue-router";

interface Options {
  store?: TestingOptions;
  router?: Partial<RouterOptions>;
}

export const createMountFactory = (options: Options = {}) => {
  const { store = {}, router = {} } = options;
  const TPinia = createTestingPinia({
    createSpy: vi.fn,
    // 执行action，更新state
    stubActions: false,
    ...store,
  });

  const TRouter = createRouter({
    ...router,
    history: router.history || createWebHashHistory(),
    routes: router.routes || [{ path: "/", component: { template: "Home" } }],
  });

  const TMount = (Comp: any) => {
    const wrapper = mount(Comp, {
      global: {
        plugins: [TPinia, TRouter, EP],
      },
    });

    return wrapper;
  };

  return {
    TMount,
    TPinia,
    TRouter,
  };
};
