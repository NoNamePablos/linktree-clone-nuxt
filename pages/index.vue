<script setup lang="ts">
  import AuthLayout from '~/layouts/AuthLayout.vue';
  definePageMeta({ middleware: 'is-logged-in' });
  const userStore = useUserStore();
  const router = useRouter();
  const userLogin = ref({
    email: '',
    password: '',
  });
  const errors = ref(null);
  const login = async () => {
    errors.value = null;

    try {
      userStore.getTokens().then(() => {
        userStore
          .login(userLogin.value.email, userLogin.value.password)
          .then(() => {
            console.log('after login');
            userStore.getUser().then(() => {
              console.log('redirected');
              router.push('/admin');
            });
          });
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
        Log in to your Linktree account
      </h1>
      <form @submit.prevent="login()" class="flex flex-col gap-4 mt-20">
        <TextInput
          v-model="userLogin.email"
          input-type="email"
          placeholder="Email: link@gmail.com" />
        <TextInput
          v-model="userLogin.password"
          input-type="password"
          placeholder="Password" />
        <div class="mt-10">
          <button
            class="btn btn-wide btn-primary w-full font-bold"
            :disabled="!userLogin.email || !userLogin.password">
            Sing In
          </button>
        </div>
      </form>
      <div class="text-[14px] text-center pt-12">
        Doesn`t have an account?
        <NuxtLink to="/register" class="text-[#8228D9] underline"
          >Sign Up</NuxtLink
        >
      </div>
    </div>
  </AuthLayout>
</template>

<style scoped></style>
