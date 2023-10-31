<script setup lang="ts">
  import AuthLayout from '~/layouts/AuthLayout.vue';

  const userLogin = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
</script>

<template>
  <AuthLayout>
    <div class="mt-10">
      <h1 class="lg:text-5xl text-3xl text-center font-extrabold">
        Create your account
      </h1>
      <form @submit.prevent="" class="flex flex-col gap-4 mt-20">
        <TextInput
          v-model="userLogin.username"
          input-type="text"
          placeholder="Username" />
        <TextInput
          v-model="userLogin.email"
          input-type="email"
          placeholder="Email: link@gmail.com" />
        <TextInput
          v-model="userLogin.password"
          input-type="password"
          placeholder="Password" />
        <TextInput
          v-model="userLogin.confirmPassword"
          input-type="password"
          placeholder="Password" />
        <div class="mt-10">
          <button
            class="btn btn-wide btn-primary w-full font-bold"
            :disabled="
              !userLogin.email ||
              !userLogin.password ||
              !userLogin.username ||
              !userLogin.confirmPassword
            ">
            Create account
          </button>
        </div>
      </form>
      <div class="text-[14px] text-center pt-12">
        Already have an account?
        <NuxtLink to="/" class="text-[#8228D9] underline">Log in</NuxtLink>
      </div>
    </div>
  </AuthLayout>
</template>

<style scoped></style>
