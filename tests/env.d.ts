/* eslint-disable @typescript-eslint/ban-types */

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line init-declarations
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
