import { expect, test } from "vitest";

import { useLogin } from "./useLogin";

test("初始状态", async () => {
  const { formData, onSubmit, disabled, loading } = useLogin();
  expect(formData).toEqual({ username: "", password: "" });

  expect(loading.value).toBe(false);
  expect(disabled.value).toBe(true);
  expect(await onSubmit()).toBe(false);

  formData.username = "admin";
  formData.password = "123456";

  expect(disabled.value).toBe(false);
  expect(loading.value).toBe(false);
});

test("onSubmit", async () => {
  const { formData, onSubmit, loading } = useLogin();

  formData.username = "admin";
  formData.password = "123456";

  expect(await onSubmit()).toBe(true);

  expect(loading.value).toBe(false);
});
