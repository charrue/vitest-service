import { defineStore } from "pinia";
import { ref } from "vue";

import { sleep } from "../utils";

export const useUser = defineStore("user", () => {
  const userInfo = ref({
    username: "",
  });

  const init = async () => {
    await sleep(1000);
    userInfo.value.username = "Default";
  };

  const setUsername = (username: string) => {
    userInfo.value.username = username;
  };

  return {
    userInfo,
    init,
    setUsername,
  };
});
