<script setup lang="ts">
  import { useUserStore } from '~/stores/user';
  import { storeToRefs } from 'pinia';
  import { onMounted } from 'vue';
  const userStore = useUserStore();
  const { updatedLinkId } = storeToRefs(userStore);
  const route = useRoute();
  onMounted(() => {
    updatedLinkId.value = 0;
  });
</script>

<template>
  <div id="AdminLayout" class="w-full fixed z-30">
      <slot></slot>
  </div>
</template>

<style scoped></style>
