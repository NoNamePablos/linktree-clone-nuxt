<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue';

const userLogin = ref({
  email: '',
  password: '',
});
</script>

<template>
  <AuthLayout>
    <div class="mt-10">
      <h1 class="lg:text-5xl text-3xl text-center font-extrabold">
        Log in to your Linktree account
      </h1>
      <form @submit.prevent="" class="flex flex-col gap-4 mt-20">
        <TextInput
            v-model="userLogin.email"
            input-type="email"
            placeholder="Email: link@gmail.com" />
        <TextInput
            v-model="userLogin.password"
            input-type="password"
            placeholder="Password" />
        <div class="mt-10">
          <button class="btn btn-wide btn-primary w-full font-bold " :disabled="!userLogin.email||!userLogin.password">Sing In</button>
        </div>
      </form>
      <div class="text-[14px] text-center pt-12">
        Doesn`t have an account? <NuxtLink to="/register" class="text-[#8228D9] underline">Sign Up</NuxtLink>
      </div>
    </div>
  </AuthLayout>
</template>

<style scoped></style>
