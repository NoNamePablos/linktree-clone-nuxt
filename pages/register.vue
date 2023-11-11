<script setup lang="ts">
  import AuthLayout from '~/layouts/AuthLayout.vue';
  import { useUserStore } from '~/stores/user';
  import { toRefs } from 'vue';
  definePageMeta({ middleware: 'is-logged-in' });
  const userStore = useUserStore();
  const router = useRouter();
  const userLogin = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  let errors = ref(null);

  const register = async () => {
    errors.value = null;

    try {
      await userStore.getTokens().then((resolve) => {
        userStore
          .register(
            userLogin.value.username,
            userLogin.value.email,
            userLogin.value.password,
            userLogin.value.confirmPassword,
          )
          .then((resolve) => {
            userStore.getUser();
          })
          .then((resolve) => router.push('/admin'));
      });
    } catch (error) {
      console.log(error);
      // @ts-ignore
      errors.value = error.response.data.errors;
    }
  };
</script>

<template>
  <AuthLayout>
    <div class="mt-10">
      <h1 class="lg:text-5xl text-3xl text-center font-extrabold">
        Create your account
      </h1>
      <form @submit.prevent="register()" class="flex flex-col gap-4 mt-20">
        <TextInput
          v-model="userLogin.username"
          input-type="text"
          placeholder="Username"
          :error="errors && errors.name ? errors.name[0] : ''" />
        <TextInput
          v-model="userLogin.email"
          input-type="email"
          placeholder="Email: link@gmail.com"
          :error="errors && errors.email ? errors.email[0] : ''" />
        <TextInput
          v-model="userLogin.password"
          input-type="password"
          placeholder="Password"
          :error="errors && errors.password ? errors.password[0] : ''" />
        <TextInput
          v-model="userLogin.confirmPassword"
          input-type="password"
          placeholder="Password"
          :error="errors && errors.password ? errors.password[0] : ''" />
        <div class="mt-10">
          <button
            type="submit"
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
