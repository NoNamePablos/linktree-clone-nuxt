<script setup lang="ts">
import AuthLayout from "~/layouts/AuthLayout.vue";
</script>

<template>
  <AuthLayout>
    <div class="mt-10">
      <h1 class="lg:text-5xl text-3xl text-center font-extrabold">
        Log in to your Linktree
      </h1>
      <form @submit.prevent="">
        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
      </form>
    </div>
  </AuthLayout>
</template>

<style scoped></style>
