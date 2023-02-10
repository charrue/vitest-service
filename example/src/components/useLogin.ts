import { ElNotification } from "element-plus";
import { computed, reactive, ref } from "vue";

import { login } from "../apis/index";

export const useLogin = () => {
  const formData = reactive({
    username: "",
    password: "",
  });

  const elFormRef = ref();

  const formRules = {
    username: [
      {
        required: true,
        message: "Please input username",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "Please input password",
        trigger: "blur",
      },
    ],
  };

  const loading = ref(false);

  const disabled = computed(() => {
    return !formData.username || !formData.password;
  });

  const onSubmit = async () => {
    if (disabled.value) return false;

    try {
      await elFormRef.value?.validate();
    } catch (e) {
      console.log(e);
      return false;
    }

    try {
      loading.value = true;
      await login();
      loading.value = false;

      ElNotification.success("Success");
    } catch (e) {
      console.log(e);
      loading.value = false;
    }

    return true;
  };

  return {
    elFormRef,
    formData,
    formRules,
    loading,
    disabled,
    onSubmit,
  };
};
