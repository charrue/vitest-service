<script setup lang="ts">
import { useLogin } from "./useLogin";

const { loading, disabled, onSubmit, formData, formRules, elFormRef } = useLogin();
</script>

<template>
  <div>
    <el-form label-width="120px" :model="formData" :rules="formRules" ref="elFormRef">
      <el-form-item label="Username" name="username">
        <el-input placeholder="Username" v-model="formData.username"></el-input>
      </el-form-item>

      <el-form-item label="Password" name="password">
        <el-input placeholder="Password" v-model="formData.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading" :disabled="disabled" @click="onSubmit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
