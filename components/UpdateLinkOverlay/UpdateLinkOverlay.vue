<script setup lang="ts">
  import { useUserStore } from '~/stores/user';
  import { storeToRefs } from 'pinia';
  const userStore = useUserStore();
  const { addLinkOverlay } = storeToRefs(userStore);
</script>

<template>
  <div
    id="UpdateLinkOverlay"
    class="fixed z-40 left-0 right-0 w-full h-full bg-white px-5">
    <div class="w-full md:hidden flex items-center justify-between"></div>
  </div>
</template>
